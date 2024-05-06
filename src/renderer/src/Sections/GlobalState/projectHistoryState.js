import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const projectHistoryState = create(
  immer((set, get) => ({
    projectHistoryArray: [],

    updateProjectHistoryArray: (inputValue) => set({ projectHistoryArray: inputValue }),
  }))
);

export default projectHistoryState;
