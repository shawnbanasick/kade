import { create } from 'zustand';
// modify "changes" to list change log in new version
// change version in three places to show update message (and github)

const appState = create((set) => ({
  activeWindow: 'viewStart',

  changes: [],

  errorMessage: '',
  extendedErrorMessage: '',
  errorStackTrace: '',

  hasDataBeenConfirmed: false,

  isDataButtonGreen: false,
  isInputButtonGreen: false,
  isCorrelationsButtonGreen: false,
  isFactorsButtonGreen: false,
  isLoadingsButtonGreen: false,
  isRotationButtonGreen: false,
  isOutputButtonGreen: false,

  showErrorMessageBar: false,
  showUpdateModal: false,

  updateVersion: '',

  version: '1.3.0',
  viewAttribution: false,
  viewData: false,
  viewClearProject: false,
  viewCorrelations: false,
  viewFactors: false,
  viewHelp: false,
  viewInput: false,
  viewLicense: false,
  viewLoadings: false,
  viewOutput: false,
  viewProjectHistory: false,
  viewRotation: false,
  viewStart: true,

  updateActiveWindow: (inputValue) => {
    set(() => ({ activeWindow: inputValue }));
  },
  updateErrorMessage: (inputValue) => {
    set(() => ({ errorMessage: inputValue }));
  },
  updateExtendedErrorMessage: (inputValue) => {
    set(() => ({ extendedErrorMessage: inputValue }));
  },
  updateErrorStackTrace: (inputValue) => {
    set(() => ({ errorStackTrace: inputValue }));
  },
  updateHasDataBeenConfirmed: (inputValue) => {
    set(() => ({ hasDataBeenConfirmed: inputValue }));
  },
  updateIsDataButtonGreen: (inputValue) => {
    set(() => ({ isDataButtonGreen: inputValue }));
  },
  updateIsInputButtonGreen: (inputValue) => {
    set(() => ({ isInputButtonGreen: inputValue }));
  },
  updateIsCorrelationsButtonGreen: (inputValue) => {
    set(() => ({ isCorrelationsButtonGreen: inputValue }));
  },
  updateIsFactorsButtonGreen: (inputValue) => {
    set(() => ({ isFactorsButtonGreen: inputValue }));
  },
  updateIsLoadingsButtonGreen: (inputValue) => {
    set(() => ({ isLoadingsButtonGreen: inputValue }));
  },
  updateIsRotationButtonGreen: (inputValue) => {
    set(() => ({ isRotationButtonGreen: inputValue }));
  },
  updateIsOutputButtonGreen: (inputValue) => {
    set(() => ({ isOutputButtonGreen: inputValue }));
  },
  updateShowErrorMessageBar: (inputValue) => {
    set(() => ({ showErrorMessageBar: inputValue }));
  },
  updateShowUpdateModal: (inputValue) => {
    set(() => ({ showUpdateModal: inputValue }));
  },
  updateUpdateVersion: (inputValue) => {
    set(() => ({ updateVersion: inputValue }));
  },
  updateViewAttribution: (inputValue) => {
    set(() => ({ viewAttribution: inputValue }));
  },
  updateViewData: (inputValue) => {
    set(() => ({ viewData: inputValue }));
  },
  updateViewClearProject: (inputValue) => {
    set(() => ({ viewClearProject: inputValue }));
  },
  updateViewCorrelations: (inputValue) => {
    set(() => ({ viewCorrelations: inputValue }));
  },
  updateViewFactors: (inputValue) => {
    set(() => ({ viewFactors: inputValue }));
  },
  updateViewHelp: (inputValue) => {
    set(() => ({ viewHelp: inputValue }));
  },
  updateViewInput: (inputValue) => {
    set(() => ({ viewInput: inputValue }));
  },
  updateViewLicense: (inputValue) => {
    set(() => ({ viewLicense: inputValue }));
  },
  updateViewLoadings: (inputValue) => {
    set(() => ({ viewLoadings: inputValue }));
  },
  updateViewOutput: (inputValue) => {
    set(() => ({ viewOutput: inputValue }));
  },
  updateViewProjectHistory: (inputValue) => {
    set(() => ({ viewProjectHistory: inputValue }));
  },
  updateViewRotation: (inputValue) => {
    set(() => ({ viewRotation: inputValue }));
  },
  updateViewStart: (inputValue) => {
    set(() => ({ viewStart: inputValue }));
  }
}));

export default appState;
