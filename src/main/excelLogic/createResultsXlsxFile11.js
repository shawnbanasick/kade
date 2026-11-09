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

const createResultsXlsxFile11 = async (workbook, relativeRanksData, factorName, textObject) => {
  factorName = factorName.replace(/./, (x) => x.toUpperCase());

  console.log('relativeRanksData:', relativeRanksData);

  const splitRelativeRanksData = relativeRanksData.reduce(
    (acc, row) => {
      const isEmpty = row.length === 2 && row[0] === '' && row[1] === '';
      if (isEmpty) {
        acc.push([]); // Start a new 2D array
      } else {
        acc[acc.length - 1].push(row); // Add to the current 2D array
      }
      return acc;
    },
    [[]]
  );

  /**
   **
   ** RELATIVE RANKS SHEETS
   **
   */
  const relRanksWorksheet = workbook.addWorksheet(
    `${factorName} ${textObject?.relativeRankings || 'Relative Rankings'}`
  );
  relRanksWorksheet.columns = [
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

  const headerCell1 = relRanksWorksheet.getCell('A1');
  headerCell1.value = `${splitRelativeRanksData[1][0][1]}`;
  headerCell1.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell1.alignment = { horizontal: 'left' };
  headerCell1.fill = blueFill;
  headerCell1.border = thinBorder;
  const headerCellB2 = relRanksWorksheet.getCell('B1');
  headerCellB2.fill = blueFill;
  headerCellB2.border = thinBorder;

  relRanksWorksheet.addRow();
  relRanksWorksheet.views = [{ state: 'frozen', ySplit: 1 }];

  for (let k = 2; k < splitRelativeRanksData?.length; k++) {
    for (let i = 0; i < splitRelativeRanksData?.[k]?.length; i++) {
      const row = relRanksWorksheet.addRow();
      // participant names
      let partCol = row.getCell(1);
      partCol.alignment = { horizontal: 'center' };
      partCol.value = splitRelativeRanksData?.[k]?.[i]?.[0];
      if (i === 0 || i === 1) {
        partCol.font = { bold: true };
        partCol.fill = blueFill;
        partCol.border = thinBorder;
      }
      // iterate through q sort values and add them to the row
      for (let j = 1; j < splitRelativeRanksData?.[k]?.[i]?.length; j++) {
        let qSortVal = row.getCell(1 + j);
        qSortVal.value = splitRelativeRanksData?.[k]?.[i]?.[j];
        qSortVal.font = { bold: false };
        if (j === 1) {
          qSortVal.alignment = { horizontal: 'left' };
        } else {
          qSortVal.alignment = { horizontal: 'center' };
        }
        if (i === 0 || i === 1) {
          qSortVal.alignment = { horizontal: 'center' };
          qSortVal.font = { bold: true };
          qSortVal.fill = blueFill;
          qSortVal.border = thinBorder;
        }
      }
    }
    relRanksWorksheet.addRow();
    relRanksWorksheet.addRow();
  }

  return workbook;
};

export default createResultsXlsxFile11;
