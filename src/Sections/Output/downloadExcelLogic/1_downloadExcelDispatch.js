import downloadExcelOutputFile from "./2_downloadExcelOutputFile";

import calcState from '../../GlobalState/calcState';
const clone = require('rfdc')()

const downloadExcelDispatch = () => {
  // initialize output cascade

  const dataXlsx = clone(calcState.outputData);
  const colSizes = clone(calcState.colSizes);
  const sheetNamesXlsx = clone(calcState.sheetNamesXlsx);


  // needs dataXlsx, sheetNamesXlsx, colSizes from store
  downloadExcelOutputFile(dataXlsx, sheetNamesXlsx, colSizes);
};

export default downloadExcelDispatch;
