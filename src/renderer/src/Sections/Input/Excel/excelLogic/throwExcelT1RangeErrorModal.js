import appState from '../../../GlobalState/appState';
import inputState from '../../../GlobalState/inputState';
import i18n from 'i18next';

export default function throwNoSortsInputErrorModal() {
  console.log(JSON.stringify('throw called'));
  appState.setState({ showErrorMessageBar: true });
  appState.setState({ extendedErrorMessage: i18n.t('Check the format of the file and try again') });
  appState.setState({ errorStackTrace: i18n.t('no stack trace available') });
  appState.setState({ isDataButtonGreen: false });
  inputState.setState({ notifyDataUploadSuccess: false });
  return null;
}
