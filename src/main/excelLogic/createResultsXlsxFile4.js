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

const createResultsExcelSheets4 = async (
  workbook,
  loadingsTableArray,
  freeDistArray,
  ranksArray,
  textObject
) => {
  /**
   **
   ** FACTOR LOADINGS TABLE SHEET
   **
   */

  const tabNameLoadingsTable = (textObject?.factorLoadingsTable || 'Factor Loadings Table').slice(
    0,
    31
  );
  const loadingsTableWorksheet = workbook.addWorksheet(tabNameLoadingsTable);
  loadingsTableWorksheet.columns = [{ width: 10 }, { width: 50 }];
  loadingsTableWorksheet.views = [{ state: 'frozen', ySplit: 3, xSplit: 2 }];

  const headerCellLoadingsTable = loadingsTableWorksheet.getCell('A1');
  headerCellLoadingsTable.value = tabNameLoadingsTable;
  headerCellLoadingsTable.font = {
    name: 'Arial',
    size: 14,
    bold: true,
    color: { argb: '0000000' },
  };
  headerCellLoadingsTable.alignment = { horizontal: 'left' };
  headerCellLoadingsTable.fill = blueFill;
  headerCellLoadingsTable.border = thinBorder;
  const headerCellLoadingsTable2 = loadingsTableWorksheet.getCell('B1');
  headerCellLoadingsTable2.fill = blueFill;
  headerCellLoadingsTable2.border = thinBorder;
  loadingsTableWorksheet.addRow();

  for (let i = 4; i < loadingsTableArray.length; i++) {
    const row = loadingsTableWorksheet.addRow(loadingsTableArray[i]);
    let partCol = row.getCell(1);
    partCol.alignment = { horizontal: 'center' };
    partCol.value = loadingsTableArray?.[i]?.[0];
    // iterate through q sort values and add them to the row
    for (let j = 1; j < loadingsTableArray?.[i].length; j++) {
      let qSortVal = row.getCell(1 + j);
      qSortVal.value = loadingsTableArray?.[i]?.[j];
      if (j === 1 || i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
        qSortVal.fill = blueFill;
        qSortVal.border = thinBorder;
      }
    }
  }
  /**
   **
   ** FREE DISTRIBUTION SHEET
   **
   */
  const freeDistTabName = (textObject?.freeDistribution || 'Free Distribution').slice(0, 31);
  const freeDistWorksheet = workbook.addWorksheet(freeDistTabName);
  freeDistArray[0][0] = 'Free Distribution';
  freeDistWorksheet.columns = [{ width: 10 }, { width: 50 }];
  freeDistWorksheet.views = [{ state: 'frozen', ySplit: 3, xSplit: 2 }];
  freeDistWorksheet.addRow();

  freeDistWorksheet.getCell('A1').value = freeDistTabName;
  freeDistWorksheet.getCell('A1').font = {
    name: 'Arial',
    size: 14,
    bold: true,
    color: { argb: '0000000' },
  };
  freeDistWorksheet.getCell('A1').alignment = { horizontal: 'left' };
  freeDistWorksheet.getCell('A1').fill = blueFill;
  freeDistWorksheet.getCell('A1').border = thinBorder;
  freeDistWorksheet.getCell('B1').fill = blueFill;
  freeDistWorksheet.getCell('B1').border = thinBorder;
  freeDistWorksheet.addRow();

  for (let i = 4; i < freeDistArray.length; i++) {
    const row = freeDistWorksheet.addRow(freeDistArray[i]);
    // let spacerCol = row.getCell(1);
    // spacerCol.value = '';
    // // number column
    let numCol = row.getCell(1);
    numCol.alignment = { horizontal: 'center' };
    numCol.value = freeDistArray?.[i]?.[0];
    // iterate through name and factors and add them to the row
    for (let j = 1; j < freeDistArray?.[i].length; j++) {
      let qSortVal = row.getCell(1 + j);
      qSortVal.value = freeDistArray?.[i]?.[j];
      if (j === 1 || i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
        qSortVal.fill = blueFill;
        qSortVal.border = thinBorder;
      }
    }
  }

  /**
   **
   ** FACTOR STATEMENT RANKINGS
   **
   */
  const factorScoresTabName = (textObject?.statementRankings || 'Statement Rankings').slice(0, 31);
  const factorScoresWorksheet = workbook.addWorksheet(factorScoresTabName);
  factorScoresWorksheet.columns = [{ width: 15 }, { width: 120 }];
  factorScoresWorksheet.views = [{ state: 'frozen', ySplit: 4, xSplit: 2 }];

  factorScoresWorksheet.getCell('B1').value = factorScoresTabName;
  factorScoresWorksheet.getCell('B1').font = {
    name: 'Arial',
    size: 14,
    bold: true,
    color: { argb: '0000000' },
  };
  factorScoresWorksheet.getCell('B1').alignment = { horizontal: 'left' };
  factorScoresWorksheet.getCell('B1').fill = blueFill;
  factorScoresWorksheet.getCell('B1').border = thinBorder;
  factorScoresWorksheet.getCell('A1').fill = blueFill;
  factorScoresWorksheet.getCell('A1').border = thinBorder;
  factorScoresWorksheet.addRow();

  for (let i = 4; i < ranksArray.length; i++) {
    const row = factorScoresWorksheet.addRow(ranksArray[i]);
    let numCol = row.getCell(1);
    numCol.alignment = { horizontal: 'center' };
    numCol.value = ranksArray?.[i]?.[0];
    if (i === 4 || i === 5) {
      numCol.font = { bold: true };
      numCol.alignment = { horizontal: 'left' };
      numCol.fill = blueFill;
      numCol.border = thinBorder;
    }
    // iterate through name and factors and add them to the row
    for (let j = 2; j < ranksArray?.[i].length; j++) {
      let qSortVal = row.getCell(j + 1);
      qSortVal.value = ranksArray?.[i]?.[j];

      if (j === 2) {
        qSortVal.alignment = { horizontal: 'left' };
      }

      // if ((j === 2 && i === 4) || (j === 2 && i === 5)) {
      //   qSortVal.font = { bold: true };
      //   qSortVal.alignment = { horizontal: 'left' };
      //   qSortVal.fill = blueFill;
      //   qSortVal.border = thinBorder;
      // }

      if (i === 4 || i === 5) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
        qSortVal.fill = blueFill;
        qSortVal.border = thinBorder;
      }
    }
  }
  factorScoresWorksheet.getCell('B3').fill = blueFill;
  factorScoresWorksheet.getCell('B3').border = thinBorder;
  factorScoresWorksheet.getCell('B3').font = { bold: true };
  factorScoresWorksheet.getCell('B3').alignment = { horizontal: 'center' };
  factorScoresWorksheet.getCell('B4').fill = blueFill;
  factorScoresWorksheet.getCell('B4').border = thinBorder;

  return workbook;
};

export default createResultsExcelSheets4;
