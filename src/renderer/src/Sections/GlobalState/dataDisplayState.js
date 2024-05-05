import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const dataDisplayState = create(
  immer((set) => ({
    showQsortsSpreadsheet: false,
    showQsorts: true,

    isShowQsortsSpreadsheetButtonGreen: false,
    isShowQsortsButtonGreen: true,

    updateShowQsortsSpreadsheet: (inputValue) => set({ showQsortsSpreadsheet: inputValue }),
    updateShowQsorts: (inputValue) => set({ showQsorts: inputValue }),
    updateIsShowQsortsSpreadsheetButtonGreen: (inputValue) =>
      set({ isShowQsortsSpreadsheetButtonGreen: inputValue }),
    updateIsShowQsortsButtonGreen: (inputValue) => set({ isShowQsortsButtonGreen: inputValue }),
  }))
);

export default dataDisplayState;
