import inputState from "../../GlobalState/inputState";
import i18n from "i18next";

const checkForIncorrectLengths = (
  testSortArray,
  numStatements,
  qSortPattern,
  respondentNames
) => {
  let passesTest = true;
  let errorOverArray = [];
  let errorUnderArray = [];
  testSortArray.forEach((item, index) => {
    if (item.length > qSortPattern.length) {
      errorOverArray.push([respondentNames[index]]);
    } else if (item.length < qSortPattern.length) {
      errorUnderArray.push([respondentNames[index]]);
    }
  });

  if (
    errorOverArray.length === respondentNames.length ||
    errorUnderArray.length === respondentNames.length
  ) {
    passesTest = false;
    inputState.showErrorMessageBar = true;
    inputState.errorMessage = i18n.t("The Q sort pattern input is incorrect");
    inputState.errorStackTrace = i18n.t(
      "Error in 'standardErrorChecks' function"
    );
    inputState.extendedErrorMessage = i18n.t(
      "Check the Q sorts and Q sort pattern data"
    );
    inputState.isLoadZipButtonGreen = false;
    inputState.isCsvDataErrorCheckButtonGreen = false;
    inputState.showDataImportSuccessMessage = false;
  }

  if (errorOverArray.length > 0) {
    passesTest = false;
    inputState.showErrorMessageBar = true;
    inputState.errorMessage = i18n.t(
      "There is a Q sort with too many Q sort values"
    );
    inputState.errorStackTrace = i18n.t(
      "Error in 'standardErrorChecks' function"
    );
    inputState.extendedErrorMessage = `${i18n.t(
      "Participants with an incorrect number of values"
    )} ${errorOverArray.join(", ")}. ${i18n.t(
      "Check the Q sorts and Q sort pattern data"
    )}`;
    inputState.isLoadZipButtonGreen = false;
    inputState.isCsvDataErrorCheckButtonGreen = false;
    inputState.showDataImportSuccessMessage = false;
  }

  if (errorUnderArray.length > 0) {
    passesTest = false;
    inputState.showErrorMessageBar = true;
    inputState.errorMessage = i18n.t(
      "There is a Q sort with missing Q sort values"
    );
    inputState.errorStackTrace = i18n.t(
      "Error in 'standardErrorChecks' function"
    );
    inputState.extendedErrorMessage = `${i18n.t(
      "Participants with an incorrect number of values"
    )} ${errorUnderArray.join(",")}.
     \n\n  ${i18n.t("Check the Q sorts and Q sort pattern data")}.`;
    inputState.isLoadZipButtonGreen = false;
    inputState.isCsvDataErrorCheckButtonGreen = false;
    inputState.showDataImportSuccessMessage = false;
  }

  if (numStatements !== qSortPattern.length) {
    passesTest = false;
    inputState.showErrorMessageBar = true;
    inputState.errorMessage = i18n.t(
      "The Q sort pattern input data or number of statements is incorrect"
    );
    inputState.errorStackTrace = i18n.t(
      "Error in 'standardErrorChecks' function"
    );
    inputState.extendedErrorMessage = i18n.t(
      "Check the Q sort pattern and statements data"
    );
    inputState.isLoadZipButtonGreen = false;
    inputState.isCsvDataErrorCheckButtonGreen = false;
    inputState.showDataImportSuccessMessage = false;
  }

  return passesTest;
};

export default checkForIncorrectLengths;
