import downloadExcelOutputFile from "./2_downloadExcelOutputFile";
import store from "../../../store";

const downloadExcelDispatch = () => {
  // initialize output cascade

  const dataXlsx = store.getState("outputData");
  const colSizes = store.getState("colSizes");
  const sheetNamesXlsx = store.getState("sheetNamesXlsx");

  // needs dataXlsx, sheetNamesXlsx, colSizes from store
  downloadExcelOutputFile(dataXlsx, sheetNamesXlsx, colSizes);
};

export default downloadExcelDispatch;
