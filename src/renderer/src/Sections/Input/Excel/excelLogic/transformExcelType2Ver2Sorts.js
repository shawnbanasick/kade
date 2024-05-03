import checkUniqueParticipantName from "../../logic/checkUniqueParticipantNames";
import inputState from "../../../GlobalState/inputState";
import i18n from "i18next";

const transformExcelType2Ver2Sorts = (sortData, qSortPatternArray) => {
  let maxValue = Math.max(...qSortPatternArray);
  let minValue = Math.min(...qSortPatternArray);
  let matchValue = qSortPatternArray.length;
  let matchArray = [];
  let maxValueArray = [];
  let minValueArray = [];
  let nonNumericArray = [];
  let sortsArray = [];
  let namesArray = [];

  sortData[0].forEach(row => {
    let tempArray = [];
    row = row.split(",");
    if (row[0] !== "") {
      row.forEach((item, index) => {
        if (item !== "") {
          if (index > 0) {
            item = parseInt(item, 10);
            if (item > maxValue) {
              maxValueArray.push(row[0]);
            }
            if (item < minValue) {
              minValueArray.push(row[0]);
            }
            if (isNaN(item)) {
              nonNumericArray.push(row[0]);
            }
            tempArray.push(item);
          } else {
            namesArray.push(item);
          }
        }
      });
      if (tempArray.length !== matchValue) {
        matchArray.push(row[0]);
      }
      sortsArray.push(tempArray);
    }
  });

  if (maxValueArray.length > 0 || minValueArray.length > 0) {
    inputState.showWarningMessageBar = false;
    inputState.showErrorMessageBar = true;
    inputState.errorMessage = `${i18n.t(
      "There is a Q sort with values beyond the range of the Q sort design"
    )}`;
    inputState.errorStackTrace = i18n.t("no stack trace available");
    inputState.extendedErrorMessage = `${i18n.t(
      "Participants with a value beyond the range of the Q sort design"
    )}: ${maxValueArray.join(", ")} ${minValueArray.join(", ")}.`;
    inputState.isLoadZipButtonGreen = false;
    inputState.isCsvDataErrorCheckButtonGreen = false;
    inputState.showDataImportSuccessMessage = false;

    throw new Error("Q sort values outside allowed range");
  }
  if (nonNumericArray.length > 0) {
    inputState.showWarningMessageBar = false;
    inputState.showErrorMessageBar = true;
    inputState.errorMessage = `${i18n.t(
      "The Q sorts contain a non-numeric value"
    )}`;
    inputState.errorStackTrace = i18n.t("no stack trace available");
    inputState.extendedErrorMessage = `${i18n.t(
      "Check the Q sort data for non-numeric values"
    )}: ${nonNumericArray.join(", ")}.`;
    inputState.isLoadZipButtonGreen = false;
    inputState.isCsvDataErrorCheckButtonGreen = false;
    inputState.showDataImportSuccessMessage = false;

    throw new Error("Q sort values non-numeric");
  }
  namesArray = checkUniqueParticipantName(namesArray);
  return { sortsArray, namesArray };
};

export default transformExcelType2Ver2Sorts;
