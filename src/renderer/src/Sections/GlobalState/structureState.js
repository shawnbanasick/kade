import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const structureState = create(
  immer((set) => ({
    initialEdges: [],
    initialNodes: [],

    updateInitialEdges: (inputValue) => set({ initialEdges: inputValue }),
    updateInitialNodes: (inputValue) => set({ initialNodes: inputValue }),
  }))
);

export default structureState;
