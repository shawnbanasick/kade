import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const correlationState = create(
  immer((set) => ({
    activeStartAnalysisButton: false,

    colMaxWidth: 0,
    correlationTableArray: [],
    correlation5Calcs: [],

    firstColMaxWidth: 0,

    gridColDefs: [],
    gridRowData: [],

    isLoadingBeginAnalysis: false,

    showCorrelationMatrix: false,

    updateActiveStartAnalysisButton: (inputValue) => set({ activeStartAnalysisButton: inputValue }),
    updateColMaxWidth: (inputValue) => set({ colMaxWidth: inputValue }),
    updateCorrelationTableArray: (inputValue) => set({ correlationTableArray: inputValue }),
    updateCorrelation5Calcs: (inputValue) => set({ correlation5Calcs: inputValue }),
    updateFirstColMaxWidth: (inputValue) => set({ firstColMaxWidth: inputValue }),
    updateGridColDefs: (inputValue) => set({ gridColDefs: inputValue }),
    updateGridRowData: (inputValue) => set({ gridRowData: inputValue }),
    updateIsLoadingBeginAnalysis: (inputValue) => set({ isLoadingBeginAnalysis: inputValue }),
    updateShowCorrelationMatrix: (inputValue) => set({ showCorrelationMatrix: inputValue }),
  }))
);

export default correlationState;
