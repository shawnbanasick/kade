import inputState from '../../GlobalState/inputState';
import appState from '../../GlobalState/appState';
import i18n from 'i18next';

export default function throwNoSortsInputErrorModal(message) {
  let errorMessage;
  if (message) {
    errorMessage = message;
  } else {
    errorMessage = i18n.t("Number of participant names doesn't match number of sorts");
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
