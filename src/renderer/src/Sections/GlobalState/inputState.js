import { create } from 'zustand';

const inputState = create((set) => ({
  // progress check
  areStatementsLoaded: false,
  areQsortsLoaded: false,
  areQsortsVerified: false,
  isQsortPatternLoaded: false,

  csvErrorMessage1: '',

  dataOrigin: '',

  excelErrorMessage1: '',
  errorMessage: '',
  errorStackTrace: '',
  extendedErrorMessage: '',

  hasAddedProjectName: false,

  isDataAlreadyLoaded: false,
  isForcedQsortPattern: true,
  isLoadCsvQsortsButtonGreen: false,
  isLoadCsvTextButtonGreen: false,
  isCsvDataErrorCheckButtonGreen: false,
  isLoadExcelT3ButtonGreen: false,
  isLoadExcelT2ButtonGreen: false,
  isLoadExcelT1ButtonGreen: false,
  isLoadJsonTextButtonGreen: false,
  isLoadJsonQsortsButtonGreen: false,
  isLoadSheetsCsvButtonGreen: false,
  isLoadNetlifyCsvButtonGreen: false,
  isLoadPqmethodTextButtonButtonGreen: false,
  isLoadPqmethodQsortsButtonGreen: false,
  isLoadLipsetButtonGreen: false,
  isLoadBuzzwordsButtonGreen: false,
  isLoadMotivationalButtonGreen: false,
  isLoadIpadSurveyButtonGreen: false,
  isShowFirebaseInputButtonGreen: false,
  isShowSheetsInputButtonGreen: false,
  isShowNetlifyInputButtonGreen: false,
  isLoadZipButtonGreen: false,

  disabledFirebaseButton: false,
  disabledSheetsButton: false,
  disabledNetlifyButton: false,
  userSelectSheetsPartId: 'randomId',

  jsonParticipantId: [],

  notifyDataUploadSuccess: false,

  requiredQsortPatternInput: false,

  showCsvErrorModal: false,
  showDataImportSuccessMessage: false,
  showExcelErrorModal: false,
  showErrorMessageBar: false,
  showWarningMessageBar: false,
  showWarningMessage: false,
  showFirebaseInput: false,
  showForcedInput: false,
  showSheetsInput: false,
  showExportButtons: false,
  showJsonFileLoadedMessage: false,
  showJsonParticipantIdDropdown: false,
  showNetlifyInput: false,
  sortsLoaded: false,
  sortsPasteTextArea: '',
  statementsLoaded: false,

  unforcedRadioButtonState: 'forced',

  updateAreStatementsLoaded: (inputValue) => set({ areStatementsLoaded: inputValue }),
  updateAreQsortsLoaded: (inputValue) => set({ areQsortsLoaded: inputValue }),
  updateAreQsortsVerified: (inputValue) => set({ areQsortsVerified: inputValue }),
  updateIsQsortPatternLoaded: (inputValue) => set({ isQsortPatternLoaded: inputValue }),
  updateCsvErrorMessage1: (inputValue) => set({ csvErrorMessage1: inputValue }),
  updateDataOrigin: (inputValue) => set({ dataOrigin: inputValue }),
  updateExcelErrorMessage1: (inputValue) => set({ excelErrorMessage1: inputValue }),
  updateErrorMessage: (inputValue) => set({ errorMessage: inputValue }),
  updateErrorStackTrace: (inputValue) => set({ errorStackTrace: inputValue }),
  updateExtendedErrorMessage: (inputValue) => set({ extendedErrorMessage: inputValue }),
  updateHasAddedProjectName: (inputValue) => set({ hasAddedProjectName: inputValue }),
  updateIsDataAlreadyLoaded: (inputValue) => set({ isDataAlreadyLoaded: inputValue }),
  updateIsForcedQsortPattern: (inputValue) => set({ isForcedQsortPattern: inputValue }),
  updateIsLoadCsvQsortsButtonGreen: (inputValue) => set({ isLoadCsvQsortsButtonGreen: inputValue }),
  updateIsLoadCsvTextButtonGreen: (inputValue) => set({ isLoadCsvTextButtonGreen: inputValue }),
  updateIsCsvDataErrorCheckButtonGreen: (inputValue) =>
    set({ isCsvDataErrorCheckButtonGreen: inputValue }),
  updateIsLoadExcelT3ButtonGreen: (inputValue) => set({ isLoadExcelT3ButtonGreen: inputValue }),
  updateIsLoadExcelT2ButtonGreen: (inputValue) => set({ isLoadExcelT2ButtonGreen: inputValue }),
  updateIsLoadExcelT1ButtonGreen: (inputValue) => set({ isLoadExcelT1ButtonGreen: inputValue }),
  updateIsLoadJsonTextButtonGreen: (inputValue) => set({ isLoadJsonTextButtonGreen: inputValue }),
  updateIsLoadJsonQsortsButtonGreen: (inputValue) =>
    set({ isLoadJsonQsortsButtonGreen: inputValue }),
  updateIsLoadSheetsCsvButtonGreen: (inputValue) => set({ isLoadSheetsCsvButtonGreen: inputValue }),
  updateIsLoadNetlifyCsvButtonGreen: (inputValue) =>
    set({ isLoadNetlifyCsvButtonGreen: inputValue }),
  updateIsLoadPqmethodTextButtonButtonGreen: (inputValue) =>
    set({ isLoadPqmethodTextButtonButtonGreen: inputValue }),
  updateIsLoadPqmethodQsortsButtonGreen: (inputValue) =>
    set({ isLoadPqmethodQsortsButtonGreen: inputValue }),
  updateIsLoadLipsetButtonGreen: (inputValue) => set({ isLoadLipsetButtonGreen: inputValue }),
  updateIsLoadBuzzwordsButtonGreen: (inputValue) => set({ isLoadBuzzwordsButtonGreen: inputValue }),
  updateIsLoadMotivationalButtonGreen: (inputValue) =>
    set({ isLoadMotivationalButtonGreen: inputValue }),
  updateIsLoadIpadSurveyButtonGreen: (inputValue) =>
    set({ isLoadIpadSurveyButtonGreen: inputValue }),
  updateIsShowFirebaseInputButtonGreen: (inputValue) =>
    set({ isShowFirebaseInputButtonGreen: inputValue }),
  updateIsShowSheetsInputButtonGreen: (inputValue) =>
    set({ isShowSheetsInputButtonGreen: inputValue }),
  updateIsShowNetlifyInputButtonGreen: (inputValue) =>
    set({ isShowNetlifyInputButtonGreen: inputValue }),
  updateIsLoadZipButtonGreen: (inputValue) => set({ isLoadZipButtonGreen: inputValue }),
  updateDisabledFirebaseButton: (inputValue) => set({ disabledFirebaseButton: inputValue }),
  updateDisabledSheetsButton: (inputValue) => set({ disabledSheetsButton: inputValue }),
  updateDisabledNetlifyButton: (inputValue) => set({ disabledNetlifyButton: inputValue }),
  updateUserSelectSheetsPartId: (inputValue) => set({ userSelectSheetsPartId: inputValue }),
  updateJsonParticipantId: (inputValue) => set({ jsonParticipantId: inputValue }),
  updateNotifyDataUploadSuccess: (inputValue) => set({ notifyDataUploadSuccess: inputValue }),
  updateRequiredQsortPatternInput: (inputValue) => set({ requiredQsortPatternInput: inputValue }),
  updateShowCsvErrorModal: (inputValue) => set({ showCsvErrorModal: inputValue }),
  updateShowDataImportSuccessMessage: (inputValue) =>
    set({ showDataImportSuccessMessage: inputValue }),
  updateShowExcelErrorModal: (inputValue) => set({ showExcelErrorModal: inputValue }),
  updateShowErrorMessageBar: (inputValue) => set({ showErrorMessageBar: inputValue }),
  updateShowWarningMessageBar: (inputValue) => set({ showWarningMessageBar: inputValue }),
  updateShowWarningMessage: (inputValue) => set({ showWarningMessage: inputValue }),
  updateShowFirebaseInput: (inputValue) => set({ showFirebaseInput: inputValue }),
  updateShowForcedInput: (inputValue) => set({ showForcedInput: inputValue }),
  updateShowSheetsInput: (inputValue) => set({ showSheetsInput: inputValue }),
  updateShowExportButtons: (inputValue) => set({ showExportButtons: inputValue }),
  updateShowJsonFileLoadedMessage: (inputValue) => set({ showJsonFileLoadedMessage: inputValue }),
  updateShowJsonParticipantIdDropdown: (inputValue) =>
    set({ showJsonParticipantIdDropdown: inputValue }),
  updateShowNetlifyInput: (inputValue) => set({ showNetlifyInput: inputValue }),
  updateSortsLoaded: (inputValue) => set({ sortsLoaded: inputValue }),
  updateSortsPasteTextArea: (inputValue) => set({ sortsPasteTextArea: inputValue }),
  updateStatementsLoaded: (inputValue) => set({ statementsLoaded: inputValue }),
  updateUnforcedRadioButtonState: (inputValue) => set({ unforcedRadioButtonState: inputValue }),
}));

export default inputState;
