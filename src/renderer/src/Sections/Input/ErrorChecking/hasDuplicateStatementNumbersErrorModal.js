import inputState from '../../GlobalState/inputState';
import appState from '../../GlobalState/appState';
import i18n from 'i18next';

const trans1 = i18n.t('The Q sort may have duplicate numbers or non-numeric characters');
const trans2 = i18n.t('Check the format of the file and try again');
const trans3 = i18n.t('no stack trace available');

export default function hasDuplicateStatementNumbersErrorModal() {
  inputState.setState({ showErrorMessageBar: true });
  inputState.setState({ extendedErrorMessage: `${trans1}. ${trans2}.` });
  inputState.setState({ errorStackTrace: trans3 });
  inputState.setState({ notifyDataUploadSuccess: false });
  appState.setState({ isDataButtonGreen: false });

  return null;
}
