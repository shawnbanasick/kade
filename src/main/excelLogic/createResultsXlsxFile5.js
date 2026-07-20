import ExcelJS from 'exceljs';

const createResultsExcelSheets5 = async (
  workbook,
  factorScoreCorrelationsArray
  //   freeDistArray,
  //   ranksArray
) => {
  console.log('factorScoreCorrelationsArray:', factorScoreCorrelationsArray);

  // 7. Factor Loadings Table worksheet
  const factorScoreCorrelationsWorksheet = workbook.addWorksheet(
    factorScoreCorrelationsArray[0][0]
  );
  factorScoreCorrelationsWorksheet.columns = [{ width: 10 }];

  for (let i = 4; i < factorScoreCorrelationsArray?.length; i++) {
    const row = factorScoreCorrelationsWorksheet.addRow(factorScoreCorrelationsArray[i]);
    let spacerCol = row.getCell(1);
    spacerCol.value = '';
    // participant names
    let partCol = row.getCell(2);
    partCol.alignment = { horizontal: 'center' };
    partCol.value = factorScoreCorrelationsArray?.[i]?.[0];
    partCol.font = { bold: true };
    // iterate through q sort values and add them to the row
    for (let j = 1; j < factorScoreCorrelationsArray?.[i]?.length; j++) {
      let qSortVal = row.getCell(2 + j);
      qSortVal.value = factorScoreCorrelationsArray?.[i]?.[j];
      if (i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
      }
    }
  }

  return workbook;
};

export default createResultsExcelSheets5;
