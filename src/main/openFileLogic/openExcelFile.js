import { BrowserWindow, dialog } from 'electron';
import ExcelJS from 'exceljs';

const cellToValue = (value) => {
  if (value === null || value === undefined) return null;
  if (typeof value === 'object' && !(value instanceof Date)) {
    if ('result' in value) return cellToValue(value.result);
    if ('richText' in value) return value.richText.map((r) => r.text).join('');
    if ('text' in value) return value.text;
    if ('error' in value) return value.error;
  }
  return value;
};

async function openExcelFile() {
  const options = {
    properties: ['openFile'],
    title: 'Open Excel File',
    filters: [{ name: 'Excel', extensions: ['xlsx'] }],
  };

  const window = BrowserWindow.getFocusedWindow();

  try {
    const result = await dialog.showOpenDialog(window, options);
    if (result.canceled || !result.filePaths?.length) return null;

    const reader = new ExcelJS.stream.xlsx.WorkbookReader(result.filePaths[0], {
      worksheets: 'emit',
      sharedStrings: 'cache', // needed so string cells resolve to text
      hyperlinks: 'ignore',
      styles: 'ignore',
      entries: 'emit',
    });

    const sheetNames = [];
    const sheets = {};

    for await (const ws of reader) {
      const rows = [];
      let maxCols = 0;

      for await (const row of ws) {
        // row.values is 1-indexed (index 0 is empty), so slice(1)
        const values = row.values.slice(1).map(cellToValue);
        if (values.length > maxCols) maxCols = values.length;

        // Streaming skips empty rows, so pad to preserve row positions
        while (rows.length < row.number - 1) rows.push([]);
        rows.push(values);
      }

      // Pad every row to the same width
      for (const r of rows) {
        while (r.length < maxCols) r.push(null);
      }

      sheetNames.push(ws.name);
      sheets[ws.name] = rows;
    }

    return { sheetNames, sheets };
  } catch (err) {
    console.error('Error opening file:', err);
    throw err;
  }
}

export default openExcelFile;
