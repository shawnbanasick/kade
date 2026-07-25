import ExcelJS from 'exceljs';

const createResultsExcelSheets9 = async (workbook, facDistArray, factorName) => {
  factorName = factorName.replace(/./, (x) => x.toUpperCase());

  // 10. Factor Distinguishing worksheet
  const factorDistWorksheet = workbook.addWorksheet(`${factorName} ${facDistArray[0][0]}`);
  factorDistWorksheet.columns = [
    { width: 10 },
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

  const headerCell1 = factorDistWorksheet.getCell('B2');
  headerCell1.value = `${facDistArray[2][0]}`;
  headerCell1.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell1.alignment = { horizontal: 'left' };

  const headerCell2 = factorDistWorksheet.getCell('B4');
  headerCell2.value = `${facDistArray[4][0]}`;
  headerCell2.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell2.alignment = { horizontal: 'left' };

  const headerCell3 = factorDistWorksheet.getCell('B6');
  headerCell3.value = `${facDistArray[6][0]}`;
  headerCell3.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell3.alignment = { horizontal: 'left' };

  const rowSpacer = factorDistWorksheet.addRow();

  for (let i = 9; i < facDistArray?.length; i++) {
    const row = factorDistWorksheet.addRow();
    let spacerCol = row.getCell(1);
    spacerCol.value = '';
    // participant names
    let partCol = row.getCell(2);
    partCol.alignment = { horizontal: 'center' };
    partCol.value = facDistArray?.[i]?.[0];
    if (i === 9 || i === 10) {
      partCol.font = { bold: true };
    }
    // iterate through q sort values and add them to the row
    for (let j = 1; j < facDistArray?.[i]?.length; j++) {
      let qSortVal = row.getCell(2 + j);
      qSortVal.value = facDistArray?.[i]?.[j];
      qSortVal.font = { bold: false };
      qSortVal.alignment = { horizontal: 'center' };
      if (j === 1) {
        qSortVal.alignment = { horizontal: 'left' };
      }
      if (i === 9 || i === 10) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
      }
    }
  }

  return workbook;
};

export default createResultsExcelSheets9;
