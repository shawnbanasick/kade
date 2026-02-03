import inputState from "../../GlobalState/inputState";

const setBeyondRangeErrorContent = test3 => {
  let unforcedNames = test3[0].toString();
  inputState.showWarningMessageBar = true;
  inputState.errorMessage = `Unforced Q sorts: ${test3[1]} >>> ${test3[0].join(
    ", "
  )}`;
  inputState.errorStackTrace = "Warning in 'standardErrorChecks' function.";
  inputState.extendedErrorMessage = `Unforced Q sorts: ${unforcedNames}. 
  \n\nCheck your Q sorts file and confirm the Q sort input if necessary.`;
  inputState.isLoadCsvQsortsButtonGreen = false;
  inputState.isCsvDataErrorCheckButtonGreen = false;
  inputState.showDataImportSuccessMessage = false;
};

export default setBeyondRangeErrorContent;
