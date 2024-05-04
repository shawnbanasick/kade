import { create } from 'zustand';

const dataDisplayState = create((set) => ({
  showQsortsSpreadsheet: false,
  showQsorts: true,

  isShowQsortsSpreadsheetButtonGreen: false,
  isShowQsortsButtonGreen: true,

  updateShowQsortsSpreadsheet: (inputValue) => set({ showQsortsSpreadsheet: inputValue }),
  updateShowQsorts: (inputValue) => set({ showQsorts: inputValue }),
  updateIsShowQsortsSpreadsheetButtonGreen: (inputValue) =>
    set({ isShowQsortsSpreadsheetButtonGreen: inputValue }),
  updateIsShowQsortsButtonGreen: (inputValue) => set({ isShowQsortsButtonGreen: inputValue }),
}));

export default dataDisplayState;
