import inputState from "../../GlobalState/inputState";
import appState from "../../GlobalState/appState";
import i18n from "i18next";

export default function throwNoStatementsInputErrorModal() {
  // catch input error
  inputState.showErrorMessageBar = true;
  inputState.errorMessage = i18n.t("Cant find the sorts tab in the XLSX File");
  inputState.extendedErrorMessage = i18n.t(
    "Check the format of the file and try again"
  );
  inputState.errorStackTrace = i18n.t("no stack trace available");
  inputState.notifyDataUploadSuccess = false;
  appState.isDataButtonGreen = false;

  return null;
}
