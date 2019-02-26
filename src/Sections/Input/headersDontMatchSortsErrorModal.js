import state from "../../store";

export default function throwNoSortsInputErrorModal(message) {
  let errorMessage;
  if (message) {
    errorMessage = message;
  } else {
    errorMessage = `Number of participant names doesn't match number of sorts`;
  }
  // catch input error
  state.setState({
    showErrorMessageBar: true,
    errorMessage,
    extendedErrorMessage: `Check the format of the file and try again.`,
    errorStackTrace: "no stack trace available",
    isDataButtonGreen: false,
    notifyDataUploadSuccess: false
  });
  return null;
}
