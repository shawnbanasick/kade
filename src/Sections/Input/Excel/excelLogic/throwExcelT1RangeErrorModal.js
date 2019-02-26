import state from "../../../../store";

export default function throwNoSortsInputErrorModal() {
  console.log(JSON.stringify("throw called"));

  // catch input error
  state.setState({
    showErrorMessageBar: true,
    extendedErrorMessage: `Check the format of the file, clear the project, and try again.`,
    errorStackTrace: "no stack trace available",
    isDataButtonGreen: false,
    notifyDataUploadSuccess: false
  });
  return null;
}
