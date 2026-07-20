import { dialog } from 'electron';
import currentDate1 from '../../renderer/src/Utils/currentDate1';
import currentTime1 from '../../renderer/src/Utils/currentTime1';
import ExcelJS from 'exceljs';
import createResultsXlsxFile2 from './createResultsXlsxFile2';
import createResultsXlsxFile3 from './createResultsXlsxFile3';
import createResultsXlsxFile4 from './createResultsXlsxFile4';
import createResultsXlsxFile5 from './createResultsXlsxFile5';

const createResultsExcelFile = async (dataContent) => {
  try {
    var datenum = function (v, date1904) {
      if (date1904) {
        v += 1462;
      }
      var epoch = Date.parse(v);
      return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
    };

    let workbook = new ExcelJS.Workbook();
    const data = [...dataContent.data];

    // console.log('data in createResultsExcelFile:', dataContent);
    const overviewText = data?.[0]?.[0]?.[0];
    const projectNameText = data?.[0]?.[2]?.[0];
    const projectNameValue = data?.[0]?.[2]?.[1];
    const statementsText = data?.[0]?.[4]?.[0];
    const statementsValue = data?.[0]?.[4]?.[1];
    const qSortDesignText = data?.[0]?.[6]?.[0];
    const qSortDesignValue = data?.[0]?.[6]?.[1];
    const totalQSortsText = data?.[0]?.[8]?.[0];
    const totalQSortsValue = data?.[0]?.[8]?.[1];
    const totalDistinguishingThresholdText = data?.[0]?.[11]?.[0];
    const totalDistinguishingThresholdValue = data?.[0]?.[11]?.[1];
    const totalDistinguishingThresholdText2 = data?.[0]?.[13]?.[0];
    const totalDistinguishingThresholdValue2 = data?.[0]?.[13]?.[1];
    const analysisCompleteText = data?.[0]?.[15]?.[0];
    const analysisCompleteValue = data?.[0]?.[15]?.[1];
    const autoflagText = data?.[0]?.[17]?.[0];
    const autoflagValue = data?.[0]?.[17]?.[1];
    const kadeVersionText = data?.[0]?.[19]?.[0];
    const kadeVersionValue = data?.[0]?.[19]?.[1];

    // 1. OVERVIEW worksheet
    const overviewWorksheet = workbook.addWorksheet(overviewText, {
      properties: { tabColor: { argb: 'FFC0000' } },
    });
    overviewWorksheet.columns = [{ width: 10 }, { width: 80 }, { width: 200 }];

    // project name
    const projectNameCell = overviewWorksheet.getCell('B1');
    projectNameCell.value = projectNameText;
    projectNameCell.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
    projectNameCell.alignment = { horizontal: 'left' };

    const projectNameCell2 = overviewWorksheet.getCell('C1');
    projectNameCell2.value = projectNameValue;
    projectNameCell2.font = { name: 'Arial', size: 14, bold: false, color: { argb: '000000' } };
    projectNameCell2.alignment = { horizontal: 'left' };

    // statements
    const statementsCell = overviewWorksheet.getCell('B3');
    statementsCell.value = statementsText;
    statementsCell.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
    statementsCell.alignment = { horizontal: 'left' };

    const statementsCell2 = overviewWorksheet.getCell('C3');
    statementsCell2.value = statementsValue;
    statementsCell2.font = { name: 'Arial', size: 14, bold: false, color: { argb: '000000' } };
    statementsCell2.alignment = { horizontal: 'left' };

    // q sort design
    const qSortDesignCell = overviewWorksheet.getCell('B3');
    qSortDesignCell.value = qSortDesignText;
    qSortDesignCell.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
    qSortDesignCell.alignment = { horizontal: 'left' };

    const qSortDesignCell2 = overviewWorksheet.getCell('C3');
    qSortDesignCell2.value = qSortDesignValue;
    qSortDesignCell2.font = { name: 'Arial', size: 14, bold: false, color: { argb: '000000' } };
    qSortDesignCell2.alignment = { horizontal: 'left' };

    // total q sorts
    const totalQSortsCell = overviewWorksheet.getCell('B5');
    totalQSortsCell.value = totalQSortsText;
    totalQSortsCell.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
    totalQSortsCell.alignment = { horizontal: 'left' };

    const totalQSortsCell2 = overviewWorksheet.getCell('C5');
    totalQSortsCell2.value = totalQSortsValue;
    totalQSortsCell2.font = { name: 'Arial', size: 14, bold: false, color: { argb: '000000' } };
    totalQSortsCell2.alignment = { horizontal: 'left' };

    // total distinguishing threshold
    const totalDistinguishingThresholdCell = overviewWorksheet.getCell('B7');
    totalDistinguishingThresholdCell.value = totalDistinguishingThresholdText;
    totalDistinguishingThresholdCell.font = {
      name: 'Arial',
      size: 14,
      bold: true,
      color: { argb: '0000000' },
    };
    totalDistinguishingThresholdCell.alignment = { horizontal: 'left' };

    const totalDistinguishingThresholdCell2 = overviewWorksheet.getCell('C7');
    totalDistinguishingThresholdCell2.value = totalDistinguishingThresholdValue;
    totalDistinguishingThresholdCell2.font = {
      name: 'Arial',
      size: 14,
      bold: false,
      color: { argb: '000000' },
    };
    totalDistinguishingThresholdCell2.alignment = { horizontal: 'left' };

    // total distinguishing threshold 2
    const totalDistinguishingThresholdCell3 = overviewWorksheet.getCell('B9');
    totalDistinguishingThresholdCell3.value = totalDistinguishingThresholdText2;
    totalDistinguishingThresholdCell3.font = {
      name: 'Arial',
      size: 14,
      bold: true,
      color: { argb: '0000000' },
    };
    totalDistinguishingThresholdCell3.alignment = { horizontal: 'left' };

    const totalDistinguishingThresholdCell4 = overviewWorksheet.getCell('C9');
    totalDistinguishingThresholdCell4.value = totalDistinguishingThresholdValue2;
    totalDistinguishingThresholdCell4.font = {
      name: 'Arial',
      size: 14,
      bold: false,
      color: { argb: '000000' },
    };
    totalDistinguishingThresholdCell4.alignment = { horizontal: 'left' };

    // analysis complete
    const analysisCompleteCell = overviewWorksheet.getCell('B11');
    analysisCompleteCell.value = analysisCompleteText;
    analysisCompleteCell.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
    analysisCompleteCell.alignment = { horizontal: 'left' };

    const analysisCompleteCell2 = overviewWorksheet.getCell('C11');
    analysisCompleteCell2.value = analysisCompleteValue;
    analysisCompleteCell2.font = {
      name: 'Arial',
      size: 14,
      bold: false,
      color: { argb: '000000' },
    };
    analysisCompleteCell2.alignment = { horizontal: 'left' };

    // autoflag
    const autoflagCell = overviewWorksheet.getCell('B13');
    autoflagCell.value = autoflagText;
    autoflagCell.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
    autoflagCell.alignment = { horizontal: 'left' };

    const autoflagCell2 = overviewWorksheet.getCell('C13');
    autoflagCell2.value = autoflagValue;
    autoflagCell2.font = { name: 'Arial', size: 14, bold: false, color: { argb: '000000' } };
    autoflagCell2.alignment = { horizontal: 'left' };

    // kade version
    const kadeVersionCell = overviewWorksheet.getCell('B15');
    kadeVersionCell.value = kadeVersionText;
    kadeVersionCell.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
    kadeVersionCell.alignment = { horizontal: 'left' };

    const kadeVersionCell2 = overviewWorksheet.getCell('C15');
    kadeVersionCell2.value = kadeVersionValue;
    kadeVersionCell2.font = { name: 'Arial', size: 14, bold: false, color: { argb: '000000' } };
    kadeVersionCell2.alignment = { horizontal: 'left' };

    // project log history
    const projectLogHistoryCell = overviewWorksheet.getCell('B17');
    projectLogHistoryCell.value = data?.[0]?.[21]?.[0];
    projectLogHistoryCell.font = {
      name: 'Arial',
      size: 14,
      bold: true,
      color: { argb: '0000000' },
    };
    projectLogHistoryCell.alignment = { horizontal: 'left' };

    const projectLogHistoryCell2 = overviewWorksheet.getCell('C17');
    projectLogHistoryCell2.value = data?.[0]?.[21]?.[1];
    projectLogHistoryCell2.font = {
      name: 'Arial',
      size: 14,
      bold: false,
      color: { argb: '000000' },
    };
    projectLogHistoryCell2.alignment = { horizontal: 'left' };

    // rest of the history
    for (let i = 22; i < data.length; i++) {
      const historyCell = overviewWorksheet.getCell(`C${17 + (i - 21)}`);
      historyCell.value = data?.[0]?.[i]?.[1];
      historyCell.font = { name: 'Arial', size: 14, bold: false, color: { argb: '000000' } };
      historyCell.alignment = { horizontal: 'left' };
    }

    // add Basic data sheets - statements and sorts,
    workbook = await createResultsXlsxFile2(workbook, data[1], data[2]);
    workbook = await createResultsXlsxFile3(workbook, data[3], data[4], data[5], data[6]);
    workbook = await createResultsXlsxFile4(workbook, data[7], data[8], data[9]);
    workbook = await createResultsXlsxFile5(workbook, data[10]);

    // File Download
    const timeStamp = `${currentDate1()}_${currentTime1()}`;

    let nameFile = `KADE_Results_${timeStamp}.xlsx`;

    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath: nameFile,
    });

    if (!canceled && filePath) {
      await workbook.xlsx.writeFile(filePath);
      dialog.showMessageBoxSync({
        title: 'KADE',
        type: 'info',
        message: `File saved to:`,
        detail: `${filePath}`,
        buttons: ['OK'],
      });
    }
  } catch (err) {
    console.error('Error saving file:', err);
  }
};
export default createResultsExcelFile;
