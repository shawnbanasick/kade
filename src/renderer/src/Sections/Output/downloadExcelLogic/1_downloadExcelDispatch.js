import downloadExcelOutputFile from "./2_downloadExcelOutputFile";
import getCalcState from "../../GlobalState/getCalcState";

const downloadExcelDispatch = () => {
  // initialize output cascade

  const dataXlsx = getCalcState("outputData");
  const colSizes = getCalcState("colSizes");
  const sheetNamesXlsx = getCalcState("sheetNamesXlsx");

  // needs dataXlsx, sheetNamesXlsx, colSizes from store
  downloadExcelOutputFile(dataXlsx, sheetNamesXlsx, colSizes);
};

export default downloadExcelDispatch;
