import { useEffect, useMemo, useRef, useState } from 'react';
import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';

// ---------- Database ----------
const db = new Dexie('QSortDB');
db.version(1).stores({
  projects: 'name', // whole project (design, statements, participants) stored under its name
});

const LEGACY_LS_KEY = 'qsort_projects_v1'; // from the earlier localStorage version

const MIN_COL = -6;
const MAX_COL = 13;
const COLUMNS = Array.from({ length: MAX_COL - MIN_COL + 1 }, (_, i) => MIN_COL + i);
const fmtCol = (c) => (c > 0 ? `+${c}` : `${c}`);
const emptyDesign = () => Object.fromEntries(COLUMNS.map((c) => [c, 0]));
const parseStatements = (text) =>
  text
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
const lastFilled = (arr = []) => {
  for (let i = arr.length - 1; i >= 0; i--) if (arr[i]) return i;
  return -1;
};

// Read-modify-write one project atomically
const updateProject = (name, fn) =>
  db.transaction('rw', db.projects, async () => {
    const p = await db.projects.get(name);
    if (p) await db.projects.put(fn(p));
  });

// Highest statement number the project could contain (used for CSV width)
const projectN = (p) => {
  const designSum = Object.values(p.design || {}).reduce((s, v) => s + v, 0);
  let seen = 0;
  for (const part of p.participants)
    for (const stmts of Object.values(part.sorts)) for (const s of stmts) seen = Math.max(seen, s);
  return Math.max(designSum, p.freeTotal || 0, p.statements?.length || 0, seen);
};

// Full JSON export: the stored project plus convenient array views of the data
const buildExport = (p) => {
  const n = projectN(p);
  const design = p.design || {};
  const columnCounts = COLUMNS.map((c) => design[c] || 0); // [0] = -6 column ... [19] = +13 column
  const patternColumnValues = COLUMNS.flatMap((c) => Array(design[c] || 0).fill(c)); // e.g. [-4,-4,-3,-3,-3,...]
  const participantNames = p.participants.map((x) => x.name);
  const sortValues = p.participants.map((part) => {
    const row = new Array(n).fill(null); // row[i] = column value of statement i+1 (null if not placed)
    for (const [col, stmts] of Object.entries(part.sorts))
      for (const st of stmts) row[st - 1] = Number(col);
    return row;
  });
  return {
    ...p,
    columnHeaders: COLUMNS,
    participantNames,
    sortValues,
    columnCounts,
    patternColumnValues,
  };
};

