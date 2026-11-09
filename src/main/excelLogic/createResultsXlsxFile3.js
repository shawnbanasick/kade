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

const createResultsExcelSheets3 = async (
  workbook,
  correlationMatrixArray,
  unrotatedArray,
  cumulComArray,
  factorMatrixArray,
  textObject
) => {
  /**
   **
   ** CORRELATION MATRIX SHEET
   **
   */
  const tabName = (textObject?.correlationMatrix || 'Correlation Matrix').slice(0, 31);

  const correlationsWorksheet = workbook.addWorksheet(tabName);
  correlationsWorksheet.views = [{ state: 'frozen', ySplit: 3, xSplit: 1 }];
  correlationsWorksheet.columns = [{ width: 20 }];

  correlationsWorksheet.addRow();
  const headerCellCor1 = correlationsWorksheet.getCell('A1');
  headerCellCor1.value = tabName;
  headerCellCor1.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCellCor1.alignment = { horizontal: 'left' };
  headerCellCor1.fill = blueFill;
  headerCellCor1.border = thinBorder;
  const headerCellCor2 = correlationsWorksheet.getCell('B1');
  headerCellCor2.fill = blueFill;
  headerCellCor2.border = thinBorder;
  correlationsWorksheet.addRow();

  for (let i = 4; i < correlationMatrixArray.length; i++) {
    const row = correlationsWorksheet.addRow(correlationMatrixArray[i]);
    let partCol = row.getCell(1);
    partCol.alignment = { horizontal: 'center' };
    partCol.value = correlationMatrixArray?.[i]?.[0];
    partCol.font = { bold: true };
    // if (i === 4) {
    partCol.border = thinBorder;
    partCol.fill = blueFill;
    // }
    // iterate through q sort values and add them to the row
    for (let j = 1; j < correlationMatrixArray?.[i].length; j++) {
      let qSortVal = row.getCell(j + 1);
      qSortVal.value = correlationMatrixArray?.[i]?.[j];
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
   ** UNROTATED SHEET
   **
   */
  const tabNameUnrotated = (textObject?.unrotatedFactorMatrix || 'Unrotated Factor Matrix').slice(
    0,
    31
  );

  const unrotatedWorksheet = workbook.addWorksheet(tabNameUnrotated);
  unrotatedWorksheet.columns = [{ width: 10 }, { width: 35 }];
  unrotatedWorksheet.views = [{ state: 'frozen', ySplit: 3, xSplit: 2 }];
  correlationsWorksheet.views = [{ state: 'frozen', ySplit: 3, xSplit: 1 }];

  unrotatedWorksheet.addRow();
  const headerCellUnrot = unrotatedWorksheet.getCell('A1');
  headerCellUnrot.value = tabNameUnrotated;
  headerCellUnrot.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCellUnrot.alignment = { horizontal: 'left' };
  headerCellUnrot.fill = blueFill;
  headerCellUnrot.border = thinBorder;
  const headerCellUnrot2 = unrotatedWorksheet.getCell('B1');
  headerCellUnrot2.fill = blueFill;
  headerCellUnrot2.border = thinBorder;
  unrotatedWorksheet.addRow();

  for (let i = 4; i < unrotatedArray.length; i++) {
    const row = unrotatedWorksheet.addRow(unrotatedArray[i]);
    // number column
    let numCol = row.getCell(1);
    numCol.alignment = { horizontal: 'center' };
    numCol.value = unrotatedArray?.[i]?.[0];
    // iterate through name and factors and add them to the row
    for (let j = 1; j < unrotatedArray?.[i].length; j++) {
      let qSortVal = row.getCell(1 + j);
      qSortVal.value = unrotatedArray?.[i]?.[j];
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
   ** CUMULATIVE COMMUNALITIES SHEET
   **
   */
  const tabNameCumulCom = (textObject?.cumulativeCommunalities || 'Cumulative Communalities').slice(
    0,
    31
  );

  const cumulComWorksheet = workbook.addWorksheet(tabNameCumulCom);
  cumulComWorksheet.columns = [{ width: 10 }, { width: 50 }];
  cumulComWorksheet.views = [{ state: 'frozen', ySplit: 3, xSplit: 2 }];

  const headerCellCumulCom = cumulComWorksheet.getCell('A1');
  headerCellCumulCom.value = tabNameCumulCom;
  headerCellCumulCom.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCellCumulCom.alignment = { horizontal: 'left' };
  headerCellCumulCom.fill = blueFill;
  headerCellCumulCom.border = thinBorder;
  const headerCellCumulCom2 = cumulComWorksheet.getCell('B1');
  headerCellCumulCom2.fill = blueFill;
  headerCellCumulCom2.border = thinBorder;
  cumulComWorksheet.addRow();

  for (let i = 4; i < cumulComArray.length; i++) {
    const row = cumulComWorksheet.addRow(cumulComArray[i]);
    if (i === cumulComArray.length - 1) {
      const text = cumulComArray[i].shift();
      cumulComArray[i].shift();
      cumulComArray[i].unshift(text);
      cumulComArray[i].unshift('');
    }
    // let spacerCol = row.getCell(1);
    // spacerCol.value = '';
    // number column
    let numCol = row.getCell(1);
    numCol.alignment = { horizontal: 'center' };
    numCol.value = cumulComArray?.[i]?.[0];
    // iterate through name and factors and add them to the row
    for (let j = 1; j < cumulComArray?.[i].length; j++) {
      let qSortVal = row.getCell(1 + j);
      qSortVal.value = cumulComArray?.[i]?.[j];
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
   ** FACTOR MATRIX SHEET
   **
   */
  const tabNameFactorMatrix = (textObject?.factorMatrix || 'Factor Matrix').slice(0, 31);

  const factorMatrixWorksheet = workbook.addWorksheet(tabNameFactorMatrix);
  factorMatrixWorksheet.columns = [{ width: 10 }, { width: 50 }];
  factorMatrixWorksheet.views = [{ state: 'frozen', ySplit: 3, xSplit: 2 }];

  const headerCellFacMat = factorMatrixWorksheet.getCell('A1');
  headerCellFacMat.value = tabNameFactorMatrix;
  headerCellFacMat.font = { name: 'Arial', size: 14, bold: true, color: { argb: '0000000' } };
  headerCellFacMat.alignment = { horizontal: 'left' };
  headerCellFacMat.fill = blueFill;
  headerCellFacMat.border = thinBorder;
  const headerCellFacMat2 = factorMatrixWorksheet.getCell('B1');
  headerCellFacMat2.fill = blueFill;
  headerCellFacMat2.border = thinBorder;
  factorMatrixWorksheet.addRow();

  for (let i = 4; i < unrotatedArray.length; i++) {
    const row = factorMatrixWorksheet.addRow(unrotatedArray[i]);
    let numCol = row.getCell(1);
    numCol.alignment = { horizontal: 'center' };
    numCol.value = unrotatedArray?.[i]?.[0];
    // iterate through name and factors and add them to the row
    for (let j = 1; j < unrotatedArray?.[i].length; j++) {
      let qSortVal = row.getCell(1 + j);
      qSortVal.value = unrotatedArray?.[i]?.[j];
      if (j === 1 || i === 4) {
        qSortVal.font = { bold: true };
        qSortVal.alignment = { horizontal: 'center' };
        qSortVal.fill = blueFill;
        qSortVal.border = thinBorder;
      }
    }
  }

  return workbook;
};

export default createResultsExcelSheets3;
