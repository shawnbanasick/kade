import appState from '../../../GlobalState/appState';
import inputState from '../../../GlobalState/inputState';
import i18n from 'i18next';

export default function throwNoSortsInputErrorModal() {
  console.log(JSON.stringify('throw called'));

  // catch input error
  const updateShowErrorMessageBar = appState((state) => state.updateShowErrorMessageBar);
  const updateExtendedErrorMessage = appState((state) => state.updateExtendedErrorMessage);
  const updateErrorStackTrace = appState((state) => state.updateErrorStackTrace);
  const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);
  const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);

  updateShowErrorMessageBar(true);
  updateExtendedErrorMessage(i18n.t('Check the format of the file and try again'));
  updateErrorStackTrace(i18n.t('no stack trace available'));
  updateIsDataButtonGreen(false);
  updateNotifyDataUploadSuccess(false);

  /*
  appState.showErrorMessageBar = true;
  appState.extendedErrorMessage = i18n.t('Check the format of the file and try again');
  appState.errorStackTrace = i18n.t('no stack trace available');
  appState.isDataButtonGreen = false;
  inputState.notifyDataUploadSuccess = false;
  */
  return null;
}
