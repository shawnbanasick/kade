import state from "../../store";

export default function inputDataErrorMessage(message, explanation) {
  // catch input error
  state.setState({
    showErrorMessageBar: true,
    errorMessage: message,
    extendedErrorMessage: explanation,
    errorStackTrace: "no stack trace available",
    isDataButtonGreen: false
  });
  return null;
}
