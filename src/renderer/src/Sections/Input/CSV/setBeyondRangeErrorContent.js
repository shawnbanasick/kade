import inputState from "../../GlobalState/inputState";

const setBeyondRangeErrorContent = (test1, respondentNames) => {
  inputState.showErrorMessageBar = true;
  inputState.errorMessage = `There was a value that was beyond the sort range in Q sort #${test1[1][0][1]}`;
  inputState.errorStackTrace = "Error in 'standardErrorChecks' function.";
  inputState.extendedErrorMessage = `Participant ${
    respondentNames[test1[1][0][1] - 1]
  } (Q sort #${
    test1[1][0][1]
  }) has a Q sort value that is beyond the range indicated in the Q sort pattern. Check the Q sorts file and confirm the Q sort pattern input.`;
  inputState.isLoadCsvQsortsButtonGreen = false;
  inputState.isCsvDataErrorCheckButtonGreen = false;
  inputState.showDataImportSuccessMessage = false;
};

export default setBeyondRangeErrorContent;
