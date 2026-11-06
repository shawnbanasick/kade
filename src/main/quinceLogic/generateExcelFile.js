import { dialog } from 'electron';
import currentDate1 from '../../renderer/src/Utils/currentDate1';
import currentTime1 from '../../renderer/src/Utils/currentTime1';
import ExcelJS from 'exceljs';

// "column4" -> "column +4", "columnN4" -> "column -4"
function formatKey(key) {
  let rest = key.replace(/^column\s*/i, '');
  if (/^N/i.test(rest)) rest = '-' + rest.slice(1);
  else if (/^P/i.test(rest)) rest = '+' + rest.slice(1);
  else if (/^\d/.test(rest)) rest = '+' + rest;
  return `column ${rest}`;
}

// "(s30) 1111", or "(s30) no response" when the value is empty
function formatCellText(item) {
  const raw = item?.value;
  const hasValue = raw !== null && raw !== undefined && String(raw).trim() !== '';
  const value = hasValue ? String(raw) : 'no response';
  return item?.slot ? `(${item.slot}) ${value}` : value;
}

// Scans all rows and returns [{ key, index, header }, ...] for every dynamic column
function getDynamicColumnDefs(data) {
  const maxLengths = new Map(); // keeps first-seen order
  data.forEach((item) => {
    Object.entries(item?.columns || {}).forEach(([key, arr]) => {
      const len = Array.isArray(arr) ? arr.length : 0;
      maxLengths.set(key, Math.max(maxLengths.get(key) ?? 0, len));
    });
  });

  const defs = [];
  maxLengths.forEach((len, key) => {
    for (let i = 0; i < len; i++) {
      defs.push({ key, index: i, header: `${formatKey(key)} #${i + 1}` });
    }
  });
  return defs;
}

// "1*p*3|2*u*0|..." -> [{ statement: 1, initial: 'p', final: 3 }, ...]
function parseTrace(trace) {
  if (typeof trace !== 'string' || !trace.trim()) return [];
  return trace
    .split('|')
    .map((part) => {
      const [num, initial, final] = part.split('*');
      return {
        statement: Number(num),
        initial: initial?.trim().toLowerCase(),
        final: Number(final),
      };
    })
    .filter(
      (e) =>
        Number.isFinite(e.statement) &&
        ['p', 'u', 'n'].includes(e.initial) &&
        Number.isFinite(e.final)
    );
}

const INITIAL_LABELS = { p: 'Positive', u: 'Uncertain', n: 'Negative' };

/*
 *****************************
 * Creates a Quince export Excel file from the provided data.
 * @param {*} dataContent - The data content to include in the Excel file.
 *****************************
 */

