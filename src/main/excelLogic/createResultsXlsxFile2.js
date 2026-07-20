import ExcelJS from 'exceljs';

const createResultsExcelSheets2 = async (workbook, statementsArray, sortsArray) => {
  // 1. STATEMENTS worksheet
  const statementsWorksheet = workbook.addWorksheet(statementsArray[0][0]);
  statementsWorksheet.columns = [{ width: 10 }, { width: 25 }, { width: 170 }];

  for (let i = 2; i < statementsArray.length; i++) {
    const row = statementsWorksheet.addRow(statementsArray[i]);
    let spacerCol = row.getCell(1);
    spacerCol.value = '';
    let numCol = row.getCell(2);
    numCol.alignment = { horizontal: 'center' };
    numCol.value = statementsArray?.[i]?.[0];
    if (i === 2) {
      numCol.font = { bold: true };
    }
    let statementCol = row.getCell(3);
    statementCol.alignment = { horizontal: 'left' };
    statementCol.value = statementsArray?.[i]?.[1];
    if (i === 2) {
      statementCol.font = { bold: true };
    }
  }

  // 2. SORTS worksheet
  const sortsWorksheet = workbook.addWorksheet(sortsArray[2][0]);
  sortsWorksheet.columns = [{ width: 10 }, { width: 20 }];

  for (let i = 4; i < sortsArray.length; i++) {
    const row = sortsWorksheet.addRow(sortsArray[i]);
    let spacerCol = row.getCell(1);
    spacerCol.value = '';
    // participant names
    let partCol = row.getCell(2);
    partCol.alignment = { horizontal: 'center' };
    partCol.value = sortsArray?.[i]?.[0];
    partCol.font = { bold: true };
    // iterate through q sort values and add them to the row
    for (let j = 1; j < sortsArray?.[i].length; j++) {
      let qSortVal = row.getCell(2 + j);
      qSortVal.value = sortsArray?.[i]?.[j];
    }
  }

  return workbook;
};

export default createResultsExcelSheets2;
