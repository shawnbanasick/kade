import { update } from 'lodash';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const structureState = create(
  immer((set) => ({
    initialEdges: [],
    initialNodes: [],
    lineDisplayCutoff: 0.4,
    adjustVerticalSpacing: 40,
    displayAutoflaggedQSortsNum: false,
    boxWidth: 'variance',
    responseArray: [],
    refreshVizButtonColor: '#d6dbe0',
    structureTabActive: 'tab1',
    structureCorrelationThreshold: 0.4,
    horizontalSpacing: 150,
    verticalSpacing: 100,
    explainedVarianceArrays: [],
    showAutoFlags: false,
    selectedPcaScenario: 'one',
    hasParallelAnalysisFinished: false,

    updateHasParallelAnalysisFinished: (inputValue) =>
      set({ hasParallelAnalysisFinished: inputValue }),
    updateSelectedPcaScenario: (inputValue) => set({ selectedPcaScenario: inputValue }),
    updateShowAutoFlags: (inputValue) => set({ showAutoFlags: inputValue }),
    updateExplainedVarianceArrays: (inputValue) => set({ explainedVarianceArrays: inputValue }),
    updateVerticalSpacing: (inputValue) => set({ verticalSpacing: inputValue }),
    updateHorizontalSpacing: (inputValue) => set({ horizontalSpacing: inputValue }),
    updateStructureCorrelationThreshold: (inputValue) =>
      set({ structureCorrelationThreshold: inputValue }),
    updateStructureTabActive: (inputValue) => set({ structureTabActive: inputValue }),
    updateRefreshVizButtonColor: (inputValue) => set({ refreshVizButtonColor: inputValue }),
    updateResponseArray: (inputValue) => set({ responseArray: inputValue }),
    updateBoxWidth: (inputValue) => set({ boxWidth: inputValue }),
    updateDisplayAutoflaggedQSortsNum: (inputValue) =>
      set({ displayAutoflaggedQSortsNum: inputValue }),
    updateInitialEdges: (inputValue) => set({ initialEdges: inputValue }),
    updateInitialNodes: (inputValue) => set({ initialNodes: inputValue }),
    updateLineDisplayCutoff: (inputValue) => set({ lineDisplayCutoff: inputValue }),
    updateAdjustVerticalSpacing: (inputValue) => set({ adjustVerticalSpacing: inputValue }),
  }))
);

export default structureState;
