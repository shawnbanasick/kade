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
    const result = window
      ? await dialog.showOpenDialog(window, options)
      : await dialog.showOpenDialog(options);

    if (result.canceled || !result.filePaths?.length) return null;

    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(result.filePaths[0]);

    const sheetNames = [];
    const sheets = {};

    for (const ws of workbook.worksheets) {
      const rows = [];
      const maxCols = ws.columnCount;

      for (let i = 1; i <= ws.rowCount; i++) {
        const row = ws.getRow(i);
        const values = [];

        for (let j = 1; j <= maxCols; j++) {
          values.push(cellToValue(row.getCell(j).value));
        }

        rows.push(values);
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
