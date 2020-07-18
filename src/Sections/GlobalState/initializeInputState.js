import inputState from '../GlobalState/inputState';

const initializeInputState = () => {
 
    // keep visible section to clear project to aviod toastify error;
    inputState.areStatementsLoaded = false;
    inputState.areQsortsLoaded = false;
  
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
    inputState.isLoadExcelT3ButtonGreen = false;
    inputState.isLoadExcelT2ButtonGreen = false;
    inputState.isLoadExcelT1ButtonGreen = false;
    inputState.isLoadJsonTextButtonGreen = false;
    inputState.isLoadJsonQsortsButtonGreen = false;
    inputState.isLoadPqmethodTextButtonButtonGreen = false;
    inputState.isLoadPqmethodQsortsButtonGreen = false;
    inputState.isLoadLipsetButtonGreen = false;
    inputState.isLoadBuzzwordsButtonGreen = false;
    inputState.isLoadMotivationalButtonGreen = false;
    inputState.isLoadIpadSurveyButtonGreen = false;
  
    inputState.jsonParticipantId = [];
  
    inputState.notifyDataUploadSuccess = false;
  
    inputState.requiredQsortPatternInput = false;
  
    inputState.showCsvErrorModal = false;
    inputState.showExcelErrorModal = false;
    inputState.showErrorMessageBar = false;
    inputState.showForcedInput = false;
    inputState.showJsonFileLoadedMessage = false;
    inputState.showJsonParticipantIdDropdown = false;
    inputState.sortsLoaded = false;
    inputState.statementsLoaded = false;
  
    inputState.unforcedRadioButtonState = "forced";
   
    
    return;
    
}

export default initializeInputState;