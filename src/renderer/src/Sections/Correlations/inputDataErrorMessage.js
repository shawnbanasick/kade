import inputState from "../GlobalState/inputState";
import appState from "../GlobalState/appState";
import i18n from 'i18next';

export default function inputDataErrorMessage(message, explanation) {
  // catch input error
  inputState.showErrorMessageBar = true;
  inputState.errorMessage = message;
  inputState.extendedErrorMessage = explanation;
  inputState.errorStackTrace = i18n.t("no stack trace available");
  appState.isDataButtonGreen = false;

  return null;
}

