import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const dataDisplayState = create(
  immer((set, get) => ({
    showQsortsSpreadsheet: false,
    showQsorts: true,
    dataActiveTab: 'tab1',

    isShowQsortsSpreadsheetButtonGreen: false,
    isShowQsortsButtonGreen: true,

    updateDataActiveTab: (inputValue) => set({ dataActiveTab: inputValue }),
    updateShowQsortsSpreadsheet: (inputValue) => set({ showQsortsSpreadsheet: inputValue }),
    updateShowQsorts: (inputValue) => set({ showQsorts: inputValue }),
    updateIsShowQsortsSpreadsheetButtonGreen: (inputValue) =>
      set({ isShowQsortsSpreadsheetButtonGreen: inputValue }),
    updateIsShowQsortsButtonGreen: (inputValue) => set({ isShowQsortsButtonGreen: inputValue }),
  }))
);

export default dataDisplayState;
