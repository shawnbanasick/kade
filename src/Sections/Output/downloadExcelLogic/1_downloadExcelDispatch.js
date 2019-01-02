import downloadExcelOutputFile from "./2_downloadExcelOutputFile";
import state from "../../../store";

const downloadExcelDispatch = () => {
  // initialize output cascade

  const dataXlsx = state.getState("outputData");
  const colSizes = state.getState("colSizes");
  const sheetNamesXlsx = state.getState("sheetNamesXlsx");

  // needs dataXlsx, sheetNamesXlsx, colSizes from store
  downloadExcelOutputFile(dataXlsx, sheetNamesXlsx, colSizes);
};

export default downloadExcelDispatch;