export default function QSortDataEntry() {
  const projectList = useLiveQuery(() => db.projects.toArray(), []);
  const loading = projectList === undefined;
  const projects = useMemo(
    () => Object.fromEntries((projectList || []).map((p) => [p.name, p])),
    [projectList]
  );

  const [mode, setMode] = useState('new'); // "new" | "continue"
  const [selectedName, setSelectedName] = useState('');

  // Draft state for a project that has not been saved yet
  const [draftName, setDraftName] = useState('');
  const [draftType, setDraftType] = useState('forced'); // "forced" | "free"
  const [draftDesign, setDraftDesign] = useState(emptyDesign);
  const [draftFreeCols, setDraftFreeCols] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteText, setDeleteText] = useState('');
  const [draftStmtText, setDraftStmtText] = useState('');

  // Statement text for the active (saved) project
  const [stmtText, setStmtText] = useState('');
  const [stmtStatus, setStmtStatus] = useState('');
  const stmtTimer = useRef(null);

  // Participant entry state
  const [participant, setParticipant] = useState('');
  const [sorts, setSorts] = useState({}); // { [col]: string[] }
  const [editingName, setEditingName] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const participantRef = useRef(null);
  const addBtnRef = useRef(null);
  const cellRefs = useRef({});

  // One-time import of data saved by the old localStorage version
  useEffect(() => {
    (async () => {
      try {
        const raw = localStorage.getItem(LEGACY_LS_KEY);
        if (!raw) return;
        const legacy = Object.values(JSON.parse(raw));
        for (const p of legacy) {
          if (p?.name && !(await db.projects.get(p.name))) await db.projects.put(p);
        }
        localStorage.removeItem(LEGACY_LS_KEY);
      } catch {
        /* ignore */
      }
    })();
  }, []);

  const projectNames = Object.keys(projects).sort((a, b) => a.localeCompare(b));
  const active = mode === 'continue' ? projects[selectedName] : null;

  // Load a saved project's statements into the textarea when the project changes
  useEffect(() => {
    if (active) {
      setStmtText((active.statements || []).join('\n'));
      setStmtStatus('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active?.name]);

  const name = active ? active.name : draftName;
  const type = active ? active.type || 'forced' : draftType;
  const isFree = type === 'free';
  const freeCols = active ? active.freeColumns || [] : draftFreeCols;
  const freeTotalInput = active ? active.freeTotal || 0 : 0; // only used by projects saved by an older version
  // In a draft free design, only counts in selected columns belong to the idealized pattern
  const design = useMemo(() => {
    if (active) return active.design;
    if (!isFree) return draftDesign;
    return Object.fromEntries(
      COLUMNS.map((c) => [c, draftFreeCols.includes(c) ? draftDesign[c] || 0 : 0])
    );
  }, [active, isFree, draftDesign, draftFreeCols]);
  const complete = !!active?.complete;
  const designLocked = !!active;

  const stmtValue = active ? stmtText : draftStmtText;
  const statements = useMemo(() => parseStatements(stmtValue), [stmtValue]);

  const activeCols = useMemo(
    () =>
      isFree ? [...freeCols].sort((a, b) => a - b) : COLUMNS.filter((c) => (design[c] || 0) > 0),
    [isFree, freeCols, design]
  );
  const designSum = useMemo(() => COLUMNS.reduce((s, c) => s + (design[c] || 0), 0), [design]);

  // How many statements every participant must place (0 = unknown, free design only)
  const expectedTotal = designSum || (isFree ? statements.length || freeTotalInput : 0);
  const maxStmt = isFree ? (expectedTotal > 0 ? expectedTotal : Infinity) : designSum;
  const statementMismatch =
    statements.length > 0 && designSum > 0 && statements.length !== designSum;

  // Forced: fixed slots per column. Free: filled slots plus one empty trailing slot.
  const slotCount = (c) => (isFree ? lastFilled(sorts[c]) + 2 : design[c] || 0);

  const cellKeys = useMemo(
    () => activeCols.flatMap((c) => Array.from({ length: slotCount(c) }, (_, i) => `${c}:${i}`)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeCols, sorts, isFree, design]
  );

  const placedIn = (c) => (sorts[c] || []).slice(0, slotCount(c)).filter(Boolean).length;

  const getCell = (c, i) => sorts[c]?.[i] ?? '';

  const setCell = (c, i, value) => {
    setError('');
    setSorts((prev) => {
      const arr = [...(prev[c] || [])];
      arr[i] = value.replace(/[^0-9]/g, '');
      return { ...prev, [c]: arr };
    });
  };

  const valueCounts = useMemo(() => {
    const m = {};
    for (const c of activeCols) {
      const n = isFree ? lastFilled(sorts[c]) + 2 : design[c] || 0;
      for (let i = 0; i < n; i++) {
        const v = sorts[c]?.[i];
        if (v) m[v] = (m[v] || 0) + 1;
      }
    }
    return m;
  }, [sorts, activeCols, design, isFree]);

  const filledCount = Object.values(valueCounts).reduce((s, n) => s + n, 0);

  const cellProblem = (v) => {
    if (!v) return false;
    const n = Number(v);
    return valueCounts[v] > 1 || n < 1 || n > maxStmt;
  };

  const resetEntry = () => {
    setParticipant('');
    setSorts({});
    setEditingName(null);
    setError('');
  };

  const handleModeChange = (next) => {
    setMode(next);
    resetEntry();
    setNotice('');
    if (next === 'continue' && !selectedName && projectNames.length) {
      setSelectedName(projectNames[0]);
    }
  };

  const handleTypeChange = (t) => {
    setDraftType(t);
    setSorts({});
    setError('');
  };

  const handleDesignChange = (c, value) => {
    const n = Math.max(0, Math.min(99, parseInt(value, 10) || 0));
    setDraftDesign((d) => ({ ...d, [c]: n }));
    setSorts({});
  };

  const toggleFreeCol = (c) => {
    setDraftFreeCols((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
    setSorts({});
  };

  const focusNext = (key) => {
    const idx = cellKeys.indexOf(key);
    const next = cellKeys[idx + 1];
    if (next) cellRefs.current[next]?.focus();
    else addBtnRef.current?.focus();
  };

  // Load a saved participant back into the entry form
  const startEdit = (p) => {
    const restored = {};
    for (const [col, stmts] of Object.entries(p.sorts)) restored[col] = stmts.map(String);
    setSorts(restored);
    setParticipant(p.name);
    setEditingName(p.name);
    setError('');
    setNotice('');
    participantRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    participantRef.current?.focus();
  };

  const addParticipant = async () => {
    setNotice('');
    const pName = participant.trim();
    const projectName = name.trim();

    if (!projectName) return setError('Enter a project name first.');
    if (!active && projects[projectName])
      return setError(
        `A project named “${projectName}” already exists. Pick it under “Continue a project”.`
      );
    if (isFree && activeCols.length === 0)
      return setError('Select at least one column for the free distribution.');
    if (designSum === 0 && !(active && isFree))
      return setError(
        isFree
          ? 'Enter the idealized sort pattern (number of statements per selected column) first.'
          : 'Enter the Q sort design (number of statements per column) first.'
      );
    if (!pName) return setError('Enter the participant’s name.');
    if (
      active?.participants.some(
        (p) => p.name.toLowerCase() === pName.toLowerCase() && p.name !== editingName
      )
    )
      return setError(`“${pName}” is already in this project.`);

    // Forced design: every slot must be filled
    if (!isFree) {
      for (const c of activeCols) {
        for (let i = 0; i < design[c]; i++) {
          if (!sorts[c]?.[i]) return setError(`Column ${fmtCol(c)} still has empty slots.`);
        }
      }
    }
    // Range and duplicates
    for (const c of activeCols) {
      for (let i = 0; i < slotCount(c); i++) {
        const v = sorts[c]?.[i];
        if (!v) continue;
        const n = Number(v);
        if (n < 1 || n > maxStmt)
          return setError(
            `Statement numbers must be between 1 and ${maxStmt} (column ${fmtCol(c)}).`
          );
        if (valueCounts[v] > 1) return setError(`Statement ${v} is used more than once.`);
      }
    }
    // Free design: all statements must be placed
    if (isFree) {
      if (filledCount === 0) return setError('Enter at least one statement number.');
      if (expectedTotal > 0 && filledCount !== expectedTotal)
        return setError(
          `${filledCount} of ${expectedTotal} statements placed. Every statement must be placed exactly once.`
        );
    }

    // Free design: compare against the idealized pattern (warn, but allow an override)
    if (isFree && designSum > 0) {
      const diffs = activeCols
        .filter((c) => placedIn(c) !== (design[c] || 0))
        .map((c) => `${fmtCol(c)} (placed ${placedIn(c)}, expected ${design[c] || 0})`);
      if (
        diffs.length > 0 &&
        !window.confirm(
          `This sort differs from the idealized pattern in: ${diffs.join(', ')}.\n\nSave anyway?`
        )
      )
        return;
    }

    const cleanSorts = {};
    for (const c of activeCols) {
      const vals = [];
      for (let i = 0; i < slotCount(c); i++) {
        const v = sorts[c]?.[i];
        if (v) vals.push(Number(v));
      }
      if (vals.length) cleanSorts[c] = vals;
    }

    try {
      await db.transaction('rw', db.projects, async () => {
        const existing = await db.projects.get(projectName);
        if (!existing) {
          await db.projects.put({
            name: projectName,
            type,
            design: { ...design },
            freeColumns: isFree ? [...activeCols] : [],
            freeTotal: 0,
            statements: parseStatements(draftStmtText),
            participants: [{ name: pName, sorts: cleanSorts, addedAt: Date.now() }],
            complete: false,
            createdAt: Date.now(),
          });
        } else if (editingName) {
          await db.projects.put({
            ...existing,
            participants: existing.participants.map((p) =>
              p.name === editingName
                ? { ...p, name: pName, sorts: cleanSorts, updatedAt: Date.now() }
                : p
            ),
          });
        } else {
          await db.projects.put({
            ...existing,
            participants: [
              ...existing.participants,
              { name: pName, sorts: cleanSorts, addedAt: Date.now() },
            ],
          });
        }
      });
    } catch (e) {
      return setError(`Could not save to the database: ${e.message}`);
    }

    if (!active) {
      setStmtText(draftStmtText);
      setDraftStmtText('');
      setMode('continue');
      setSelectedName(projectName);
    }
    const wasEditing = !!editingName;
    resetEntry();
    setNotice(wasEditing ? `Updated ${pName}.` : `Saved ${pName}.`);
    setTimeout(() => participantRef.current?.focus(), 0);
  };

  const deleteParticipant = async (pName) => {
    if (!active || !window.confirm(`Remove ${pName} from ${active.name}?`)) return;
    await updateProject(active.name, (p) => ({
      ...p,
      participants: p.participants.filter((x) => x.name !== pName),
    }));
    if (editingName === pName) resetEntry();
  };

  const setComplete = async (value) => {
    if (!active) return;
    resetEntry();
    await updateProject(active.name, (p) => ({ ...p, complete: value }));
    setNotice(value ? 'Project data input marked complete.' : 'Project reopened for data entry.');
  };

  const openDelete = () => {
    setDeleteText('');
    setShowDelete(true);
  };

  const deleteProject = async () => {
    if (!active || deleteText !== active.name) return;
    clearTimeout(stmtTimer.current);
    await db.projects.delete(active.name);
    setShowDelete(false);
    setDeleteText('');
    setSelectedName('');
    setStmtText('');
    setMode('new');
    resetEntry();
  };

  // ----- Statements textarea (auto-saves to the project) -----
  const saveStatements = async (projectName, text) => {
    setStmtStatus('Saving…');
    try {
      await updateProject(projectName, (p) => ({ ...p, statements: parseStatements(text) }));
      setStmtStatus('Saved');
    } catch {
      setStmtStatus('Save failed');
    }
  };

  const handleStmtChange = (e) => {
    const v = e.target.value;
    if (!active) {
      setDraftStmtText(v);
      return;
    }
    setStmtText(v);
    setStmtStatus('Unsaved changes…');
    clearTimeout(stmtTimer.current);
    const projectName = active.name;
    stmtTimer.current = setTimeout(() => saveStatements(projectName, v), 600);
  };

  const handleStmtBlur = () => {
    if (active && stmtStatus === 'Unsaved changes…') {
      clearTimeout(stmtTimer.current);
      saveStatements(active.name, stmtText);
    }
  };

  // ----- Export -----
  const download = (filename, text, mime) => {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // CSV: one row per participant, one column per statement, value = column score
  const exportCsv = () => {
    if (!active) return;
    const n = projectN(active);
    const header = ['participant', ...Array.from({ length: n }, (_, i) => `S${i + 1}`)];
    const rows = active.participants.map((p) => {
      const scores = new Array(n).fill('');
      for (const [col, stmts] of Object.entries(p.sorts)) {
        stmts.forEach((s) => (scores[s - 1] = col));
      }
      return [p.name, ...scores];
    });
    const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
    download(
      `${active.name}.csv`,
      [header, ...rows].map((r) => r.map(esc).join(',')).join('\n'),
      'text/csv'
    );
  };

  const exportJson = () => {
    if (!active) return;
    download(
      `${active.name}.json`,
      JSON.stringify(buildExport(active), null, 2),
      'application/json'
    );
  };

  const inputBase =
    'rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:bg-slate-100 disabled:text-slate-500';

  if (loading) {
    return <div className="mx-auto max-w-5xl p-6 text-slate-500">Loading projects…</div>;
  }

  const colBadge = (c) =>
    c < 0
      ? 'bg-rose-100 text-rose-800'
      : c === 0
        ? 'bg-slate-200 text-slate-700'
        : 'bg-emerald-100 text-emerald-800';

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6 text-slate-800">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Q sort data entry</h1>
        <p className="mt-1 text-sm text-slate-600">
          Enter each participant’s sorted statements by column. Data is stored in this browser’s
          IndexedDB.
        </p>
      </header>

      {/* 1. New vs continue */}
      <section className="space-y-3">
        <h2 className="text-lg font-medium">Project</h2>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              checked={mode === 'new'}
              onChange={() => handleModeChange('new')}
            />
            Start a new project
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="mode"
              checked={mode === 'continue'}
              disabled={projectNames.length === 0}
              onChange={() => handleModeChange('continue')}
            />
            Continue a project
            {projectNames.length === 0 && (
              <span className="text-xs text-slate-500">(none saved yet)</span>
            )}
          </label>
          {mode === 'continue' && (
            <select
              className={inputBase}
              value={selectedName}
              onChange={(e) => {
                setSelectedName(e.target.value);
                resetEntry();
                setNotice('');
              }}
            >
              {projectNames.map((n) => (
                <option key={n} value={n}>
                  {n} ({projects[n].participants.length} participants
                  {projects[n].complete ? ', complete' : ''})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* 2. Project name */}
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="project-name">
            Project name
          </label>
          <input
            id="project-name"
            className={`${inputBase} w-full max-w-md`}
            value={name}
            readOnly={designLocked}
            disabled={designLocked}
            placeholder="e.g. Teacher attitudes study"
            onChange={(e) => setDraftName(e.target.value)}
          />
        </div>
      </section>

      {/* 3. Design */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-medium">Q sort design</h2>
          <p className="text-sm text-slate-600">
            Statements in total:{' '}
            <span className="font-semibold text-slate-900">{expectedTotal || '—'}</span>
            {designLocked && (
              <span className="ml-2 text-slate-500">(design locked once the project is saved)</span>
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="design-type"
              disabled={designLocked}
              checked={!isFree}
              onChange={() => handleTypeChange('forced')}
            />
            Forced distribution (fixed pattern)
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="design-type"
              disabled={designLocked}
              checked={isFree}
              onChange={() => handleTypeChange('free')}
            />
            Free distribution (choose columns)
          </label>
        </div>

        {!isFree ? (
          <div className="overflow-x-auto pb-2">
            <div className="flex min-w-max gap-1">
              {COLUMNS.map((c) => (
                <label key={c} className="flex w-14 flex-col items-center gap-1">
                  <span
                    className={`text-sm font-semibold ${
                      c < 0 ? 'text-rose-700' : c === 0 ? 'text-slate-600' : 'text-emerald-700'
                    }`}
                  >
                    {fmtCol(c)}
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    aria-label={`Number of statements in column ${fmtCol(c)}`}
                    className={`${inputBase} w-full px-1 py-2 text-center`}
                    value={design[c] || ''}
                    placeholder="0"
                    disabled={designLocked}
                    onChange={(e) => handleDesignChange(c, e.target.value)}
                  />
                </label>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-sm text-slate-600">
                <span className="font-medium text-slate-800">Step 1.</span> Select the columns
                participants may use.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {COLUMNS.map((c) => {
                  const on = freeCols.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={on}
                      disabled={designLocked}
                      onClick={() => toggleFreeCol(c)}
                      className={`w-12 rounded-md border py-1.5 text-sm font-semibold disabled:cursor-not-allowed ${
                        on
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      } ${designLocked && !on ? 'opacity-40' : ''}`}
                    >
                      {fmtCol(c)}
                    </button>
                  );
                })}
              </div>
              {!designLocked && (
                <div className="flex flex-wrap gap-2 text-sm">
                  <button
                    type="button"
                    className="rounded border border-slate-300 px-2 py-1 hover:bg-slate-50"
                    onClick={() => {
                      setDraftFreeCols(COLUMNS.filter((c) => c >= -6 && c <= 6));
                      setSorts({});
                    }}
                  >
                    −6 to +6
                  </button>
                  <button
                    type="button"
                    className="rounded border border-slate-300 px-2 py-1 hover:bg-slate-50"
                    onClick={() => {
                      setDraftFreeCols([]);
                      setDraftDesign(emptyDesign());
                      setSorts({});
                    }}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-slate-600">
                <span className="font-medium text-slate-800">Step 2.</span> Enter the idealized sort
                pattern: the number of statements you expect in each selected column. Its total sets
                the number of statements, and every participant’s sort is checked against it (a sort
                that deviates from the pattern is allowed only after you confirm).
              </p>
              {designLocked && designSum === 0 && (
                <p className="text-sm text-slate-500">
                  This project was saved before idealized patterns were supported, so it has none.
                </p>
              )}
              {activeCols.length === 0 ? (
                <p className="rounded-md border border-dashed border-slate-300 p-3 text-sm text-slate-500">
                  Select columns above and a count box for each will appear here.
                </p>
              ) : (
                <div className="overflow-x-auto pb-2">
                  <div className="flex min-w-max gap-1">
                    {activeCols.map((c) => (
                      <label key={c} className="flex w-14 flex-col items-center gap-1">
                        <span
                          className={`text-sm font-semibold ${
                            c < 0
                              ? 'text-rose-700'
                              : c === 0
                                ? 'text-slate-600'
                                : 'text-emerald-700'
                          }`}
                        >
                          {fmtCol(c)}
                        </span>
                        <input
                          type="number"
                          min="0"
                          max="99"
                          aria-label={`Idealized number of statements in column ${fmtCol(c)}`}
                          className={`${inputBase} w-full px-1 py-2 text-center`}
                          value={design[c] || ''}
                          placeholder="0"
                          disabled={designLocked}
                          onChange={(e) => handleDesignChange(c, e.target.value)}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {complete ? (
        <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-medium text-emerald-900">
            Data input for “{active.name}” is complete ({active.participants.length} participants).
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              className="rounded-md bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800"
              onClick={exportCsv}
            >
              Download CSV
            </button>
            <button
              className="rounded-md bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800"
              onClick={exportJson}
            >
              Download JSON
            </button>
            <button
              className="rounded-md border border-slate-300 bg-white px-4 py-2 hover:bg-slate-50"
              onClick={() => setComplete(false)}
            >
              Reopen for data entry
            </button>
          </div>
        </section>
      ) : (
        <>
          {/* 4. Participant name */}
          <section className="space-y-2">
            <h2 className="text-lg font-medium">Participant</h2>
            {editingName && (
              <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                Editing <span className="font-semibold">{editingName}</span>. Saving replaces their
                stored data.
              </p>
            )}
            <label className="mb-1 block text-sm font-medium" htmlFor="participant-name">
              Participant name
            </label>
            <input
              id="participant-name"
              ref={participantRef}
              className={`${inputBase} w-full max-w-md`}
              value={participant}
              placeholder="Name or ID"
              onChange={(e) => {
                setParticipant(e.target.value);
                setError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && cellKeys.length) {
                  e.preventDefault();
                  cellRefs.current[cellKeys[0]]?.focus();
                }
              }}
            />
          </section>

          {/* 5. Dynamic column inputs */}
          <section className="space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-medium">Statement numbers by column</h2>
              {activeCols.length > 0 && (
                <p className="text-sm text-slate-600">
                  {filledCount} of {expectedTotal || '?'} entered ·{' '}
                  {isFree
                    ? 'new slots appear as you type; Enter on an empty slot moves to the next column'
                    : 'Enter moves to the next slot'}
                </p>
              )}
            </div>

            {activeCols.length === 0 ? (
              <p className="rounded-md border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                {isFree
                  ? 'Select the columns in the design above and their input slots will appear here.'
                  : 'Set at least one column count in the design above and its input slots will appear here.'}
              </p>
            ) : (
              <div className="overflow-x-auto pb-2">
                <div className="flex min-w-max items-start gap-3">
                  {activeCols.map((c) => (
                    <div key={c} className="flex w-16 flex-col items-center gap-1.5">
                      <span className={`rounded px-2 py-0.5 text-sm font-semibold ${colBadge(c)}`}>
                        {fmtCol(c)}
                      </span>
                      {isFree && designSum > 0 && (
                        <span
                          title="statements placed / idealized pattern"
                          className={`text-xs ${
                            placedIn(c) !== (design[c] || 0)
                              ? 'font-semibold text-amber-700'
                              : 'text-slate-500'
                          }`}
                        >
                          {placedIn(c)}/{design[c] || 0}
                        </span>
                      )}
                      {Array.from({ length: slotCount(c) }, (_, i) => {
                        const key = `${c}:${i}`;
                        const v = getCell(c, i);
                        return (
                          <input
                            key={key}
                            ref={(el) => (cellRefs.current[key] = el)}
                            inputMode="numeric"
                            aria-label={`Column ${fmtCol(c)}, slot ${i + 1}`}
                            title={v ? statements[Number(v) - 1] : undefined}
                            className={`${inputBase} w-full px-1 text-center ${
                              cellProblem(v)
                                ? 'border-rose-500 bg-rose-50 focus:border-rose-500 focus:ring-rose-200'
                                : ''
                            }`}
                            value={v}
                            onChange={(e) => setCell(c, i, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                focusNext(key);
                              }
                            }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 6. Add / update button */}
          <section className="space-y-3">
            {error && (
              <p
                role="alert"
                className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800"
              >
                {error}
              </p>
            )}
            {notice && !error && (
              <p
                role="status"
                className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
              >
                {notice}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              <button
                ref={addBtnRef}
                onClick={addParticipant}
                className="rounded-md bg-indigo-600 px-5 py-2.5 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                {editingName ? 'Update participant’s data' : 'Add participant’s data'}
              </button>
              {editingName && (
                <button
                  onClick={() => {
                    resetEntry();
                    setTimeout(() => participantRef.current?.focus(), 0);
                  }}
                  className="rounded-md border border-slate-300 bg-white px-4 py-2.5 hover:bg-slate-50"
                >
                  Cancel edit
                </button>
              )}
            </div>
          </section>
        </>
      )}

      {/* Saved participants + completion */}
      {active && (
        <section className="space-y-3 border-t border-slate-200 pt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-medium">
              Participants in “{active.name}” ({active.participants.length})
            </h2>
            {!complete && active.participants.length > 0 && (
              <p className="text-sm text-slate-500">
                Click a participant to load their data for editing.
              </p>
            )}
          </div>
          {active.participants.length === 0 ? (
            <p className="text-sm text-slate-500">No participants yet.</p>
          ) : (
            <ul className="divide-y divide-slate-200 rounded-md border border-slate-200">
              {active.participants.map((p) => (
                <li
                  key={p.name}
                  className={`flex items-center justify-between text-sm ${
                    editingName === p.name ? 'bg-amber-50' : ''
                  }`}
                >
                  <button
                    disabled={complete}
                    onClick={() => startEdit(p)}
                    className="flex-1 px-3 py-2 text-left hover:bg-slate-50 disabled:cursor-default disabled:hover:bg-transparent"
                  >
                    {p.name}
                    {editingName === p.name && (
                      <span className="ml-2 text-xs text-amber-800">(editing)</span>
                    )}
                  </button>
                  {!complete && (
                    <button
                      className="px-3 py-2 text-rose-700 hover:underline"
                      onClick={() => deleteParticipant(p.name)}
                    >
                      Remove
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {!complete && (
              <button
                disabled={active.participants.length === 0}
                onClick={() => setComplete(true)}
                className="rounded-md bg-slate-900 px-5 py-2.5 font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Project data input complete
              </button>
            )}
            <button
              onClick={openDelete}
              className="rounded-md border border-rose-300 px-4 py-2.5 text-rose-700 hover:bg-rose-50"
            >
              Delete project
            </button>
          </div>
        </section>
      )}

      {/* Statements */}
      <section className="space-y-2 border-t border-slate-200 pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-medium">Project statements</h2>
          <p className="text-sm text-slate-600">
            {statements.length} statement{statements.length === 1 ? '' : 's'}
            {active && stmtStatus && <span className="ml-2 text-slate-500">· {stmtStatus}</span>}
          </p>
        </div>
        <p className="text-sm text-slate-600">
          Paste one statement per line (line 1 is statement 1, line 2 is statement 2, and so on).{' '}
          {active
            ? 'Changes are saved to the project automatically.'
            : 'They will be saved with the project when you add its first participant.'}{' '}
          Hover a filled slot above to see its statement.
        </p>
        <textarea
          value={stmtValue}
          onChange={handleStmtChange}
          onBlur={handleStmtBlur}
          rows={16}
          spellCheck={false}
          placeholder={
            'People should take more responsibility for their own learning\nTeachers need more time for planning\n…'
          }
          className={`${inputBase} min-h-[24rem] w-full resize-y font-mono text-sm leading-relaxed`}
        />
        {statementMismatch && (
          <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            The statement list has {statements.length} statements, but the Q sort design totals{' '}
            {designSum}.
          </p>
        )}
      </section>

      {/* Delete-project confirmation: the project name must be typed to enable the button */}
      {showDelete && active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onMouseDown={(e) => e.target === e.currentTarget && setShowDelete(false)}
          onKeyDown={(e) => e.key === 'Escape' && setShowDelete(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
          >
            <h3 id="delete-title" className="text-lg font-semibold text-slate-900">
              Delete this project?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              This permanently deletes <span className="font-semibold">{active.name}</span>,
              including its {active.participants.length} participant
              {active.participants.length === 1 ? '' : 's'}, design and statements. This cannot be
              undone.
            </p>
            <label htmlFor="delete-confirm" className="mt-4 block text-sm text-slate-700">
              Please type <span className="font-mono font-semibold">{active.name}</span> to confirm.
            </label>
            <input
              id="delete-confirm"
              autoFocus
              autoComplete="off"
              value={deleteText}
              onChange={(e) => setDeleteText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && deleteText === active.name) deleteProject();
              }}
              className={`${inputBase} mt-1 w-full`}
            />
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowDelete(false)}
                className="rounded-md border border-slate-300 bg-white px-4 py-2 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                disabled={deleteText !== active.name}
                onClick={deleteProject}
                className="rounded-md bg-rose-600 px-4 py-2 font-medium text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Delete this project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
