import inputState from "../../GlobalState/inputState";

const revertLoadButtonsColors = type => {
  if (type !== "csv") {
    inputState.isLoadCsvTextButtonGreen = false;
    inputState.isLoadCsvQsortsButtonGreen = false;
  }

  if (type !== "json") {
    inputState.isLoadJsonTextButtonGreen = false;
    inputState.isLoadJsonQsortsButtonGreen = false;
    inputState.isLoadSheetsCsvButtonGreen = false;
  }

  if (type !== "pqmethod") {
    inputState.isLoadPqmethodTextButtonButtonGreen = false;
    inputState.isLoadPqmethodQsortsButtonGreen = false;
  }

  inputState.isLoadExcelT3ButtonGreen = false;
  inputState.isLoadExcelT2ButtonGreen = false;
  inputState.isLoadExcelT1ButtonGreen = false;
  inputState.isLoadLipsetButtonGreen = false;
  inputState.isLoadBuzzwordsButtonGreen = false;
  inputState.isLoadMotivationalButtonGreen = false;
  inputState.isLoadIpadSurveyButtonGreen = false;
};

export default revertLoadButtonsColors;
