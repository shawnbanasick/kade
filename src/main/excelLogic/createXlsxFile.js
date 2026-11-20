import ExcelJS from 'exceljs';
import currentDate1 from '../../renderer/src/Utils/currentDate1';
import currentTime1 from '../../renderer/src/Utils/currentTime1';
import { dialog } from 'electron';

const createXlsxFile = async (dataObj) => {
  console.log('createXlsxFile dataObj:', dataObj);

  const { projectName } = dataObj;
  const data = [...dataObj.dataXlsx];
  const wsName = [...dataObj.sheetNamesXlsx];
  const wscols = [...dataObj.colSizes];

  const wb = new ExcelJS.Workbook();

  for (let i = 0; i < wsName.length; i += 1) {
    const ws = wb.addWorksheet(wsName[i]);

    // Rows: null cells stay empty, Dates are written as real Excel dates
    data[i].forEach((row) => {
      const newRow = ws.addRow(row.map((v) => (v === undefined ? null : v)));
      newRow.eachCell((cell) => {
        if (cell.value instanceof Date) {
          cell.numFmt = 'mm-dd-yy'; // same as SSF table[14]; change if you want e.g. 'dd/mm/yyyy'
        }
      });
    });

    // Column widths: XLSX's [{ wch: 20 }, ...] -> ExcelJS's width
    ws.columns.forEach((col, idx) => {
      const size = wscols[i]?.[idx];
      if (size?.wch) {
        col.width = size.wch;
      } else if (size?.wpx) {
        col.width = size.wpx / 7;
      }
    });
  }

  const timeStamp = `${currentDate1()}_${currentTime1()}`;
  const nameFile = `KADE_results_${projectName}_${timeStamp}.xlsx`;

  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath: nameFile,
  });

  if (!canceled && filePath) {
    try {
      await wb.xlsx.writeFile(filePath);
      dialog.showMessageBoxSync({
        title: 'KADE',
        type: 'info',
        message: 'File saved to:',
        detail: `${filePath}`,
        buttons: ['OK'],
      });
    } catch (err) {
      console.error('Error saving file:', err);
    }
  }
};

export default createXlsxFile;
