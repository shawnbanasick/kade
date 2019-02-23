import state from "../../store";

export default function throwNoStatementsInputErrorModal(message) {
  let errorMessage;
  if (message.length > 0) {
    errorMessage = message;
  } else {
    errorMessage = `Can't find any statements on the "statements" tab in the Excel File`;
  }
  // catch input error
  state.setState({
    showErrorMessageBar: true,
    errorMessage,
    extendedErrorMessage: `Check the format of the Excel file and try again.`,
    errorStackTrace: "no stack trace available",
    isDataButtonGreen: false,
    notifyDataUploadSuccess: false
  });
  return null;
}
