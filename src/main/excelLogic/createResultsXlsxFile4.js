import ExcelJS from 'exceljs';

const createResultsExcelSheets4 = async (
  workbook,
  loadingsTableArray,
  freeDistArray,
  ranksArray
) => {
  // 7. Factor Loadings Table worksheet
  const loadingsTableWorksheet = workbook.addWorksheet(loadingsTableArray[0][0]);
  loadingsTableWorksheet.columns = [{ width: 10 }, { width: 10 }, { width: 50 }];

  for (let i = 4; i < loadingsTableArray.length; i++) {
    const row = loadingsTableWorksheet.addRow(loadingsTableArray[i]);
    let spacerCol = row.getCell(1);
    spacerCol.value = '';
    // participant names
    let partCol = row.getCell(2);
    partCol.alignment = { horizontal: 'center' };
    partCol.value = loadingsTableArray?.[i]?.[0];
    // iterate through q sort values and add them to the row
    for (let j = 1; j < loadingsTableArray?.[i].length; j++) {
      let qSortVal = row.getCell(2 + j);
      qSortVal.value = loadingsTableArray?.[i]?.[j];
      if (j === 1 || i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
      }
    }
  }

  // 8. Free distribution worksheet
  const freeDistWorksheet = workbook.addWorksheet(freeDistArray[0][0]);
  freeDistArray[0][0] = 'Free Distribution';
  freeDistWorksheet.columns = [{ width: 10 }, { width: 10 }, { width: 50 }];

  for (let i = 4; i < freeDistArray.length; i++) {
    const row = freeDistWorksheet.addRow(freeDistArray[i]);
    let spacerCol = row.getCell(1);
    spacerCol.value = '';
    // number column
    let numCol = row.getCell(2);
    numCol.alignment = { horizontal: 'center' };
    numCol.value = freeDistArray?.[i]?.[0];
    // iterate through name and factors and add them to the row
    for (let j = 1; j < freeDistArray?.[i].length; j++) {
      let qSortVal = row.getCell(2 + j);
      qSortVal.value = freeDistArray?.[i]?.[j];
      if (j === 1 || i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
      }
    }
  }

  // 9. Factor Scores worksheet
  const factorScoresWorksheet = workbook.addWorksheet(ranksArray[0][0]);
  factorScoresWorksheet.columns = [{ width: 10 }, { width: 10 }, { width: 120 }];

  for (let i = 4; i < ranksArray.length; i++) {
    const row = factorScoresWorksheet.addRow(ranksArray[i]);
    let spacerCol = row.getCell(1);
    spacerCol.value = '';
    // number column
    let numCol = row.getCell(2);
    numCol.alignment = { horizontal: 'center' };
    numCol.value = ranksArray?.[i]?.[0];
    if (i === 4) {
      numCol.font = { bold: true };
    }
    // iterate through name and factors and add them to the row
    for (let j = 1; j < ranksArray?.[i].length; j++) {
      let qSortVal = row.getCell(2 + j);
      qSortVal.value = ranksArray?.[i]?.[j];
      if (j === 1) {
        qSortVal.alignment = { horizontal: 'left' };
      }
      if (i === 4 || i === 5) {
        qSortVal.font = { bold: true };
      }
    }
  }

  return workbook;
};

export default createResultsExcelSheets4;
