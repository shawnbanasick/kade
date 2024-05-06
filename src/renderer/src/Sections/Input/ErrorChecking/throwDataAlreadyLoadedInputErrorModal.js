import inputState from '../../GlobalState/inputState';
import i18n from 'i18next';

export default function throwDataAlreadyLoadedInputErrorModal() {
  // catch input error

  const trans1 = i18n.t('Data have already been loaded and the analysis has started');
  const trans2 = i18n.t('To clear this analysis and restart the application');
  const trans3 = i18n.t('click the Clear Project button near the bottom of the navigation panel');

  inputState.setState({ showErrorMessageBar: true });
  inputState.setState({
    errorMessage: i18n.t('Data are already loaded click Clear Project to restart'),
  });
  inputState.setState({ extendedErrorMessage: `${trans1}. ${trans2}, ${trans3}.` });
  inputState.setState({ errorStackTrace: i18n.t('no stack trace available') });

  return null;
}
