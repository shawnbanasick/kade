import ExcelJS from 'exceljs';

const createResultsExcelSheets6 = async (workbook, data, factorName) => {
  factorName = factorName.replace(/./, (x) => x.toUpperCase());

  // 10. Factor Score Correlations worksheet
  const factorScoreCorrelationsWorksheet = workbook.addWorksheet(
    `${factorName} - Weights`
    // `${data[0][2][0]} (${data[0][2][1]})`
  );
  factorScoreCorrelationsWorksheet.columns = [
    { width: 10 },
    { width: 10 },
    { width: 20 },
    { width: 20 },
  ];

  for (let i = 4; i < data?.[0]?.length; i++) {
    const row = factorScoreCorrelationsWorksheet.addRow(data[0][i]);
    let spacerCol = row.getCell(1);
    spacerCol.value = '';
    // participant names
    let partCol = row.getCell(2);
    partCol.alignment = { horizontal: 'center' };
    partCol.value = data?.[0]?.[i]?.[0];
    partCol.font = { bold: false };
    // iterate through q sort values and add them to the row
    for (let j = 1; j < data?.[0]?.[i]?.length; j++) {
      let qSortVal = row.getCell(2 + j);
      qSortVal.value = data?.[0]?.[i]?.[j];
      qSortVal.alignment = { horizontal: 'center' };
      if (i === 4) {
        qSortVal.font = { bold: true };
      }
    }
  }

  // const factorWeightsWorksheet = workbook.addWorksheet(`${data[1][2][0]} (${data[1][2][1]})`);
  const factorWeightsWorksheet = workbook.addWorksheet(`${factorName}-Correlations`);
  factorWeightsWorksheet.columns = [{ width: 10 }, { width: 20 }];

  for (let i = 4; i < data?.[1]?.length; i++) {
    const row = factorWeightsWorksheet.addRow(data[1][i]);
    let spacerCol = row.getCell(1);
    spacerCol.value = '';
    // participant names
    let partCol = row.getCell(2);
    partCol.alignment = { horizontal: 'center' };
    partCol.value = data?.[1]?.[i]?.[0];
    partCol.font = { bold: true };
    // iterate through q sort values and add them to the row
    for (let j = 1; j < data?.[1]?.[i]?.length; j++) {
      let qSortVal = row.getCell(2 + j);
      qSortVal.value = data?.[1]?.[i]?.[j];
      if (i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
      }
    }
  }

  // const factorWorksheet = workbook.addWorksheet(`${data[2][2][0]} (${data[2][2][1]})`);
  const factorWorksheet = workbook.addWorksheet(`${factorName}`);
  factorWorksheet.columns = [
    { width: 10 },
    { width: 10 },
    { width: 70 },
    { width: 12 },
    { width: 20 },
  ];

  for (let i = 4; i < data?.[2]?.length; i++) {
    const row = factorWorksheet.addRow(data[2][i]);
    let spacerCol = row.getCell(1);
    spacerCol.value = '';
    // participant names
    let partCol = row.getCell(2);
    partCol.alignment = { horizontal: 'center', wrapText: true };
    partCol.value = data?.[2]?.[i]?.[0];
    if (i === 4) {
      partCol.font = { bold: true };
    }
    // iterate through q sort values and add them to the row
    for (let j = 1; j < data?.[2]?.[i]?.length; j++) {
      let qSortVal = row.getCell(2 + j);
      qSortVal.value = data?.[2]?.[i]?.[j];
      if (i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center', wrapText: true };
      }
      if (j === 3) {
        qSortVal.alignment = { horizontal: 'center' };
      }
    }
  }

  return workbook;
};

export default createResultsExcelSheets6;
