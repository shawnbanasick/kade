import ExcelJS from 'exceljs';

const createResultsExcelSheets7 = async (workbook, powerSetDiffsArray) => {
  // 10. Factor Score Correlations worksheet
  let name = powerSetDiffsArray[0][1];
  name = name.replace(/\s+/g, '');
  name = name.replace('/', '-');

  const factorScoreCorrelationsWorksheet = workbook.addWorksheet(name);
  factorScoreCorrelationsWorksheet.columns = [
    { width: 10 },
    { width: 10 },
    { width: 70 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
  ];

  for (let i = 4; i < powerSetDiffsArray?.length; i++) {
    const row = factorScoreCorrelationsWorksheet.addRow(powerSetDiffsArray[i]);
    let spacerCol = row.getCell(1);
    spacerCol.value = '';
    // participant names
    let partCol = row.getCell(2);
    partCol.alignment = { horizontal: 'center', wrapText: true };
    partCol.value = powerSetDiffsArray?.[i]?.[0];
    partCol.font = { bold: false };
    if (i === 4) {
      partCol.font = { bold: true, wrapText: true };
    }
    // iterate through q sort values and add them to the row
    for (let j = 1; j < powerSetDiffsArray?.[i]?.length; j++) {
      let qSortVal = row.getCell(2 + j);
      qSortVal.value = powerSetDiffsArray?.[i]?.[j];
      if (i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center', wrapText: true };
      }
    }
  }

  return workbook;
};

export default createResultsExcelSheets7;
