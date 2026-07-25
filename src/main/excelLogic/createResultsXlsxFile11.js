import ExcelJS from 'exceljs';

const createResultsXlsxFile11 = async (workbook, relativeRanksData, factorName) => {
  factorName = factorName.replace(/./, (x) => x.toUpperCase());

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

  // 10. Factor Distinguishing worksheet
  const relRanksWorksheet = workbook.addWorksheet(
    `${factorName} ${splitRelativeRanksData[0][0][0]}`
  );
  relRanksWorksheet.columns = [
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

  const headerCell1 = relRanksWorksheet.getCell('B2');
  headerCell1.value = `${splitRelativeRanksData[1][0][1]}`;
  headerCell1.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell1.alignment = { horizontal: 'left' };

  //   const headerCell2 = relRanksWorksheet.getCell('B4');
  //   headerCell2.value = `${splitRelativeRanksData[2][1]}`;
  //   headerCell2.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  //   headerCell2.alignment = { horizontal: 'left' };

  relRanksWorksheet.addRow();
  relRanksWorksheet.addRow();

  for (let k = 2; k < splitRelativeRanksData?.length; k++) {
    for (let i = 0; i < splitRelativeRanksData?.[k]?.length; i++) {
      const row = relRanksWorksheet.addRow();
      let spacerCol = row.getCell(1);
      spacerCol.value = '';
      // participant names
      let partCol = row.getCell(2);
      partCol.alignment = { horizontal: 'center' };
      partCol.value = splitRelativeRanksData?.[k]?.[i]?.[0];
      if (i === 0 || i === 1) {
        partCol.font = { bold: true };
      }
      // iterate through q sort values and add them to the row
      for (let j = 1; j < splitRelativeRanksData?.[k]?.[i]?.length; j++) {
        let qSortVal = row.getCell(2 + j);
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
        }
      }
    }
    relRanksWorksheet.addRow();
    relRanksWorksheet.addRow();
  }

  return workbook;
};

export default createResultsXlsxFile11;
