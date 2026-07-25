import ExcelJS from 'exceljs';

const createResultsExcelSheets10 = async (workbook, consensusArray) => {
  //   factorName = factorName.replace(/./, (x) => x.toUpperCase());

  // 10. Factor Distinguishing worksheet
  const consensusWorksheet = workbook.addWorksheet(`${consensusArray[0][0]}`);
  consensusWorksheet.columns = [
    { width: 10 },
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

  const headerCell1 = consensusWorksheet.getCell('B2');
  headerCell1.value = `${consensusArray[2][0]}`;
  headerCell1.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell1.alignment = { horizontal: 'left' };

  const headerCell2 = consensusWorksheet.getCell('B4');
  headerCell2.value = `${consensusArray[3][0]}`;
  headerCell2.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell2.alignment = { horizontal: 'left' };

  const headerCell3 = consensusWorksheet.getCell('B6');
  headerCell3.value = `${consensusArray[5][0]}`;
  headerCell3.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell3.alignment = { horizontal: 'left' };

  const rowSpacer = consensusWorksheet.addRow();

  for (let i = 9; i < consensusArray?.length; i++) {
    const row = consensusWorksheet.addRow();
    let spacerCol = row.getCell(1);
    spacerCol.value = '';
    // participant names
    let partCol = row.getCell(2);
    partCol.alignment = { horizontal: 'center' };
    partCol.value = consensusArray?.[i]?.[0];
    if (i === 9) {
      partCol.font = { bold: true };
    }
    // iterate through q sort values and add them to the row
    for (let j = 1; j < consensusArray?.[i]?.length; j++) {
      let qSortVal = row.getCell(2 + j);
      qSortVal.value = consensusArray?.[i]?.[j];
      qSortVal.font = { bold: false };
      qSortVal.alignment = { horizontal: 'center' };
      if (j === 2) {
        qSortVal.alignment = { horizontal: 'left' };
      }
      if (i === 9) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
      }
    }
  }

  return workbook;
};

export default createResultsExcelSheets10;
