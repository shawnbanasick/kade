import inputState from "../../GlobalState/inputState";
import i18n from "i18next";

const checkForOutOfRangeValues2 = (
  testSortArray,
  min,
  max,
  respondentNames
) => {
  let passesTest = true;
  let errorNameArray = [];
  testSortArray.forEach((item, index) => {
    const itemMax = Math.max(...item);
    const itemMin = Math.min(...item);
    if (itemMax > max || itemMin < min) {
      errorNameArray.push([respondentNames[index]]);
    }
  });

  if (errorNameArray.length > 0) {
    passesTest = false;
    inputState.showErrorMessageBar = true;
    inputState.errorMessage = i18n.t(
      "There is a Q sort with values beyond the range of the Q sort design"
    );
    inputState.errorStackTrace = i18n.t(
      "Error in 'standardErrorChecks' function"
    );
    inputState.extendedErrorMessage = `${i18n.t(
      "Participants with a value beyond the range of the Q sort design"
    )} ${errorNameArray.join(",")}. \n\n  ${i18n.t(
      "Check the Q sorts file and Q sort pattern"
    )}`;
    inputState.isLoadZipButtonGreen = false;
    inputState.isCsvDataErrorCheckButtonGreen = false;
    inputState.showDataImportSuccessMessage = false;
  }
  return passesTest;
};

export default checkForOutOfRangeValues2;
