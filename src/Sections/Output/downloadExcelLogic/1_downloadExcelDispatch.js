import downloadExcelOutputFile from "./2_downloadExcelOutputFile";
import store from "../../store";

const downloadExcelDispatch = function() {
    // initialize output cascade

    let dataXlsx = store.getState("outputData");
    let colSizes = store.getState("colSizes");
    let sheetNamesXlsx = store.getState("sheetNamesXlsx");

    // needs dataXlsx, sheetNamesXlsx, colSizes from store
    downloadExcelOutputFile(dataXlsx, sheetNamesXlsx, colSizes);
};

export default downloadExcelDispatch;
