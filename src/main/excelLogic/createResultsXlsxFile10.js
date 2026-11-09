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

const createResultsExcelSheets10 = async (workbook, consensusArray, textObject) => {
  /**
   **
   ** CONSENSUS SHEET
   **
   */
  const consensusWorksheet = workbook.addWorksheet(`${textObject?.consensus || 'Consensus'}`);
  consensusWorksheet.columns = [
    { width: 10 },
    { width: 20 },
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
  ];
  consensusWorksheet.views = [{ state: 'frozen', ySplit: 7 }];

  const headerCell1 = consensusWorksheet.getCell('A1');
  headerCell1.value = `${consensusArray[2][0]}`;
  headerCell1.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell1.alignment = { horizontal: 'left' };
  headerCell1.fill = blueFill;
  headerCell1.border = thinBorder;
  const headerCellB2 = consensusWorksheet.getCell('B1');
  headerCellB2.fill = blueFill;
  headerCellB2.border = thinBorder;
  const headerCellC2 = consensusWorksheet.getCell('C1');
  headerCellC2.fill = blueFill;
  headerCellC2.border = thinBorder;

  const headerCell2 = consensusWorksheet.getCell('A3');
  headerCell2.value = `${consensusArray[3][0]}`;
  headerCell2.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell2.alignment = { horizontal: 'left' };

  const headerCell3 = consensusWorksheet.getCell('A5');
  headerCell3.value = `${consensusArray[5][0]}`;
  headerCell3.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell3.alignment = { horizontal: 'left' };

  const rowSpacer = consensusWorksheet.addRow();

  for (let i = 9; i < consensusArray?.length; i++) {
    const row = consensusWorksheet.addRow();
    let partCol = row.getCell(1);
    partCol.alignment = { horizontal: 'center' };
    partCol.value = consensusArray?.[i]?.[0];
    if (i === 9) {
      partCol.font = { bold: true };
      partCol.alignment = { horizontal: 'center' };
      partCol.fill = blueFill;
      partCol.border = thinBorder;
    }
    // iterate through q sort values and add them to the row
    for (let j = 1; j < consensusArray?.[i]?.length; j++) {
      let qSortVal = row.getCell(1 + j);
      qSortVal.value = consensusArray?.[i]?.[j];
      qSortVal.font = { bold: false };
      qSortVal.alignment = { horizontal: 'center' };
      if (j === 2) {
        qSortVal.alignment = { horizontal: 'left' };
      }
      if (i === 9) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
        qSortVal.fill = blueFill;
        qSortVal.border = thinBorder;
      }
    }
  }

  return workbook;
};

export default createResultsExcelSheets10;
