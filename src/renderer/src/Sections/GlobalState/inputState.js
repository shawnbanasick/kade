import { store } from '@risingstack/react-easy-state';

const inputState = store({
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

  unforcedRadioButtonState: 'forced'
});

export default inputState;
