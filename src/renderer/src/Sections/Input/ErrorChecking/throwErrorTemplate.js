import inputState from "../../GlobalState/inputState";
import appState from "../../GlobalState/appState";
import i18n from "i18next";

export default function throwNoSortsInputErrorModal(
  message,
  extendedErrorMessage,
  errorStackTrace
) {
  let errorMessage;
  if (message) {
    errorMessage = message;
  } else {
    errorMessage = i18n.t(
      "There was import error - check the file and try again"
    );
  }
  // catch input error
  inputState.showErrorMessageBar = true;
  inputState.errorMessage = errorMessage;
  inputState.extendedErrorMessage = i18n.t(extendedErrorMessage);
  inputState.errorStackTrace = i18n.t(errorStackTrace);
  inputState.notifyDataUploadSuccess = false;
  appState.isDataButtonGreen = false;
  return null;
}
