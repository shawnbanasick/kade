import { BrowserWindow, dialog } from 'electron';
import ExcelJS from 'exceljs';

// Normalize ExcelJS cell values (formulas, rich text, hyperlinks) to plain values
const cellToValue = (value) => {
  if (value === null || value === undefined) return null;
  if (typeof value === 'object' && !(value instanceof Date)) {
    if ('result' in value) return cellToValue(value.result); // formula
    if ('richText' in value) return value.richText.map((r) => r.text).join('');
    if ('text' in value) return value.text; // hyperlink
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

    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(result.filePaths[0]);

    const sheetNames = [];
    const sheets = {};

    wb.eachSheet((ws) => {
      const rows = [];
      ws.eachRow({ includeEmpty: true }, (row) => {
        const values = [];
        for (let c = 1; c <= ws.columnCount; c += 1) {
          values.push(cellToValue(row.getCell(c).value));
        }
        rows.push(values);
      });
      sheetNames.push(ws.name);
      sheets[ws.name] = rows;
    });

    return { sheetNames, sheets };
  } catch (err) {
    console.error('Error opening file:', err);
    throw err;
  }
}

export default openExcelFile;
