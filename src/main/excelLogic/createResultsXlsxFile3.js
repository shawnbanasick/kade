import ExcelJS from 'exceljs';

const createResultsExcelSheets3 = async (workbook, correlationMatrixArray, unrotatedArray) => {
  // 3. Correlation Matrix worksheet
  const correlationsWorksheet = workbook.addWorksheet(correlationMatrixArray[0][0]);
  correlationsWorksheet.columns = [{ width: 10 }, { width: 20 }];

  for (let i = 4; i < correlationMatrixArray.length; i++) {
    const row = correlationsWorksheet.addRow(correlationMatrixArray[i]);
    let spacerCol = row.getCell(1);
    spacerCol.value = '';
    // participant names
    let partCol = row.getCell(2);
    partCol.alignment = { horizontal: 'center' };
    partCol.value = correlationMatrixArray?.[i]?.[0];
    partCol.font = { bold: true };
    // iterate through q sort values and add them to the row
    for (let j = 1; j < correlationMatrixArray?.[i].length; j++) {
      let qSortVal = row.getCell(2 + j);
      qSortVal.value = correlationMatrixArray?.[i]?.[j];
    }
  }

  // 4. Unrotated worksheet
  const unrotatedWorksheet = workbook.addWorksheet(unrotatedArray[0][0]);
  unrotatedWorksheet.columns = [{ width: 10 }, { width: 10 }, { width: 50 }];

  for (let i = 4; i < unrotatedArray.length; i++) {
    const row = unrotatedWorksheet.addRow(unrotatedArray[i]);
    let spacerCol = row.getCell(1);
    spacerCol.value = '';
    // number column
    let numCol = row.getCell(2);
    numCol.alignment = { horizontal: 'center' };
    numCol.value = unrotatedArray?.[i]?.[0];
    // iterate through name and factors and add them to the row
    for (let j = 1; j < unrotatedArray?.[i].length; j++) {
      let qSortVal = row.getCell(2 + j);
      qSortVal.value = unrotatedArray?.[i]?.[j];
      if (j === 1 || i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
      }
    }
  }

  return workbook;
};

export default createResultsExcelSheets3;
