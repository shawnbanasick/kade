import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const dataDisplayState = create(
  immer((set, get) => ({
    showQsortsSpreadsheet: false,
    showQsorts: false,
    showQsortsList: true,

    dataActiveTab: 'tab1',

    isShowQsortsSpreadsheetButtonGreen: false,
    isShowQsortsButtonGreen: false,
    isShowQsortsListButtonGreen: true,

    updateDataActiveTab: (inputValue) => set({ dataActiveTab: inputValue }),
    updateShowQsortsSpreadsheet: (inputValue) => set({ showQsortsSpreadsheet: inputValue }),
    updateShowQsorts: (inputValue) => set({ showQsorts: inputValue }),
    updateShowQsortsList: (inputValue) => set({ showQsortsList: inputValue }),

    updateIsShowQsortsListButtonGreen: (inputValue) =>
      set({ isShowQsortsListButtonGreen: inputValue }),
    updateIsShowQsortsSpreadsheetButtonGreen: (inputValue) =>
      set({ isShowQsortsSpreadsheetButtonGreen: inputValue }),
    updateIsShowQsortsButtonGreen: (inputValue) => set({ isShowQsortsButtonGreen: inputValue }),
  }))
);

export default dataDisplayState;
