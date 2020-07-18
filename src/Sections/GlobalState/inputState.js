import { store } from "react-easy-state";

const inputState = store({
  areStatementsLoaded: false,
  areQsortsLoaded: false,

  csvErrorMessage1: "",

  dataOrigin: "",

  excelErrorMessage1: "",
  errorMessage: "",
  errorStackTrace: "",
  extendedErrorMessage: "",

  hasAddedProjectName: false,

  isDataAlreadyLoaded: false,
  isForcedQsortPattern: true,
  isLoadCsvQsortsButtonGreen: false,
  isLoadCsvTextButtonGreen: false,
  isLoadExcelT3ButtonGreen: false,
  isLoadExcelT2ButtonGreen: false,
  isLoadExcelT1ButtonGreen: false,
  isLoadJsonTextButtonGreen: false,
  isLoadJsonQsortsButtonGreen: false,
  isLoadPqmethodTextButtonButtonGreen: false,
  isLoadPqmethodQsortsButtonGreen: false,
  isLoadLipsetButtonGreen: false,
  isLoadBuzzwordsButtonGreen: false,
  isLoadMotivationalButtonGreen: false,
  isLoadIpadSurveyButtonGreen: false,

  jsonParticipantId: [],

  notifyDataUploadSuccess: false,

  requiredQsortPatternInput: false,

  showCsvErrorModal: false,
  showExcelErrorModal: false,
  showErrorMessageBar: false,
  showForcedInput: false,
  showJsonFileLoadedMessage: false,
  showJsonParticipantIdDropdown: false,
  sortsLoaded: false,
  statementsLoaded: false,

  unforcedRadioButtonState: "forced"
});

export default inputState;
