import downloadExcelOutputFile from './2_downloadExcelOutputFile';
import calcState from '../../GlobalState/calcState';

const downloadExcelDispatch = () => {
  // initialize output cascade

  const dataXlsx = calcState.getState().outputData;
  const colSizes = calcState.getState().colSizes;
  const sheetNamesXlsx = calcState.getState().sheetNamesXlsx;

  // needs dataXlsx, sheetNamesXlsx, colSizes from store
  downloadExcelOutputFile(dataXlsx, sheetNamesXlsx, colSizes);
};

export default downloadExcelDispatch;
