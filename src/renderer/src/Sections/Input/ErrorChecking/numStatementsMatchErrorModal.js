import inputState from '../../GlobalState/inputState';
import appState from '../../GlobalState/appState';
import i18n from 'i18next';

export default function numStatementsMatchErrorModal(message) {
  let errorMessage;
  if (message) {
    errorMessage = message;
  } else {
    errorMessage = i18n.t("The number of statements doesn't match the Q sort design");
  }
  // catch input error
  inputState.setState({ showErrorMessageBar: true });
  inputState.setState({ errorMessage: errorMessage });
  inputState.setState({
    extendedErrorMessage: i18n.t('Check the format of the file and try again'),
  });
  inputState.setState({ errorStackTrace: i18n.t('no stack trace available') });
  inputState.setState({ notifyDataUploadSuccess: false });
  appState.setState({ isDataButtonGreen: false });
  return null;
}
