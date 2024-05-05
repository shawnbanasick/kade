import dataDisplayState from './dataDisplayState';

const initializeDataDisplayState = () => {
  const updateShowQsortsSpreadsheet = dataDisplayState(
    (state) => state.updateShowQsortsSpreadsheet
  );
  const updateShowQsorts = dataDisplayState((state) => state.updateShowQsorts);

  const updateIsShowQsortsSpreadsheetButtonGreen = dataDisplayState(
    (state) => state.updateIsShowQsortsSpreadsheetButtonGreen
  );
  const updateIsShowQsortsButtonGreen = dataDisplayState(
    (state) => state.updateIsShowQsortsButtonGreen
  );

  updateShowQsortsSpreadsheet(false);
  updateShowQsorts(true);

  updateIsShowQsortsSpreadsheetButtonGreen(false);
  updateIsShowQsortsButtonGreen(true);

  return;
};

export default initializeDataDisplayState;
