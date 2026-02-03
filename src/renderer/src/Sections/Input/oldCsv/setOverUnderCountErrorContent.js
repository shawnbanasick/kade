import inputState from "../../GlobalState/inputState";

const setOverUnderCountErrorContent = (test1, respondentNames) => {
  inputState.showErrorMessageBar = true;
  inputState.errorMessage = `Q sort #${test1[2][0][1]} has too many or too few entries`;
  inputState.errorStackTrace = "Error in 'standardErrorChecks' function.";
  inputState.extendedErrorMessage = `Participant ${
    respondentNames[test1[2][0][1] - 1]
  } (Q sort #${
    test1[2][0][1]
  }) has a Q sort with an incorrect number of statement sort values. Check the Q sorts file and confirm the Q sort pattern input.`;
  inputState.isLoadCsvQsortsButtonGreen = false;
  inputState.isCsvDataErrorCheckButtonGreen = false;
  inputState.showDataImportSuccessMessage = false;
};

export default setOverUnderCountErrorContent;
