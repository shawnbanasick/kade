const csvCell = (v) => {
  if (v === null || v === undefined) return '';
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
  const s = v instanceof Date ? v.toISOString() : String(v);
  // quote like SheetJS does when the value contains a comma, quote or newline
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

// Replacement for XLSX.utils.sheet_to_csv
export const sheetToCsv = (rows) => rows.map((r) => r.map(csvCell).join(',')).join('\n');

// Replacement for XLSX.utils.sheet_to_json (first row = headers)
export const sheetToJson = (rows) => {
  if (!rows.length) return [];

  const seen = {};
  const headers = rows[0].map((h) => {
    const base = h === null || h === undefined || h === '' ? '__EMPTY' : String(h);
    const n = seen[base] || 0;
    seen[base] = n + 1;
    return n === 0 ? base : `${base}_${n}`; // duplicates become Name_1, Name_2 like SheetJS
  });

  return rows
    .slice(1)
    .filter((r) => r.some((v) => v !== null && v !== undefined)) // skip blank rows
    .map((r) => {
      const obj = {};
      r.forEach((v, i) => {
        if (v !== null && v !== undefined && headers[i] !== undefined) obj[headers[i]] = v;
      });
      return obj;
    });
};
