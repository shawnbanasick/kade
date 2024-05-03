import dataDisplayState from "./dataDisplayState";

const initializeDataDisplayState = () => {
  dataDisplayState.showQsortsSpreadsheet = false;
  dataDisplayState.showQsorts = true;

  dataDisplayState.isShowQsortsSpreadsheetButtonGreen = false;
  dataDisplayState.isShowQsortsButtonGreen = true;

  return;
};

export default initializeDataDisplayState;
