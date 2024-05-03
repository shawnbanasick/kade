import inputState from "../GlobalState/inputState";

const initializeInputState = () => {
  // keep visible section to clear project to aviod toastify error;
  inputState.areStatementsLoaded = false;
  inputState.areQsortsLoaded = false;
  inputState.areQsortsVerified = false;
  inputState.isQsortPatternLoaded = false;

  inputState.csvErrorMessage1 = "";

  inputState.dataOrigin = "";

  inputState.excelErrorMessage1 = "";
  inputState.errorMessage = "";
  inputState.errorStackTrace = "";
  inputState.extendedErrorMessage = "";

  inputState.hasAddedProjectName = false;

  inputState.isDataAlreadyLoaded = false;
  inputState.isForcedQsortPattern = true;
  inputState.isLoadCsvQsortsButtonGreen = false;
  inputState.isLoadCsvTextButtonGreen = false;
  inputState.isCsvDataErrorCheckButtonGreen = false;
  inputState.isLoadExcelT3ButtonGreen = false;
  inputState.isLoadExcelT2ButtonGreen = false;
  inputState.isLoadExcelT1ButtonGreen = false;
  inputState.isLoadJsonTextButtonGreen = false;
  inputState.isLoadJsonQsortsButtonGreen = false;
  inputState.isLoadSheetsCsvButtonGreen = false;
  inputState.isLoadPqmethodTextButtonButtonGreen = false;
  inputState.isLoadPqmethodQsortsButtonGreen = false;
  inputState.isLoadLipsetButtonGreen = false;
  inputState.isLoadBuzzwordsButtonGreen = false;
  inputState.isLoadMotivationalButtonGreen = false;
  inputState.isLoadIpadSurveyButtonGreen = false;
  inputState.isShowFirebaseInputButtonGreen = false;
  inputState.isShowSheetsInputButtonGreen = false;
  inputState.isShowNetlifyInputButtonGreen = false;

  inputState.disabledFirebaseButton = false;
  inputState.disabledSheetsButton = false;
  inputState.disabledNetlifyButton = false;
  inputState.userSelectSheetsPartId = "randomId";

  inputState.jsonParticipantId = [];

  inputState.notifyDataUploadSuccess = false;

  inputState.requiredQsortPatternInput = false;

  inputState.showCsvErrorModal = false;
  inputState.showDataImportSuccessMessage = false;
  inputState.showExcelErrorModal = false;
  inputState.showErrorMessageBar = false;
  inputState.showFirebaseInput = false;
  inputState.showForcedInput = false;
  inputState.showNetlifyInput = false;
  inputState.showSheetsInput = false;
  inputState.showExportButtons = false;
  inputState.showJsonFileLoadedMessage = false;
  inputState.showJsonParticipantIdDropdown = false;
  inputState.sortsLoaded = false;
  inputState.sortsPasteTextArea = "";
  inputState.statementsLoaded = false;

  inputState.unforcedRadioButtonState = "forced";

  return;
};

export default initializeInputState;
