import state from "../../store";

export default function throwDataAlreadyLoadedInputErrorModal() {
  // catch input error
  state.setState({
    showErrorMessageBar: true,
    errorMessage: `Data are already loaded, click "Clear Project" to restart`,
    extendedErrorMessage: `Data have already been loaded and the analysis has started. To clear this analysis and restart the application, click the "Clear Project" button near the bottom of the navigation panel.`,
    errorStackTrace: "no stack trace available"
  });
  return null;
}
