import inputState from "../../GlobalState/inputState";

const setNonNumericErrorContent = (test1, respondentNames) => {
  inputState.showWarningMessageBar = true;
  inputState.errorMessage = `There was a non-numeric value in Q sort #${test1[0][0][1]}`;
  inputState.errorStackTrace = "Error in 'standardErrorChecks' function";
  inputState.extendedErrorMessage = `Participant ${
    respondentNames[test1[0][0][1] - 1]
  } (Q sort #${
    test1[0][0][1]
  }) has a non-numeric value. Check the Q sorts file.`;
  inputState.isLoadCsvQsortsButtonGreen = false;
  inputState.isCsvDataErrorCheckButtonGreen = false;
  inputState.showDataImportSuccessMessage = false;
};

export default setNonNumericErrorContent;
