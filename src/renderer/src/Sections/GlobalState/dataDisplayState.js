import { store } from '@risingstack/react-easy-state';

const dataDisplayState = store({
  showQsortsSpreadsheet: false,
  showQsorts: true,

  isShowQsortsSpreadsheetButtonGreen: false,
  isShowQsortsButtonGreen: true
});

export default dataDisplayState;
