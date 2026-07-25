import ExcelJS from 'exceljs';

const createResultsExcelSheets8 = async (
  workbook,
  conDisDataArray,
  factorCharDataArray,
  stdErrDataArray
) => {
  // 7. Factor Loadings Table worksheet
  const conDistWorksheet = workbook.addWorksheet(conDisDataArray[0][0]);
  conDistWorksheet.columns = [
    { width: 10 },
    { width: 10 },
    { width: 70 },
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

  for (let i = 4; i < conDisDataArray.length; i++) {
    const row = conDistWorksheet.addRow(conDisDataArray[i]);
    let spacerCol = row.getCell(1);
    spacerCol.value = '';
    // participant names
    let partCol = row.getCell(2);
    partCol.alignment = { horizontal: 'center', textWrap: true };
    partCol.value = conDisDataArray?.[i]?.[0];
    // iterate through q sort values and add them to the row
    for (let j = 1; j < conDisDataArray?.[i].length; j++) {
      let qSortVal = row.getCell(2 + j);
      qSortVal.value = conDisDataArray?.[i]?.[j];
      if (i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
      }
    }
  }

  // 8. Free distribution worksheet
  const factorCharWorksheet = workbook.addWorksheet(factorCharDataArray[0][0]);
  factorCharDataArray[0][0] = 'Free Distribution';
  factorCharWorksheet.columns = [
    { width: 10 },
    { width: 40 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
  ];

  for (let i = 4; i < factorCharDataArray.length; i++) {
    const row = factorCharWorksheet.addRow(factorCharDataArray[i]);
    let spacerCol = row.getCell(1);
    spacerCol.value = '';
    // number column
    let numCol = row.getCell(2);
    numCol.alignment = { horizontal: 'center' };
    numCol.font = { bold: true };
    numCol.value = factorCharDataArray?.[i]?.[0];
    // iterate through name and factors and add them to the row
    for (let j = 1; j < factorCharDataArray?.[i].length; j++) {
      let qSortVal = row.getCell(2 + j);
      qSortVal.value = factorCharDataArray?.[i]?.[j];
      if (i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
      }
    }
  }

  // 9. Factor Scores worksheet
  const standardErrorsWorksheet = workbook.addWorksheet(stdErrDataArray[0][0]);
  standardErrorsWorksheet.columns = [
    { width: 10 },
    { width: 20 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
  ];

  for (let i = 4; i < stdErrDataArray.length; i++) {
    const row = standardErrorsWorksheet.addRow(stdErrDataArray[i]);
    let spacerCol = row.getCell(1);
    spacerCol.value = '';
    // number column
    let numCol = row.getCell(2);
    numCol.alignment = { horizontal: 'center' };
    numCol.font = { bold: true };
    numCol.value = stdErrDataArray?.[i]?.[0];
    // iterate through name and factors and add them to the row
    for (let j = 1; j < stdErrDataArray?.[i].length; j++) {
      let qSortVal = row.getCell(2 + j);
      qSortVal.value = stdErrDataArray?.[i]?.[j];
      qSortVal.alignment = { horizontal: 'center' };
      if (i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
      }
    }
  }

  return workbook;
};

export default createResultsExcelSheets8;