const createQuinceExportExcelFile = async (dataContent) => {
  //   console.log('Data received for Quince Excel file:', JSON.stringify(dataContent.data));

  const textObject = dataContent?.translatedTextObj || {};
  const data = [...dataContent?.data] || [];

  const numStatements = data[0]?.sort?.length ? data[0].sort.length - 1 : 0; // subtract 1 for the participant ID

  var datenum = function (v, date1904) {
    if (date1904) {
      v += 1462;
    }
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
  };

  const workbook = new ExcelJS.Workbook();

  // 1. name project
  const projectName2 = data[0]?.projectName || 'Unknown Project';
  const projectName = projectName2
    .replace(/[\\\/\?\*\[\]:]/g, '-') // remove illegal characters
    .trim()
    .slice(0, 31);

  // FORMAT HEADER ROW
  const centered = { horizontal: 'center', vertical: 'middle' };
  const thinBorder = {
    top: { style: 'thin', color: { argb: 'FF000000' } },
    left: { style: 'thin', color: { argb: 'FF000000' } },
    bottom: { style: 'thin', color: { argb: 'FF000000' } },
    right: { style: 'thin', color: { argb: 'FF000000' } },
  };
  const headerStyle = {
    font: { name: 'Arial', size: 11, bold: true },
    alignment: { horizontal: 'center' },
    fill: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd1e5f2' },
    },
    border: thinBorder,
  };

  // PROJECT INFO WORKSHEET
  const projectInfoWorksheet = workbook.addWorksheet(
    textObject?.projectInfo || 'Project Information'
  );

  projectInfoWorksheet.getColumn(1).width = 50;

  const cellA2 = projectInfoWorksheet.getCell('A2');
  cellA2.value = `${textObject?.projectName}`;
  cellA2.font = { name: 'Arial', size: 12, bold: true };
  cellA2.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'd1e5f2' },
  };
  cellA2.alignment = centered;
  cellA2.border = thinBorder;

  const cellA3 = projectInfoWorksheet.getCell('A3');
  cellA3.value = `${projectName || 'Unknown Project'}`;
  cellA3.font = { name: 'Arial', size: 12 };
  cellA3.alignment = centered;

  const cellA6 = projectInfoWorksheet.getCell('A6');
  cellA6.value = `${textObject?.statements || 'Statements'}`;
  cellA6.font = { name: 'Arial', size: 12, bold: true };
  cellA6.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'd1e5f2' },
  };
  cellA6.border = thinBorder;
  cellA6.alignment = centered;

  const cellA7 = projectInfoWorksheet.getCell('A7');
  cellA7.value = `${numStatements || 0}`;
  cellA7.font = { name: 'Arial', size: 12 };
  cellA7.alignment = centered;

  const cellA10 = projectInfoWorksheet.getCell('A10');
  cellA10.value = `${textObject?.qSorts || 'Q Sorts'}`;
  cellA10.font = { name: 'Arial', size: 12, bold: true };
  cellA10.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'd1e5f2' },
  };
  cellA10.border = thinBorder;
  cellA10.alignment = centered;

  const cellA11 = projectInfoWorksheet.getCell('A11');
  cellA11.value = `${data?.length || 0}`;
  cellA11.font = { name: 'Arial', size: 12 };
  cellA11.alignment = centered;

  // MAIN DATA WORKSHEET
  const mainWorksheet = workbook.addWorksheet(textObject?.mainData || projectName || 'Quince Data');

  const fixedColumns = [
    { header: textObject?.randomId || 'Random Id', key: 'pName', width: 20 },
    { header: textObject?.participantId || 'Participant Id', key: 'pId', width: 20 },
    { header: textObject?.urlUsercode || 'URL Usercode', key: 'urlUsercode', width: 20 },
    { header: textObject?.deviceType || 'Device Type', key: 'device', width: 20 },
    { header: textObject?.dateTime || 'Date and Time', key: 'dateTime', width: 20 },
    { header: textObject?.timeWelcome || 'Welcome - Time on Page', key: 'timeOnPage', width: 20 },
    { header: textObject?.timeConsent || 'Consent - Time on Page', key: 'timeOnPage', width: 20 },
    { header: textObject?.timePresort || 'Pre-sort - Time on Page', key: 'timeOnPage', width: 20 },
    { header: textObject?.timeRefine || 'Refinement - Time on Page', key: 'timeOnPage', width: 20 },
    { header: textObject?.timeSort || 'Sort - Time on Page', key: 'timeOnPage', width: 20 },
    {
      header: textObject?.timePostsort || 'Post-sort - Time on Page',
      key: 'timeOnPage',
      width: 20,
    },
    { header: textObject?.timeSurvey || 'Survey - Time on Page', key: 'timeOnPage', width: 20 },
    { header: textObject?.neg || 'Pre-sort Negative', key: 'neg', width: 50 },
    { header: textObject?.neu || 'Pre-sort Neutral', key: 'neu', width: 50 },
    { header: textObject?.pos || 'Pre-sort Positive', key: 'pos', width: 50 },
  ];

  const dynamicDefs = getDynamicColumnDefs(data);
  const dynamicColumns = dynamicDefs.map((def) => ({
    header: def.header,
    key: `${def.key}__${def.index}`,
    width: 20,
  }));

  mainWorksheet.columns = [...fixedColumns, ...dynamicColumns];
  mainWorksheet.views = [{ state: 'frozen', xSplit: 1, ySplit: 1 }];

  mainWorksheet.getRow(1).eachCell((cell) => {
    Object.assign(cell, headerStyle);
  });

  mainWorksheet.getRow(1).eachCell((cell) => {
    Object.assign(cell, headerStyle);
  });

  // ITERATE THROUGH DATA AND POPULATE CELLS
  data.forEach((item, index) => {
    // RANDOM ID
    let cellDesignation = `A${index + 2}`;
    const cell = mainWorksheet.getCell(cellDesignation);
    cell.value = item?.randomId || '';

    // Participant ID
    let cellDesignation2 = `B${index + 2}`;
    const cell2 = mainWorksheet.getCell(cellDesignation2);
    if (item.partId === undefined || item.partId === null) {
      cell2.value = textObject?.noPartId || 'no participant ID';
    } else {
      cell2.value = item.partId || '';
    }

    // Participant URL Usercode
    let cellDesignation3 = `C${index + 2}`;
    const cell3 = mainWorksheet.getCell(cellDesignation3);
    if (item.urlUsercode === undefined || item.urlUsercode === null) {
      cell3.value = textObject?.noUrlUsercode || 'no URL Usercode';
    } else {
      cell3.value = item?.urlUsercode || '';
    }

    // DEVICE
    let cellDesignation4 = `D${index + 2}`;
    const cell4 = mainWorksheet.getCell(cellDesignation4);
    cell4.value = item?.device || 'no device info';
    cell4.alignment = centered;

    // DATE and TIME
    let cellDesignation5 = `E${index + 2}`;
    const cell5 = mainWorksheet.getCell(cellDesignation5);
    cell5.value = item?.dateTime.replace(/[\\\/\?\*\[\]:]/g, '-') || 'no date/time info';
    cell5.alignment = centered;

    // Welcome page TIME ON PAGE
    let cellDesignation6 = `F${index + 2}`;
    const cell6 = mainWorksheet.getCell(cellDesignation6);
    cell6.value = item?.timing?.welcome || textObject?.noInfo || 'no info';
    cell6.alignment = centered;

    // Consent page TIME ON PAGE
    let cellDesignation7 = `G${index + 2}`;
    const cell7 = mainWorksheet.getCell(cellDesignation7);
    cell7.value = item?.timing?.consent || textObject?.noInfo || 'no info';
    cell7.alignment = centered;

    // Pre-sort page TIME ON PAGE
    let cellDesignation8 = `H${index + 2}`;
    const cell8 = mainWorksheet.getCell(cellDesignation8);
    cell8.value = item?.timing?.presort || textObject?.noInfo || 'no info';
    cell8.alignment = centered;

    // Refinement page TIME ON PAGE
    let cellDesignation9 = `I${index + 2}`;
    const cell9 = mainWorksheet.getCell(cellDesignation9);
    cell9.value = item?.timing?.refine || textObject?.noInfo || 'no info';
    cell9.alignment = centered;

    // Sort page TIME ON PAGE
    let cellDesignation10 = `J${index + 2}`;
    const cell10 = mainWorksheet.getCell(cellDesignation10);
    cell10.value = item?.timing?.sort || textObject?.noInfo || 'no info';
    cell10.alignment = centered;

    // Post-sort page TIME ON PAGE
    let cellDesignation11 = `K${index + 2}`;
    const cell11 = mainWorksheet.getCell(cellDesignation11);
    cell11.value = item?.timing?.postsort || textObject?.noInfo || 'no info';
    cell11.alignment = centered;

    // Survey page TIME ON PAGE
    let cellDesignation12 = `L${index + 2}`;
    const cell12 = mainWorksheet.getCell(cellDesignation12);
    cell12.value = item?.timing?.survey || 'no info';
    cell12.alignment = centered;

    // PRE-SORT NEG
    let cellDesignation14 = `N${index + 2}`;
    const cell14 = mainWorksheet.getCell(cellDesignation14);
    cell14.value =
      item.items?.neg?.length > 0
        ? `(${item.items?.neg.length}) ${item.items?.neg.join(', ')}`
        : textObject?.noInfo || 'no info';

    // PRE-SORT NEU
    let cellDesignation15 = `O${index + 2}`;
    const cell15 = mainWorksheet.getCell(cellDesignation15);
    cell15.value =
      item.items?.neu?.length > 0
        ? `(${item.items?.neu.length}) ${item.items?.neu.join(', ')}`
        : textObject?.noInfo || 'no info';

    // PRE-SORT POS
    let cellDesignation13 = `M${index + 2}`;
    const cell13 = mainWorksheet.getCell(cellDesignation13);
    cell13.value =
      item.items?.pos?.length > 0
        ? `(${item.items?.pos.length}) ${item.items?.pos.join(', ')}`
        : textObject?.noInfo || 'no info';

    // DYNAMIC COLUMNS (column +4 #1, column -4 #1, ...) appended after the fixed columns
    dynamicDefs.forEach((def, i) => {
      const dynCell = mainWorksheet.getCell(index + 2, fixedColumns.length + 1 + i);
      const entry = item?.columns?.[def.key]?.[def.index];
      dynCell.value = entry ? formatCellText(entry) : '';
      dynCell.alignment = centered;
    });
  });

  // ===== SORTS WORKSHEET =====
  const sortsWorksheet = workbook.addWorksheet(textObject?.qSorts || 'Q Sorts');

  // Number of statements = longest sort array minus the participant ID
  const statementCount = data.reduce(
    (max, item) => Math.max(max, Array.isArray(item?.sort) ? item.sort.length - 1 : 0),
    0
  );

  const prefixCount = 3; // participant, partId, urlUsercode

  sortsWorksheet.columns = [
    { header: textObject?.participant || 'Participant', key: 'participant', width: 20 },
    { header: textObject?.participantId || 'Participant Id', key: 'partId', width: 20 },
    { header: textObject?.urlUsercode || 'URL Usercode', key: 'urlUsercode', width: 20 },
    ...Array.from({ length: statementCount }, (_, i) => ({
      header: `s${i + 1}`,
      key: `s${i + 1}`,
      width: 6,
    })),
  ];

  // Style the header row (reuses headerStyle from above)
  sortsWorksheet.getRow(1).eachCell((cell) => {
    Object.assign(cell, headerStyle);
  });

  // Add one row per participant
  data.forEach((item) => {
    if (!Array.isArray(item?.sort) || item.sort.length === 0) return;
    const [participant, ...values] = item.sort;

    const partId =
      item?.partId === undefined || item?.partId === null ? textObject.noPartId : item.partId;
    const urlUsercode =
      item?.urlUsercode === undefined || item?.urlUsercode === null
        ? textObject.noUrlUsercode
        : item.urlUsercode;

    const row = sortsWorksheet.addRow([participant, partId, urlUsercode, ...values]);
    row.eachCell((cell, colNumber) => {
      if (colNumber > prefixCount) cell.alignment = centered;
    });
  });

  // Freeze the header row and the three identifier columns
  sortsWorksheet.views = [{ state: 'frozen', xSplit: prefixCount, ySplit: 1 }];

  // ===== PRESORT-UNUSUAL WORKSHEET =====
  const unusualWorksheet = workbook.addWorksheet(textObject?.presortTracing || 'Presort Tracing');

  // 1. Work out the final-value scale (min/max) for each project (used internally)
  const scaleByProject = new Map();
  data.forEach((item) => {
    const key = item?.projectName || '';
    parseTrace(item?.presortTrace).forEach(({ final }) => {
      const s = scaleByProject.get(key) || { min: Infinity, max: -Infinity };
      s.min = Math.min(s.min, final);
      s.max = Math.max(s.max, final);
      scaleByProject.set(key, s);
    });
  });

  const finalSide = (value, scale) => {
    const mid = (scale.min + scale.max) / 2;
    if (value > mid) return 'p';
    if (value < mid) return 'n';
    return 'u';
  };

  unusualWorksheet.columns = [
    { header: textObject?.participantNum || 'Participant #', key: 'num', width: 14 },
    { header: textObject?.randomId || 'Random Id', key: 'randomId', width: 20 },
    { header: textObject?.participantId || 'Participant Id', key: 'partId', width: 20 },
    { header: textObject?.urlUsercode || 'URL Usercode', key: 'urlUsercode', width: 20 },
    { header: textObject?.statement || 'Statement', key: 'statement', width: 12 },
    { header: textObject?.presortValues || 'Pre-sort Values', key: 'initial', width: 20 },
    { header: textObject?.qSortValue || 'Q Sort Value', key: 'final', width: 14 },
    { header: textObject?.pattern || 'Pattern', key: 'pattern', width: 28 },
  ];
  unusualWorksheet.getRow(1).eachCell((cell) => {
    Object.assign(cell, headerStyle);
  });

  // Fill used to flag participants with unusual placements
  const flagFill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFF8CBAD' }, // light orange
  };

  // 2. Add rows
  data.forEach((item, index) => {
    const scale = scaleByProject.get(item?.projectName || '');
    const entries = parseTrace(item?.presortTrace);
    if (!scale || entries.length === 0) return;

    const participantNum = index + 1;
    const randomId = item?.randomId || '';
    const partId =
      item?.partId === undefined || item?.partId === null ? textObject.noPartId : item.partId;
    const urlUsercode =
      item?.urlUsercode === undefined || item?.urlUsercode === null
        ? textObject.noUrlUsercode
        : item.urlUsercode;

    const unusual = entries.filter((e) => {
      const side = finalSide(e.final, scale);
      return (e.initial === 'p' && side === 'n') || (e.initial === 'n' && side === 'p');
    });

    const styleRow = (row, flagged) => {
      row.eachCell((cell, col) => {
        if (col === 1 || col > 4) cell.alignment = centered;
      });
      if (flagged) row.getCell(2).fill = flagFill; // randomId cell
    };

    if (unusual.length === 0) {
      const row = unusualWorksheet.addRow({
        num: participantNum,
        randomId,
        partId,
        urlUsercode,
        pattern: textObject?.noUnusual || 'No Unusual Statements',
      });
      styleRow(row, false);
      return;
    }

    unusual.forEach((e) => {
      const row = unusualWorksheet.addRow({
        num: participantNum,
        randomId,
        partId,
        urlUsercode,
        statement: e.statement,
        initial: INITIAL_LABELS[e.initial],
        final: e.final,
        pattern:
          e.initial === 'p'
            ? textObject?.posToNeg || 'Positive → Negative side'
            : textObject?.negToPos || 'Negative → Positive side',
      });
      styleRow(row, true);
    });
  });

  unusualWorksheet.views = [{ state: 'frozen', xSplit: 4, ySplit: 1 }];

  // ===== SURVEY HELPERS =====
  const NO_RESPONSE = 'no response';
  const PCT = '0.0%';

  const isRating = (type) => /^rating\d+$/.test(type);

  // q0 -> itemNum1, q1 -> itemNum2, ...
  const itemKey = (q) => `itemNum${Number(String(q.key).replace(/\D/g, '')) + 1}`;

  // Strips {{{b}}}...{{{/b}}} and <b>...</b> markup from labels, notes, and options
  const cleanLabel = (s) =>
    String(s ?? '')
      .replace(/\{\{\{\/?[a-z]+\}\}\}/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  // 2 | [1,2] | "1,2,nr,1" | "4-some text" -> [{ num, text } | null, ...]
  function parseTokens(raw) {
    const parts = Array.isArray(raw) ? raw : typeof raw === 'string' ? raw.split(',') : [raw];
    return parts.map((p) => {
      if (p === null || p === undefined) return null;
      const s = String(p).trim();
      if (s === '' || /^(nr|no response)$/i.test(s)) return null;
      const m = s.match(/^(\d+)\s*-\s*(.*)$/);
      if (m) return { num: Number(m[1]), text: m[2].trim() };
      if (/^\d+$/.test(s)) return { num: Number(s), text: '' };
      return { num: null, text: s };
    });
  }

  // Option number(s) -> readable text, e.g. "2 - Sophomore" or "4 - Other (...): typed text"
  const describeChoice = (q) => (t) => {
    const label = t.num >= 1 ? q.options[t.num - 1] : undefined;
    const base = label ? `${t.num} - ${cleanLabel(label)}` : String(t.num ?? '');
    return t.text ? (base ? `${base}: ${t.text}` : t.text) : base;
  };

  // Cell value(s) for the survey-responses sheet (one value, or one per statement for ratings)
  function answerCells(q, raw) {
    if (q.type === 'text' || q.type === 'textarea') {
      const s = raw === null || raw === undefined ? '' : String(raw).trim();
      return [s === '' || /^no response$/i.test(s) ? NO_RESPONSE : s];
    }
    const tokens = parseTokens(raw);
    if (isRating(q.type)) {
      return q.options.map((_, i) =>
        tokens[i] && tokens[i].num !== null ? tokens[i].num : NO_RESPONSE
      );
    }
    // radio, select, checkbox
    const chosen = (q.type === 'checkbox' ? tokens : tokens.slice(0, 1)).filter(Boolean);
    return [chosen.length ? chosen.map(describeChoice(q)).join('; ') : NO_RESPONSE];
  }

  function addSurveySheets({ workbook, data, questions, headerStyle, textObject }) {
    const centered = { horizontal: 'center', vertical: 'middle' };
    const reportQsSummary = (questions || []).filter((q) => q?.type && q.type !== 'information');
    const reportQsSheets = (questions || []).filter(
      (q) => q?.type && q.type !== 'information' && q.type !== 'textarea' && q.type !== 'text'
    );
    if (reportQsSummary.length === 0) return;

    const styleHeaderRow = (row) => row.eachCell((cell) => Object.assign(cell, headerStyle));

    // Unique, legal sheet names (max 31 chars)
    const used = new Set(workbook.worksheets.map((w) => w.name.toLowerCase()));
    const uniqueName = (base) => {
      const clean =
        base
          .replace(/[\\\/\?\*\[\]:]/g, '-')
          .replace(/^'+|'+$/g, '')
          .trim() || 'sheet';
      let name = clean.slice(0, 31);
      for (let n = 2; used.has(name.toLowerCase()); n++) {
        const suffix = ` (${n})`;
        name = clean.slice(0, 31 - suffix.length) + suffix;
      }
      used.add(name.toLowerCase());
      return name;
    };

    // ---------- 1. SURVEY-RESPONSES SHEET ----------
    const respWs = workbook.addWorksheet(
      uniqueName(textObject?.surveyResponses || 'Survey Responses')
    );
    const colDefs = [
      { header: textObject?.participantNum || 'Participant #', width: 14 },
      { header: textObject?.randomId || 'Random Id', width: 20 },
      { header: textObject?.participantId || 'Participant Id', width: 20 },
      { header: textObject?.urlUsercode || 'URL Usercode', width: 20 },
    ];
    const notes = {}; // column number -> header note
    const ratingCols = new Set();

    reportQsSummary.forEach((q) => {
      if (isRating(q.type)) {
        q.options.forEach((opt, i) => {
          colDefs.push({ header: `${q.key}.${i + 1}`, width: 12 });
          const colNum = colDefs.length;
          ratingCols.add(colNum);
          notes[colNum] = `${cleanLabel(q.label)}\n${cleanLabel(opt)}`;
        });
      } else {
        colDefs.push({
          header: q.key,
          width: q.type === 'textarea' || q.type === 'text' ? 35 : 28,
        });
        notes[colDefs.length] = cleanLabel(q.label);
      }
    });

    respWs.columns = colDefs;
    styleHeaderRow(respWs.getRow(1));
    Object.entries(notes).forEach(([col, text]) => {
      respWs.getRow(1).getCell(Number(col)).note = text; // hover a header to see the question
    });

    data.forEach((item, index) => {
      const partId =
        item?.partId === undefined || item?.partId === null
          ? textObject?.noPartId || 'No Participant ID'
          : item.partId;
      const urlUsercode =
        item?.urlUsercode === undefined || item?.urlUsercode === null
          ? textObject?.noUrlUsercode || 'No URL Usercode'
          : item.urlUsercode;
      const answers = reportQsSummary.flatMap((q) => answerCells(q, item?.itemNums?.[itemKey(q)]));
      const row = respWs.addRow([index + 1, item?.randomId || '', partId, urlUsercode, ...answers]);
      row.eachCell({ includeEmpty: true }, (cell, col) => {
        cell.alignment =
          col === 1 || ratingCols.has(col) ? centered : { vertical: 'top', wrapText: true };
      });
    });
    respWs.views = [{ state: 'frozen', xSplit: 4, ySplit: 1 }];

    // ---------- 2. ONE SUMMARY SHEET PER QUESTION ----------
    const writeTitle = (ws, q, span) => {
      const title = ws.addRow([cleanLabel(q.label)]);
      ws.mergeCells(title.number, 1, title.number, span);
      title.getCell(1).font = { name: 'Arial', size: 12, bold: true };
      title.getCell(1).alignment = { wrapText: true, vertical: 'middle' };
      title.height = 34;
      const noteText = cleanLabel(q.note);
      if (noteText) {
        const r = ws.addRow([noteText]);
        ws.mergeCells(r.number, 1, r.number, span);
        r.getCell(1).font = { name: 'Arial', italic: true };
        r.getCell(1).alignment = { wrapText: true };
      }
      ws.addRow([]);
    };

    const bold = (row) => (row.getCell(1).font = { name: 'Arial', bold: true });

    reportQsSheets.forEach((q) => {
      const baseName = `${q.key} ${cleanLabel(q.label).replace(/^\d+\.\s*/, '')}`;
      const ws = workbook.addWorksheet(uniqueName(baseName));
      const raws = data.map((item) => item?.itemNums?.[itemKey(q)]);

      // ----- radio / select / checkbox -----
      if (['radio', 'select', 'checkbox'].includes(q.type)) {
        const counts = q.options.map(() => 0);
        const others = [];
        let responded = 0;

        raws.forEach((raw, idx) => {
          const tokens = parseTokens(raw);
          const chosen = (q.type === 'checkbox' ? tokens : tokens.slice(0, 1)).filter(
            (t) => t && t.num >= 1 && t.num <= q.options.length
          );
          if (chosen.length === 0) return;
          responded++;
          chosen.forEach((t) => {
            counts[t.num - 1]++;
            if (t.text) others.push([t.text, idx + 1]);
          });
        });

        ws.getColumn(1).width = 60;
        ws.getColumn(2).width = 14;
        ws.getColumn(3).width = 14;
        writeTitle(ws, q, 3);
        styleHeaderRow(
          ws.addRow([
            textObject?.option || 'Option',
            textObject?.count || 'Count',
            textObject?.percent || 'Percent',
          ])
        );

        q.options.forEach((opt, i) => {
          const row = ws.addRow([
            cleanLabel(opt),
            counts[i],
            responded ? counts[i] / responded : 0,
          ]);
          row.getCell(3).numFmt = PCT;
          row.getCell(2).alignment = centered;
          row.getCell(3).alignment = centered;
        });

        ws.addRow([]);
        [
          [textObject?.responded || 'Responded', responded],
          [textObject?.noResponse || 'No response', data.length - responded],
          [textObject?.totalParticipants || 'Total participants', data.length],
        ].forEach(([label, n]) => {
          const row = ws.addRow([label, n]);
          row.getCell(2).alignment = centered;
        });

        if (others.length > 0) {
          ws.addRow([]);
          bold(ws.addRow([textObject?.textOther || 'Text entered with "Other" options']));
          styleHeaderRow(
            ws.addRow([textObject?.text || 'Text', textObject?.participantNum || 'Participant #'])
          );
          others.forEach(([text, num]) => {
            const row = ws.addRow([text, num]);
            row.getCell(1).alignment = { wrapText: true, vertical: 'top' };
            row.getCell(2).alignment = centered;
          });
        }
        return;
      }

      // ----- rating2 / rating7 / rating10 ... -----
      if (isRating(q.type)) {
        const K = Number(q.type.replace('rating', ''));
        const parsed = raws.map(parseTokens);

        const stats = q.options.map((_, i) => {
          const counts = Array(K).fill(0);
          let noResp = 0;
          parsed.forEach((tokens) => {
            const t = tokens[i];
            if (t && t.num >= 1 && t.num <= K) counts[t.num - 1]++;
            else noResp++;
          });
          const n = counts.reduce((a, b) => a + b, 0);
          const sum = counts.reduce((a, c, idx) => a + c * (idx + 1), 0);
          return { counts, noResp, n, mean: n ? sum / n : '' };
        });

        const scale = Array.from({ length: K }, (_, i) => i + 1);
        const span = 3 + K + 1;
        ws.getColumn(1).width = 60;
        for (let c = 2; c <= span; c++) ws.getColumn(c).width = 11;
        writeTitle(ws, q, span);

        // Counts table
        bold(ws.addRow([textObject?.counts || 'Counts']));
        styleHeaderRow(
          ws.addRow([
            textObject?.statement || 'Statement',
            textObject?.n || 'n',
            textObject?.mean || 'Mean',
            ...scale,
            textObject?.noResponse || 'No response',
          ])
        );
        q.options.forEach((opt, i) => {
          const s = stats[i];
          const row = ws.addRow([cleanLabel(opt), s.n, s.mean, ...s.counts, s.noResp]);
          row.getCell(1).alignment = { wrapText: true, vertical: 'middle' };
          row.getCell(3).numFmt = '0.00';
          for (let c = 2; c <= span; c++) row.getCell(c).alignment = centered;
        });

        // Percent table (of those who answered that statement)
        ws.addRow([]);
        bold(ws.addRow([textObject?.percentRespondents || 'Percent (of those who answered)']));
        styleHeaderRow(
          ws.addRow([
            textObject?.statement || 'Statement',
            textObject?.n || 'n',
            textObject?.mean || 'Mean',
            ...scale,
          ])
        );
        q.options.forEach((opt, i) => {
          const s = stats[i];
          const row = ws.addRow([
            cleanLabel(opt),
            s.n,
            s.mean,
            ...s.counts.map((c) => (s.n ? c / s.n : 0)),
          ]);
          row.getCell(1).alignment = { wrapText: true, vertical: 'middle' };
          row.getCell(3).numFmt = '0.00';
          for (let c = 2; c <= 3 + K; c++) row.getCell(c).alignment = centered;
          for (let c = 4; c <= 3 + K; c++) row.getCell(c).numFmt = PCT;
        });
      }
    });
  }

  addSurveySheets({
    workbook,
    data,
    questions: dataContent?.surveyQuestions || [],
    headerStyle,
    textObject,
  });

  // ===== SAVE FILE =====
  const timeStamp = `${currentDate1()}_${currentTime1()}`;

  let nameFile = `KADE_Quince_OtherData_Exported_${timeStamp}.xlsx`;

  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath: nameFile,
  });

  if (!canceled && filePath) {
    try {
      await workbook.xlsx.writeFile(filePath);
      dialog.showMessageBoxSync({
        title: textObject?.quinceFileSaved || 'File Saved',
        type: 'info',
        message: textObject?.fileSavedTo || 'File saved to:',
        detail: `${filePath}`,
        buttons: ['OK'],
      });
    } catch (err) {
      console.error('Error saving file:', err);
    }
  }
};
export default createQuinceExportExcelFile;
