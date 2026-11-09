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

const createResultsExcelSheets9 = async (workbook, facDistArray, factorName, textObject) => {
  factorName = factorName.replace(/./, (x) => x.toUpperCase());
  /**
   **
   ** DISTINGUISHING SHEETS
   **
   */
  const factorDistWorksheet = workbook.addWorksheet(
    `${factorName} ${textObject?.distinguishing || 'Distinguishing'}`
  );
  factorDistWorksheet.columns = [
    { width: 10 },
    { width: 75 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
  ];
  factorDistWorksheet.views = [{ state: 'frozen', ySplit: 8 }];

  const headerCell1 = factorDistWorksheet.getCell('A1');
  headerCell1.value = `${facDistArray[2][0]}`;
  headerCell1.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell1.alignment = { horizontal: 'left' };
  headerCell1.fill = blueFill;
  headerCell1.border = thinBorder;
  const headerCellB2 = factorDistWorksheet.getCell('B1');
  headerCellB2.fill = blueFill;
  headerCellB2.border = thinBorder;
  const headerCellC2 = factorDistWorksheet.getCell('C1');
  headerCellC2.fill = blueFill;
  headerCellC2.border = thinBorder;

  const headerCell2 = factorDistWorksheet.getCell('A3');
  headerCell2.value = `${facDistArray[4][0]}`;
  headerCell2.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell2.alignment = { horizontal: 'left' };

  const headerCell3 = factorDistWorksheet.getCell('A5');
  headerCell3.value = `${facDistArray[6][0]}`;
  headerCell3.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell3.alignment = { horizontal: 'left' };

  factorDistWorksheet.addRow();

  for (let i = 9; i < facDistArray?.length; i++) {
    const row = factorDistWorksheet.addRow();
    let partCol = row.getCell(1);
    partCol.alignment = { horizontal: 'center' };
    partCol.value = facDistArray?.[i]?.[0];
    if (i === 9 || i === 10) {
      partCol.font = { bold: true };
      partCol.alignment = { horizontal: 'center' };
      partCol.fill = blueFill;
      partCol.border = thinBorder;
    }
    // iterate through q sort values and add them to the row
    for (let j = 1; j < facDistArray?.[i]?.length; j++) {
      let qSortVal = row.getCell(1 + j);
      qSortVal.value = facDistArray?.[i]?.[j];
      qSortVal.font = { bold: false };
      qSortVal.alignment = { horizontal: 'center' };
      if (j === 1) {
        qSortVal.alignment = { horizontal: 'left' };
      }
      if (i === 9 || i === 10) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
        qSortVal.fill = blueFill;
        qSortVal.border = thinBorder;
      }
    }
  }

  return workbook;
};

export default createResultsExcelSheets9;
