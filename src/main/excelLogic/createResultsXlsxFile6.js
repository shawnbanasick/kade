import ExcelJS from 'exceljs';
const blueFill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'd1e5f2' },
};

const thinBorder = {
  top: { style: 'thin', color: { argb: '000000' } },
  left: { style: 'thin', color: { argb: '000000' } },
  bottom: { style: 'thin', color: { argb: '000000' } },
  right: { style: 'thin', color: { argb: '000000' } },
};

const createResultsExcelSheets6 = async (workbook, data, factorName, textObject) => {
  factorName = factorName.replace(/./, (x) => x.toUpperCase());

  /**
   **
   ** FACTOR WEIGHTS SHEET
   **
   */
  const factorWeightsTabName = (
    `${factorName} - ${textObject?.weights}` || `${factorName} -'Weights'`
  ).slice(0, 31);
  const factorWeightsWorksheet = workbook.addWorksheet(factorWeightsTabName);

  factorWeightsWorksheet.columns = [{ width: 10 }, { width: 10 }, { width: 20 }, { width: 20 }];

  const headerCell1 = factorWeightsWorksheet.getCell('A1');
  headerCell1.value = factorWeightsTabName;
  headerCell1.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell1.alignment = { horizontal: 'left' };
  headerCell1.fill = blueFill;
  headerCell1.border = thinBorder;
  const headerCellB2 = factorWeightsWorksheet.getCell('B1');
  headerCellB2.fill = blueFill;
  headerCellB2.border = thinBorder;
  factorWeightsWorksheet.getCell('C1').fill = blueFill;
  factorWeightsWorksheet.getCell('C1').border = thinBorder;

  factorWeightsWorksheet.addRow();

  for (let i = 4; i < data?.[0]?.length; i++) {
    const row = factorWeightsWorksheet.addRow(data[0][i]);
    let partCol = row.getCell(1);
    partCol.alignment = { horizontal: 'center' };
    partCol.value = data?.[0]?.[i]?.[0];
    partCol.font = { bold: false };
    partCol.fill = blueFill;
    partCol.border = thinBorder;
    if (i === 4) {
      partCol.font = { bold: true };
      partCol.alignment = { horizontal: 'left' };
    }
    // iterate through q sort values and add them to the row
    for (let j = 1; j < data?.[0]?.[i]?.length; j++) {
      let qSortVal = row.getCell(1 + j);
      qSortVal.value = data?.[0]?.[i]?.[j];
      qSortVal.alignment = { horizontal: 'center' };
      if (i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
        qSortVal.fill = blueFill;
        qSortVal.border = thinBorder;
      }
    }
    const headerCellFacScore = factorWeightsWorksheet.getCell('A1');
    headerCellFacScore.fill = blueFill;
    headerCellFacScore.border = thinBorder;
  }

  /**
   **
   ** FACTOR CORRELATIONS SHEET
   **
   */
  const factorCorrsTabName = `${factorName}- ${textObject?.correlations || 'Correlations'}`.slice(
    0,
    31
  );
  const factorCorrsWorksheet = workbook.addWorksheet(factorCorrsTabName);
  // factorCorrsWorksheet.columns = [{ width: 10 }, { width: 20 }];

  factorCorrsWorksheet.getCell('A1').value = factorCorrsTabName;
  factorCorrsWorksheet.getCell('A1').font = {
    name: 'Arial',
    size: 14,
    bold: true,
    color: { argb: '0000000' },
  };
  factorCorrsWorksheet.getCell('A1').alignment = { horizontal: 'left' };
  factorCorrsWorksheet.getCell('A1').fill = blueFill;
  factorCorrsWorksheet.getCell('A1').border = thinBorder;
  factorCorrsWorksheet.getCell('B1').fill = blueFill;
  factorCorrsWorksheet.getCell('B1').border = thinBorder;
  factorCorrsWorksheet.getCell('C1').fill = blueFill;
  factorCorrsWorksheet.getCell('C1').border = thinBorder;
  factorCorrsWorksheet.getCell('D1').fill = blueFill;
  factorCorrsWorksheet.getCell('D1').border = thinBorder;

  factorCorrsWorksheet.addRow();

  for (let i = 4; i < data?.[1]?.length; i++) {
    const row = factorCorrsWorksheet.addRow(data[1][i]);
    let partCol = row.getCell(1);
    partCol.alignment = { horizontal: 'center' };
    partCol.value = data?.[1]?.[i]?.[0];
    partCol.font = { bold: true };
    partCol.fill = blueFill;
    partCol.border = thinBorder;
    // iterate through q sort values and add them to the row
    for (let j = 1; j < data?.[1]?.[i]?.length; j++) {
      let qSortVal = row.getCell(1 + j);
      qSortVal.value = data?.[1]?.[i]?.[j];

      if (i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
        qSortVal.fill = blueFill;
        qSortVal.border = thinBorder;
      }
    }
  }
  /**
   **
   ** FACTOR SHEET
   **
   */
  // const factorWorksheet = workbook.addWorksheet(`${data[2][2][0]} (${data[2][2][1]})`);
  const factorWorksheet = workbook.addWorksheet(`${factorName}`);
  factorWorksheet.columns = [{ width: 10 }, { width: 70 }, { width: 12 }, { width: 20 }];
  factorWorksheet.views = [{ state: 'frozen', ySplit: 3 }];

  const factorHeaderCell1 = factorWorksheet.getCell('A1');
  factorHeaderCell1.value = factorName;
  factorHeaderCell1.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  factorHeaderCell1.alignment = { horizontal: 'left' };
  factorHeaderCell1.fill = blueFill;
  factorHeaderCell1.border = thinBorder;
  const factorHeaderCellB2 = factorWorksheet.getCell('B1');
  factorHeaderCellB2.fill = blueFill;
  factorHeaderCellB2.border = thinBorder;

  factorWorksheet.addRow();

  for (let i = 4; i < data?.[2]?.length; i++) {
    const row = factorWorksheet.addRow(data[2][i]);
    let partCol = row.getCell(1);
    partCol.alignment = { horizontal: 'center', wrapText: true };
    partCol.value = data?.[2]?.[i]?.[0];
    if (i === 4) {
      partCol.font = { bold: true };
      partCol.fill = blueFill;
      partCol.border = thinBorder;
    }
    // iterate through q sort values and add them to the row
    for (let j = 1; j < data?.[2]?.[i]?.length; j++) {
      let qSortVal = row.getCell(1 + j);
      qSortVal.value = data?.[2]?.[i]?.[j];
      if (i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center', wrapText: true };
        qSortVal.fill = blueFill;
        qSortVal.border = thinBorder;
      }
      if (j === 3) {
        qSortVal.alignment = { horizontal: 'center' };
      }
    }
  }

  return workbook;
};

export default createResultsExcelSheets6;
