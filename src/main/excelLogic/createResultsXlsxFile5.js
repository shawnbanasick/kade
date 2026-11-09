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

const createResultsExcelSheets5 = async (workbook, factorScoreCorrelationsArray, textObject) => {
  /**
   **
   ** FACTOR SCORE CORRELATIONS SHEET
   **
   */
  const factorScoreCorrelationsTabName = (
    textObject?.factorScoreCorrelations || 'Factor Score Correlations'
  ).slice(0, 31);
  const factorScoreCorrelationsWorksheet = workbook.addWorksheet(factorScoreCorrelationsTabName);

  factorScoreCorrelationsWorksheet.getCell('A1').value = factorScoreCorrelationsTabName;
  factorScoreCorrelationsWorksheet.getCell('A1').font = {
    name: 'Arial',
    size: 14,
    bold: true,
    color: { argb: '0000000' },
  };
  factorScoreCorrelationsWorksheet.getCell('A1').alignment = { horizontal: 'left' };
  factorScoreCorrelationsWorksheet.getCell('A1').fill = blueFill;
  factorScoreCorrelationsWorksheet.getCell('A1').border = thinBorder;
  factorScoreCorrelationsWorksheet.getCell('B1').fill = blueFill;
  factorScoreCorrelationsWorksheet.getCell('B1').border = thinBorder;
  factorScoreCorrelationsWorksheet.getCell('C1').fill = blueFill;
  factorScoreCorrelationsWorksheet.getCell('C1').border = thinBorder;
  factorScoreCorrelationsWorksheet.getCell('D1').fill = blueFill;
  factorScoreCorrelationsWorksheet.getCell('D1').border = thinBorder;
  factorScoreCorrelationsWorksheet.getCell('E1').fill = blueFill;
  factorScoreCorrelationsWorksheet.getCell('E1').border = thinBorder;

  factorScoreCorrelationsWorksheet.addRow();

  for (let i = 4; i < factorScoreCorrelationsArray?.length; i++) {
    const row = factorScoreCorrelationsWorksheet.addRow(factorScoreCorrelationsArray[i]);
    let partCol = row.getCell(1);
    partCol.alignment = { horizontal: 'center' };
    partCol.value = factorScoreCorrelationsArray?.[i]?.[0];
    partCol.font = { bold: true };
    partCol.fill = blueFill;
    partCol.border = thinBorder;
    // iterate through q sort values and add them to the row
    for (let j = 1; j < factorScoreCorrelationsArray?.[i]?.length; j++) {
      let qSortVal = row.getCell(j + 1);
      // if (j === 1) {
      //   qSortVal.font = { bold: true };
      //   qSortVal.alignment = { horizontal: 'center' };
      //   qSortVal.fill = blueFill;
      //   qSortVal.border = thinBorder;
      // }
      qSortVal.value = factorScoreCorrelationsArray?.[i]?.[j];
      if (i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
        qSortVal.fill = blueFill;
        qSortVal.border = thinBorder;
      }
    }
  }

  return workbook;
};

export default createResultsExcelSheets5;
