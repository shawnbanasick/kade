import inputState from "../../GlobalState/inputState";
import i18n from "i18next";

const checkForNan = testSortArray => {
  let passesTest = true;

  testSortArray.forEach((item, index) => {
    item.forEach((value, index) => {
      if (isNaN(value)) {
        passesTest = false;
        inputState.showWarningMessageBar = false;
        inputState.showErrorMessageBar = true;
        inputState.errorMessage = i18n.t(
          "The Q sorts contain a non-numeric value"
        );
        inputState.errorStackTrace = i18n.t(
          "Error in 'standardErrorChecks' function"
        );
        inputState.extendedErrorMessage = i18n.t(
          "Check the Q sort data for non-numeric values"
        );
        inputState.isLoadZipButtonGreen = false;
        inputState.isCsvDataErrorCheckButtonGreen = false;
        inputState.showDataImportSuccessMessage = false;
      }
    });
  });

  return passesTest;
};

export default checkForNan;
