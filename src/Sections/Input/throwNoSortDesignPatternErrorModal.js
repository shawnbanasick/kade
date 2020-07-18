import inputState from "../GlobalState/inputState";
import appState from "../GlobalState/appState";
import i18n from "i18next";

export default function throwNoSortDesignErrorModal(message) {
  let errorMessage;
  if (message) {
    errorMessage = message;
  } else {
    errorMessage = i18n.t("Cant find the Q Sort Design in the Excel File");
  }
  // catch input error
  inputState.showErrorMessageBar = true;
  inputState.errorMessage = errorMessage;
  inputState.extendedErrorMessage = i18n.t(
    "Check the format of the file and try again"
  );
  inputState.errorStackTrace = i18n.t("no stack trace available");
  inputState.notifyDataUploadSuccess = false;
  appState.isDataButtonGreen = false;

  return null;
}
