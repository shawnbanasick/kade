import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const coreState = create(
  immer((set) => ({
    activeValueM6: 0,
    activeValueM5: 0,
    activeValueM4: 0,
    activeValueM3: 0,
    activeValueM2: 0,
    activeValueM1: 0,
    activeValue0: 0,
    activeValue1: 0,
    activeValue2: 0,
    activeValue3: 0,
    activeValue4: 0,
    activeValue5: 0,
    activeValue6: 0,
    activeValue7: 0,
    activeValue8: 0,
    activeValue9: 0,
    activeValue10: 0,
    activeValue11: 0,
    activeValue12: 0,
    activeValue13: 0,

    csvData: [],
    jsonObj: {},

    mainDataObject: [],
    multiplierArray: [],

    numQsorts: 0,
    numStatements: 0,

    oldQsortPattern: [],

    projectName: 'My_Q_Project',
    qSortPattern: [],
    qSortPatternObject: {},

    respondentNames: [],

    statements: [],
    statementNumArray: [],

    sortsDisplayText: [],

    updateActiveValueM6: (inputValue) => set({ activeValueM6: inputValue }),
    updateActiveValueM5: (inputValue) => set({ activeValueM5: inputValue }),
    updateActiveValueM4: (inputValue) => set({ activeValueM4: inputValue }),
    updateActiveValueM3: (inputValue) => set({ activeValueM3: inputValue }),
    updateActiveValueM2: (inputValue) => set({ activeValueM2: inputValue }),
    updateActiveValueM1: (inputValue) => set({ activeValueM1: inputValue }),
    updateActiveValue0: (inputValue) => set({ activeValue0: inputValue }),
    updateActiveValue1: (inputValue) => set({ activeValue1: inputValue }),
    updateActiveValue2: (inputValue) => set({ activeValue2: inputValue }),
    updateActiveValue3: (inputValue) => set({ activeValue3: inputValue }),
    updateActiveValue4: (inputValue) => set({ activeValue4: inputValue }),
    updateActiveValue5: (inputValue) => set({ activeValue5: inputValue }),
    updateActiveValue6: (inputValue) => set({ activeValue6: inputValue }),
    updateActiveValue7: (inputValue) => set({ activeValue7: inputValue }),
    updateActiveValue8: (inputValue) => set({ activeValue8: inputValue }),
    updateActiveValue9: (inputValue) => set({ activeValue9: inputValue }),
    updateActiveValue10: (inputValue) => set({ activeValue10: inputValue }),
    updateActiveValue11: (inputValue) => set({ activeValue11: inputValue }),
    updateActiveValue12: (inputValue) => set({ activeValue12: inputValue }),
    updateActiveValue13: (inputValue) => set({ activeValue13: inputValue }),
    updateCsvData: (inputValue) => set({ csvData: inputValue }),
    updateJsonObj: (inputValue) => set({ jsonObj: inputValue }),
    updateMainDataObject: (inputValue) => set({ mainDataObject: inputValue }),
    updateMultiplierArray: (inputValue) => set({ multiplierArray: inputValue }),
    updateNumQsorts: (inputValue) => set({ numQsorts: inputValue }),
    updateNumStatements: (inputValue) => set({ numStatements: inputValue }),
    updateOldQsortPattern: (inputValue) => set({ oldQsortPattern: inputValue }),
    updateProjectName: (inputValue) => set({ projectName: inputValue }),
    updateQSortPattern: (inputValue) => set({ qSortPattern: inputValue }),
    updateQSortPatternObject: (inputValue) => set({ qSortPatternObject: inputValue }),
    updateRespondentNames: (inputValue) => set({ respondentNames: inputValue }),
    updateStatements: (inputValue) => set({ statements: inputValue }),
    updateStatementNumArray: (inputValue) => set({ statementNumArray: inputValue }),
    updateSortsDisplayText: (inputValue) => set({ sortsDisplayText: inputValue }),
  }))
);

export default coreState;
