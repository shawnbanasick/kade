import state from "../../../../store";

export default function throwNoSortsInputErrorModal(message) {
  // catch input error
  state.setState({
    showErrorMessageBar: true,
    errorMessage: message,
    extendedErrorMessage: `Check the format of the file, clear the project, and try again.`,
    errorStackTrace: "no stack trace available",
    isDataButtonGreen: false,
    notifyDataUploadSuccess: false
  });
  return null;
}
