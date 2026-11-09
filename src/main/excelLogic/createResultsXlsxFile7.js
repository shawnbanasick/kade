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

const createResultsExcelSheets7 = async (workbook, powerSetDiffsArray) => {
  /**
   **
   ** POWER SET DIFFS SHEETS
   **
   */
  let name = powerSetDiffsArray[0][1];
  name = name.replace(/\s+/g, '');
  name = name.replace('/', '-');

  const factorScoreCorrelationsWorksheet = workbook.addWorksheet(name);
  factorScoreCorrelationsWorksheet.columns = [
    { width: 10 },
    { width: 70 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
  ];
  factorScoreCorrelationsWorksheet.views = [{ state: 'frozen', ySplit: 3, xSplit: 2 }];

  const headerCell1 = factorScoreCorrelationsWorksheet.getCell('A1');
  headerCell1.value = name;
  headerCell1.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell1.alignment = { horizontal: 'left' };
  headerCell1.fill = blueFill;
  headerCell1.border = thinBorder;
  const headerCellB2 = factorScoreCorrelationsWorksheet.getCell('B1');
  headerCellB2.fill = blueFill;
  headerCellB2.border = thinBorder;

  factorScoreCorrelationsWorksheet.addRow();

  for (let i = 4; i < powerSetDiffsArray?.length; i++) {
    const row = factorScoreCorrelationsWorksheet.addRow(powerSetDiffsArray[i]);
    let partCol = row.getCell(1);
    partCol.alignment = { horizontal: 'center', wrapText: true };
    partCol.value = powerSetDiffsArray?.[i]?.[0];
    partCol.font = { bold: false };
    if (i === 4) {
      partCol.font = { bold: true, wrapText: true };
      partCol.alignment = { horizontal: 'center', wrapText: true };
      partCol.fill = blueFill;
      partCol.border = thinBorder;
    }
    // iterate through q sort values and add them to the row
    for (let j = 1; j < powerSetDiffsArray?.[i]?.length; j++) {
      let qSortVal = row.getCell(1 + j);
      qSortVal.value = powerSetDiffsArray?.[i]?.[j];
      if (i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center', wrapText: true };
        qSortVal.fill = blueFill;
        qSortVal.border = thinBorder;
      }
    }
  }

  return workbook;
};

export default createResultsExcelSheets7;
