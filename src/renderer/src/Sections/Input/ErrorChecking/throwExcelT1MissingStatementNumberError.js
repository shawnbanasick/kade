import inputState from '../../GlobalState/inputState';
import appState from '../../GlobalState/appState';
import i18n from 'i18next';

export default function throwExcelT1MissingStatementNumberError(message) {
  let errorMessage;
  if (message) {
    errorMessage = message;
  } else {
    errorMessage = i18n.t('Missing Q sort data');
  }
  // catch input error
  inputState.setState({ showErrorMessageBar: true });
  inputState.setState({ errorMessage: errorMessage });
  inputState.setState({
    extendedErrorMessage: i18n.t('At least one of the Q sorts has a missing statement number'),
  });
  inputState.setState({ errorStackTrace: i18n.t('no stack trace available') });
  inputState.setState({ notifyDataUploadSuccess: false });
  appState.setState({ isDataButtonGreen: false });

  return null;
}
