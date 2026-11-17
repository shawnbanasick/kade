import React, { useMemo, useRef, useState, useCallback } from 'react';

/**
 * QSortViewer (Tailwind CSS version)
 *
 * Props
 *  - mainDataObject: array of { name: string, rawSort: number[] }
 *      (a nested array is also accepted; it is flattened)
 *  - statements:     string[]   statement texts, in statement order (#1 first)
 *  - multiplierArray: number[]  Q-sort design pattern. Index 0 = column -6,
 *                               so index i corresponds to column (i - 6).
 *
 * A participant is flagged "unforced" if the number of statements they placed
 * in any column differs from the design pattern.
 */

const MIN_COLUMN = -6;

const formatColumn = (value) => (value > 0 ? `+${value}` : `${value}`);

// Shared class strings
const FLAG_COLORS = 'bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-200';

const PANEL =
  'min-h-0 overflow-y-auto rounded-md border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800';

const nameButtonClasses = (unforced, active) =>
  [
    'mb-0.5 block w-full cursor-pointer rounded border-l-[3px] px-2.5 py-2 text-left',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700 dark:focus-visible:outline-blue-300',
    unforced
      ? `${FLAG_COLORS} hover:bg-amber-200 dark:hover:bg-amber-900/70 ${
          active ? 'border-amber-500 font-semibold' : 'border-transparent'
        }`
      : `bg-transparent hover:bg-blue-50 dark:hover:bg-slate-700 ${
          active
            ? 'border-blue-700 bg-blue-50 font-semibold dark:border-blue-300 dark:bg-slate-700'
            : 'border-transparent'
        }`,
  ].join(' ');

export default function QSortViewer(props) {
  const { mainDataObject = [], statements = [], multiplierArray = [] } = props;

  const rightRef = useRef(null);
  const sectionRefs = useRef({});
  const [activeIndex, setActiveIndex] = useState(0);

  const participants = useMemo(() => {
    const flat = Array.isArray(mainDataObject) ? mainDataObject.flat(Infinity) : [];

    return flat
      .filter((p) => p && Array.isArray(p.rawSort))
      .map((p, index) => {
        // Group statement numbers (1-based) by the column value they were placed in.
        const byColumn = new Map();
        p.rawSort.forEach((value, i) => {
          if (!byColumn.has(value)) byColumn.set(value, []);
          byColumn.get(value).push(i + 1);
        });

        // Design pattern: column value -> expected number of statements.
        const expected = new Map();
        multiplierArray.forEach((count, i) => {
          if (count > 0) expected.set(i + MIN_COLUMN, count);
        });

        // Show any column that is expected or actually used.
        const columnValues = new Set([...expected.keys(), ...byColumn.keys()]);

        let unforced = false;
        const columns = [...columnValues]
          .sort((a, b) => b - a) // highest column first
          .map((value) => {
            const items = byColumn.get(value) || [];
            if (items.length !== (expected.get(value) || 0)) unforced = true;
            return { value, items, expected: expected.get(value) || 0 };
          });

        return { id: `${p.name}-${index}`, name: p.name, columns, unforced };
      });
  }, [mainDataObject, multiplierArray]);

  const scrollToParticipant = useCallback((index) => {
    const container = rightRef.current;
    const section = sectionRefs.current[index];
    if (!container || !section) return;
    container.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  // Keep the left-hand highlight in step with manual scrolling of the right column.
  const handleScroll = useCallback(() => {
    const container = rightRef.current;
    if (!container) return;
    const probe = container.scrollTop + 40;
    let current = 0;
    participants.forEach((_, i) => {
      const el = sectionRefs.current[i];
      if (el && el.offsetTop <= probe) current = i;
    });
    // At the very bottom, the last participant may be too short to reach the top.
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 2) {
      current = participants.length - 1;
    }
    setActiveIndex(current);
  }, [participants]);

  return (
    <div className="box-border flex h-[calc(100dvh-13.5rem)] min-h-80 rounded-tl-md rounded-bl-md flex-col gap-4 bg-slate-100 p-4 font-sans leading-snug text-slate-900 sm:flex-row dark:bg-slate-900 dark:text-slate-100">
      <nav aria-label="Participants" className={`${PANEL} shrink-0 basis-40 p-1.5 sm:basis-60`}>
        {participants.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className={nameButtonClasses(p.unforced, i === activeIndex)}
            aria-current={i === activeIndex}
            onClick={() => scrollToParticipant(i)}
            title={p.unforced ? 'Unforced sort' : undefined}
          >
            {p.name}
          </button>
        ))}
      </nav>

      <div ref={rightRef} onScroll={handleScroll} className={`${PANEL} relative flex-1 px-6 pb-10`}>
        {participants.length === 0 && (
          <p className="p-6 text-slate-500 dark:text-slate-400">No participant data to display.</p>
        )}

        {participants.map((p, i) => (
          <section
            key={p.id}
            ref={(el) => (sectionRefs.current[i] = el)}
            className="border-b border-slate-200 pb-7 pt-6 last:border-b-0 dark:border-slate-700"
          >
            <h2 className="mb-3 flex flex-wrap items-baseline gap-3 text-2xl font-bold">
              <span className={`-ml-1.5 rounded px-1.5 ${p.unforced ? FLAG_COLORS : ''}`}>
                {p.name}
              </span>
              {p.unforced && (
                <span className="rounded-full border border-amber-400 bg-amber-100 px-2 py-0.5 text-sm font-semibold text-amber-900 dark:border-amber-700 dark:bg-amber-900/50 dark:text-amber-200">
                  unforced sort
                </span>
              )}
            </h2>

            {p.columns.map((col) => (
              <div key={col.value}>
                <h3 className="mb-1.5 mt-4 text-[1.05rem] font-bold text-blue-800 dark:text-blue-300">
                  {formatColumn(col.value)} Statements
                  {col.items.length !== col.expected && (
                    <span className="ml-1.5 text-sm font-normal text-slate-500 dark:text-slate-400">
                      ({col.items.length} placed, {col.expected} expected)
                    </span>
                  )}
                </h3>
                {col.items.length > 0 ? (
                  <ul className="m-0 list-disc pl-[22px]">
                    {col.items.map((n) => (
                      <li key={n} className="my-0.5 pl-12 -indent-12">
                        <span className="inline-block w-12 indent-0 tabular-nums text-slate-500 dark:text-slate-400">
                          #{n}
                        </span>
                        {statements[n - 1] ?? <em>(statement text missing)</em>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="m-0 ml-0.5 text-sm text-slate-500 dark:text-slate-400">
                    No statements
                  </p>
                )}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
