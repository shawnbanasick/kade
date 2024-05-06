import inputState from '../../GlobalState/inputState';
import i18n from 'i18next';

export default function throwNoStatementsInputErrorModal() {
  // catch input error
  inputState.setState({ showErrorMessageBar: true });
  inputState.setState({ errorMessage: i18n.t('Cant find the statements tab in the Excel File') });
  inputState.setState({
    extendedErrorMessage: i18n.t('Check the format of the Excel file and try again'),
  });
  inputState.setState({ errorStackTrace: i18n.t('no stack trace available') });

  return null;
}
