import inputState from "../../GlobalState/inputState";
import i18n from "i18next";

const checkForIncorrectQsortPattern = (
  testSortArray,
  qSortPattern,
  numStatements
) => {
  let passesTest = true;
  let totalQsorts = qSortPattern.length;

  if (totalQsorts !== numStatements) {
    passesTest = false;
    inputState.showWarningMessageBar = false;
    inputState.showErrorMessageBar = true;
    inputState.errorMessage = i18n.t(
      "The Q sort pattern input or number of statements is incorrect"
    );
    inputState.errorStackTrace = i18n.t(
      "Error in 'standardErrorChecks' function"
    );
    inputState.extendedErrorMessage = i18n.t(
      "Check the statements input and the Q sort pattern data"
    );
    inputState.isLoadZipButtonGreen = false;
    inputState.isCsvDataErrorCheckButtonGreen = false;
    inputState.showDataImportSuccessMessage = false;
  }
  return passesTest;
};

export default checkForIncorrectQsortPattern;
