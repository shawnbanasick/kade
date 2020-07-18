import appState from "../../../GlobalState/appState";
import inputState from "../../../GlobalState/inputState";
import i18n from "i18next";

export default function throwNoSortsInputErrorModal() {
  console.log(JSON.stringify("throw called"));

  // catch input error
  appState.showErrorMessageBar = true;
  appState.extendedErrorMessage = i18n.t(
    "Check the format of the file and try again"
  );
  appState.errorStackTrace = i18n.t("no stack trace available");
  appState.isDataButtonGreen = false;
  inputState.notifyDataUploadSuccess = false;
  return null;
}
