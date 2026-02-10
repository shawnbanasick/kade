import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const correlationState = create(
  immer((set, get) => ({
    activeStartAnalysisButton: false,

    colMaxWidth: 0,
    correlationTableArray: [],
    correlation5Calcs: [],

    correlationTabActive: 'tab1',

    firstColMaxWidth: 0,

    gridColDefs: [],
    gridRowData: [],

    forcedGraphDataAll: [],
    forcedGraphDataPos: [],
    forcedGraphDataNeg: [],
    linkFilter: 'positive',
    correlationThreshold: 0.5,
    factorIndices: [],

    isLoadingBeginAnalysis: false,

    showCorrelationMatrix: false,

    updateFactorIndices: (inputValue) => set({ factorIndices: inputValue }),
    updateCorrelationThreshold: (inputValue) => set({ correlationThreshold: inputValue }),
    updateLinkFilter: (inputValue) => set({ linkFilter: inputValue }),
    updateForcedGraphDataAll: (inputValue) => set({ forcedGraphDataAll: inputValue }),
    updateForcedGraphDataPos: (inputValue) => set({ forcedGraphDataPos: inputValue }),
    updateForcedGraphDataNeg: (inputValue) => set({ forcedGraphDataNeg: inputValue }),
    updateCorrelationTabActive: (inputValue) => set({ correlationTabActive: inputValue }),
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
