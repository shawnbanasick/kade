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

const createResultsExcelSheets8 = async (
  workbook,
  conDisDataArray,
  factorCharDataArray,
  stdErrDataArray,
  textObject
) => {
  /**
   **
   ** CONSENSUS vs. DISAGREEMENT SHEET
   **
   */

  const conDistTabName = (textObject?.conDist || 'Consensus-Disagreement').slice(0, 31); // Limit to 31 characters
  const factorCharTabName = (textObject?.factorCharacteristics || 'Factor Characteristics').slice(
    0,
    31
  ); // Limit to 31 characters
  const stdErrTabName = (textObject?.standardErrors || 'Standard Errors').slice(0, 31); // Limit to 31 characters

  const conDistWorksheet = workbook.addWorksheet(
    `${textObject?.conDist || 'Consensus-Disagreement'}`
  );
  conDistWorksheet.columns = [
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
  conDistWorksheet.views = [{ state: 'frozen', ySplit: 3, xSplit: 2 }];

  const headerCell19 = conDistWorksheet.getCell('A1');
  headerCell19.value = `${conDistTabName || textObject?.conDist || 'Consensus-Disagreement'}`;
  headerCell19.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell19.alignment = { horizontal: 'left' };
  headerCell19.fill = blueFill;
  headerCell19.border = thinBorder;
  const headerCell20 = conDistWorksheet.getCell('B1');
  headerCell20.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell20.alignment = { horizontal: 'left' };
  headerCell20.fill = blueFill;
  headerCell20.border = thinBorder;

  conDistWorksheet.addRow();

  for (let i = 4; i < conDisDataArray.length; i++) {
    const row = conDistWorksheet.addRow(conDisDataArray[i]);
    let partCol = row.getCell(1);
    partCol.alignment = { horizontal: 'center', textWrap: true };
    partCol.value = conDisDataArray?.[i]?.[0];
    if (i === 4) {
      partCol.font = { bold: true };
      partCol.alignment = { horizontal: 'left' };
      partCol.fill = blueFill;
      partCol.border = thinBorder;
    }
    // iterate through q sort values and add them to the row
    for (let j = 1; j < conDisDataArray?.[i].length; j++) {
      let qSortVal = row.getCell(1 + j);
      qSortVal.value = conDisDataArray?.[i]?.[j];
      if (i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
        qSortVal.fill = blueFill;
        qSortVal.border = thinBorder;
      }
    }
  }
  /**
   **
   ** FACTOR CHARACTERISTICS SHEET
   **
   */
  const factorCharWorksheet = workbook.addWorksheet(factorCharTabName);
  // factorCharDataArray[0][0] = 'Free Distribution';
  factorCharWorksheet.columns = [
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

  const headerCell2 = factorCharWorksheet.getCell('A1');
  headerCell2.value = `${factorCharDataArray[2][0]}`;
  headerCell2.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell2.alignment = { horizontal: 'left' };
  headerCell2.fill = blueFill;
  headerCell2.border = thinBorder;
  const headerCell3 = factorCharWorksheet.getCell('B1');
  headerCell3.fill = blueFill;
  headerCell3.border = thinBorder;

  factorCharWorksheet.addRow();

  for (let i = 4; i < factorCharDataArray.length; i++) {
    const row = factorCharWorksheet.addRow(factorCharDataArray[i]);
    let numCol = row.getCell(1);
    numCol.alignment = { horizontal: 'center' };
    numCol.font = { bold: true };
    numCol.value = factorCharDataArray?.[i]?.[0];
    numCol.fill = blueFill;
    numCol.border = thinBorder;
    // iterate through name and factors and add them to the row
    for (let j = 1; j < factorCharDataArray?.[i].length; j++) {
      let qSortVal = row.getCell(1 + j);
      qSortVal.value = factorCharDataArray?.[i]?.[j];
      if (i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
        qSortVal.fill = blueFill;
        qSortVal.border = thinBorder;
      }
    }
  }
  /**
   **
   ** STANDARD ERRORS SHEET
   **
   */
  const standardErrorsWorksheet = workbook.addWorksheet(
    stdErrTabName || textObject?.standardErrors || 'Standard Errors'
  );
  standardErrorsWorksheet.columns = [
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

  const headerCell1 = standardErrorsWorksheet.getCell('A1');
  headerCell1.value = `${stdErrDataArray[2][0]}`;
  headerCell1.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCell1.alignment = { horizontal: 'left' };
  headerCell1.fill = blueFill;
  headerCell1.border = thinBorder;
  const headerCell4 = standardErrorsWorksheet.getCell('B1');
  headerCell4.fill = blueFill;
  headerCell4.border = thinBorder;
  const headerCell5 = standardErrorsWorksheet.getCell('C1');
  headerCell5.fill = blueFill;
  headerCell5.border = thinBorder;
  const headerCell6 = standardErrorsWorksheet.getCell('D1');
  headerCell6.fill = blueFill;
  headerCell6.border = thinBorder;
  const headerCell7 = standardErrorsWorksheet.getCell('E1');
  headerCell7.fill = blueFill;
  headerCell7.border = thinBorder;

  standardErrorsWorksheet.addRow();

  for (let i = 4; i < stdErrDataArray.length; i++) {
    const row = standardErrorsWorksheet.addRow(stdErrDataArray[i]);
    // number column
    let numCol = row.getCell(1);
    numCol.alignment = { horizontal: 'center' };
    numCol.font = { bold: true };
    numCol.value = stdErrDataArray?.[i]?.[0];
    numCol.fill = blueFill;
    numCol.border = thinBorder;
    // iterate through name and factors and add them to the row
    for (let j = 1; j < stdErrDataArray?.[i].length; j++) {
      let qSortVal = row.getCell(1 + j);
      qSortVal.value = stdErrDataArray?.[i]?.[j];
      qSortVal.alignment = { horizontal: 'center' };
      if (i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
        qSortVal.fill = blueFill;
        qSortVal.border = thinBorder;
      }
    }
  }

  return workbook;
};

export default createResultsExcelSheets8;
