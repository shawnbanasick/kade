import inputState from '../GlobalState/inputState';
import appState from '../GlobalState/appState';
import i18n from 'i18next';

export default function inputDataErrorMessage(message, explanation) {
  // catch input error
  inputState.setState({ showErrorMessageBar: true });
  inputState.setState({ errorMessage: message });
  inputState.setState({ extendedErrorMessage: explanation });
  inputState.setState({ errorStackTrace: i18n.t('no stack trace available') });
  appState.setState({ isDataButtonGreen: false });

  return null;
}
