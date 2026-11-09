import ExcelJS from 'exceljs';

const createResultsExcelSheets2 = async (workbook, statementsArray, sortsArray, textObject) => {
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

  /**
   **
   ** STATEMENTS SHEET
   **
   */
  const statementsWorksheet = workbook.addWorksheet(textObject?.statements || 'Statements');
  statementsWorksheet.columns = [{ width: 25 }, { width: 170 }];
  statementsWorksheet.views = [{ state: 'frozen', ySplit: 1 }];

  for (let i = 2; i < statementsArray.length; i++) {
    const row = statementsWorksheet.addRow(statementsArray[i]);
    // let spacerCol = row.getCell(1);
    // spacerCol.value = '';
    let numCol = row.getCell(1);
    numCol.alignment = { horizontal: 'center' };
    numCol.value = statementsArray?.[i]?.[0];
    if (i === 2) {
      numCol.border = thinBorder;
      numCol.fill = blueFill;
      numCol.font = { bold: true };
    }
    let statementCol = row.getCell(2);
    statementCol.alignment = { horizontal: 'left' };
    statementCol.value = statementsArray?.[i]?.[1];
    if (i === 2) {
      statementCol.border = thinBorder;
      statementCol.fill = blueFill;
      statementCol.font = { bold: true };
    }
  }

  /**
   ** 2. SORTS worksheet
   */
  const sortsWorksheet = workbook.addWorksheet(textObject?.qSorts || 'Sorts');
  sortsWorksheet.columns = [{ width: 20 }];
  sortsWorksheet.views = [{ state: 'frozen', xSplit: 1, ySplit: 1 }];

  for (let i = 4; i < sortsArray.length; i++) {
    const row = sortsWorksheet.addRow(sortsArray[i]);
    // let spacerCol = row.getCell(1);
    // spacerCol.value = '';
    // participant names
    let partCol = row.getCell(1);
    partCol.alignment = { horizontal: 'center' };
    partCol.value = sortsArray?.[i]?.[0];
    partCol.font = { bold: true };
    if (i === 4) {
      partCol.fill = blueFill;
      partCol.border = thinBorder;
    }
    // iterate through q sort values and add them to the row
    for (let j = 1; j < sortsArray?.[i].length; j++) {
      let qSortVal = row.getCell(1 + j);
      if (i === 4) {
        qSortVal.fill = blueFill;
        qSortVal.border = thinBorder;
      }
      qSortVal.value = sortsArray?.[i]?.[j];
    }
  }

  return workbook;
};

export default createResultsExcelSheets2;
