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
