import { dialog } from 'electron';
import ExcelJS from 'exceljs';
import currentDate1 from '../../renderer/src/Utils/currentDate1';
import currentTime1 from '../../renderer/src/Utils/currentTime1';

const createDistExcelFile = async (dataContent) => {
  var datenum = function (v, date1904) {
    if (date1904) {
      v += 1462;
    }
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
  };

  const projectName = dataContent.projectName;

  const workbook = new ExcelJS.Workbook();

  const stephensonWorksheet = workbook.addWorksheet('Distinguishing - Stephenson');
  stephensonWorksheet.columns = [
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 130 },
  ];
  stephensonWorksheet.getRow(1).font = { bold: true };
  stephensonWorksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
  stephensonWorksheet.getColumn(1).alignment = { vertical: 'middle', horizontal: 'center' };
  stephensonWorksheet.getColumn(2).alignment = { vertical: 'middle', horizontal: 'center' };
  stephensonWorksheet.getColumn(3).alignment = { vertical: 'middle', horizontal: 'center' };
  stephensonWorksheet.getColumn(4).alignment = { vertical: 'middle', horizontal: 'center' };

  dataContent.distStephensonData.forEach((item, index) => {
    const factorRow = stephensonWorksheet.addRow([`${item.factor}`]);
    factorRow.font = { bold: true };
    factorRow.font.size = 14;

    item.distStates.sort((a, b) => {
      if (a.sigLevelRank === b.sigLevelRank) {
        return b.zScore - a.zScore;
      }
      return b.sigLevelRank - a.sigLevelRank;
    });

    const headerRow = stephensonWorksheet.addRow([
      `Factor ${index + 1} Significance Level`,
      `Factor ${index + 1} Z Score`,
      `Factor ${index + 1} Q Sort Value`,
      `Statement No.`,
      `Statement`,
    ]);
    headerRow.font = { bold: true };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
    item.distStates.forEach((state) => {
      stephensonWorksheet.addRow([
        state.sigLevelText,
        state.zScore,
        state.sortValue,
        state.statement,
        state.sortStatement,
      ]);
    });
    stephensonWorksheet.addRow([]);
  });

  const worksheet = workbook.addWorksheet("Distinguishing - Cohen's d");
  worksheet.columns = [{ width: 30 }, { width: 30 }, { width: 30 }, { width: 130 }];
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.getColumn(1).alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.getColumn(2).alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.getColumn(3).alignment = { vertical: 'middle', horizontal: 'center' };

  dataContent.distCohenData.forEach((item, index) => {
    const factorRow = worksheet.addRow([`Factor ${item.factor}`]);
    factorRow.font = { bold: true };
    factorRow.font.size = 14;

    const headerRow = worksheet.addRow([
      `Factor ${index + 1} Q Sort Value`,
      `Factor ${index + 1} Cohens Value`,
      `Statement No.`,
      `Statement`,
    ]);
    headerRow.font = { bold: true };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    item.distStates.forEach((state) => {
      worksheet.addRow([
        state[`F${index + 1} Sort Value`],
        state[`factor${index + 1}CohenLevel`],
        state.statement,
        state.sortStatement,
      ]);
    });
    worksheet.addRow([]);
  });

  const timeStamp = `${currentDate1()}_${currentTime1()}`;

  let nameFile = `KADE_Distinguishing_Statements_${projectName}_${timeStamp}.xlsx`;

  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath: nameFile,
  });

  if (!canceled && filePath) {
    try {
      await workbook.xlsx.writeFile(filePath);
      dialog.showMessageBoxSync({
        title: 'KADE',
        type: 'info',
        message: `File saved to:`,
        detail: `${filePath}`,
        buttons: ['OK'],
      });
    } catch (err) {
      console.error('Error saving file:', err);
    }
  }
};

export default createDistExcelFile;
