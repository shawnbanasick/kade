import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const loadingState = create(
  immer((set) => ({
    autoflagButtonColor: '#d6dbe0',
    autoFlagHistory: [],

    bipolarDisabled: false,
    bipolarIndexArray: [],
    bipolarSplitCount: 0,

    currentLoadingsTable: [],

    factorToInvert: undefined,
    factorToSplit: undefined,

    gridColDefsLoadingsTable: [],
    gridRowDataLoadingsTable: [],

    highlighting: 'grays',

    isLoadingFactorsKept: false,
    isLoadingAutoflag: false,
    isLoadingsTableInitialRender: true,

    notifyDataSentToOutputSuccess: false,

    respondentNamesMaxLength: 20,
    requireMajorityCommonVariance: true,

    sendDataToOutputButtonColor: '#d6dbe0',
    showInvertFactorModal: false,
    showLoadingsTable: false,
    showSplitFactorModal: false,

    bipolarFactorsArray: [],
    splitFactorsArrayArchive: [],
    splitFactorsArray: [
      {
        key: 'factor1',
        text: '1',
        value: 1,
      },
      {
        key: 'factor2',
        text: '2',
        value: 2,
      },
      {
        key: 'factor3',
        text: '3',
        value: 3,
      },
      {
        key: 'factor4',
        text: '4',
        value: 4,
      },
      {
        key: 'factor5',
        text: '5',
        value: 5,
      },
      {
        key: 'factor6',
        text: '6',
        value: 6,
      },
      {
        key: 'factor7',
        text: '7',
        value: 7,
      },
      {
        key: 'factor8',
        text: '8',
        value: 8,
      },
    ],

    userSelectedSigLevel: 1.96,

    updateAutoflagButtonColor: (inputValue) => set({ autoflagButtonColor: inputValue }),
    updateAutoFlagHistory: (inputValue) => set({ autoFlagHistory: inputValue }),
    updateBipolarDisabled: (inputValue) => set({ bipolarDisabled: inputValue }),
    updateBipolarIndexArray: (inputValue) => set({ bipolarIndexArray: inputValue }),
    updateBipolarSplitCount: (inputValue) => set({ bipolarSplitCount: inputValue }),
    updateCurrentLoadingsTable: (inputValue) => set({ currentLoadingsTable: inputValue }),
    updateFactorToInvert: (inputValue) => set({ factorToInvert: inputValue }),
    updateFactorToSplit: (inputValue) => set({ factorToSplit: inputValue }),
    updateGridColDefsLoadingsTable: (inputValue) => set({ gridColDefsLoadingsTable: inputValue }),
    updateGridRowDataLoadingsTable: (inputValue) => set({ gridRowDataLoadingsTable: inputValue }),
    updateHighlighting: (inputValue) => set({ highlighting: inputValue }),
    updateIsLoadingFactorsKept: (inputValue) => set({ isLoadingFactorsKept: inputValue }),
    updateIsLoadingAutoflag: (inputValue) => set({ isLoadingAutoflag: inputValue }),
    updateIsLoadingsTableInitialRender: (inputValue) =>
      set({ isLoadingsTableInitialRender: inputValue }),
    updateNotifyDataSentToOutputSuccess: (inputValue) =>
      set({ notifyDataSentToOutputSuccess: inputValue }),
    updateRespondentNamesMaxLength: (inputValue) => set({ respondentNamesMaxLength: inputValue }),
    updateRequireMajorityCommonVariance: (inputValue) =>
      set({ requireMajorityCommonVariance: inputValue }),
    updateSendDataToOutputButtonColor: (inputValue) =>
      set({ sendDataToOutputButtonColor: inputValue }),
    updateShowInvertFactorModal: (inputValue) => set({ showInvertFactorModal: inputValue }),
    updateShowLoadingsTable: (inputValue) => set({ showLoadingsTable: inputValue }),
    updateShowSplitFactorModal: (inputValue) => set({ showSplitFactorModal: inputValue }),
    updateBipolarFactorsArray: (inputValue) => set({ bipolarFactorsArray: inputValue }),
    updateSplitFactorsArrayArchive: (inputValue) => set({ splitFactorsArrayArchive: inputValue }),
    updateSplitFactorsArray: (inputValue) => set({ splitFactorsArray: inputValue }),
    updateUserSelectedSigLevel: (inputValue) => set({ userSelectedSigLevel: inputValue }),
  }))
);

export default loadingState;
