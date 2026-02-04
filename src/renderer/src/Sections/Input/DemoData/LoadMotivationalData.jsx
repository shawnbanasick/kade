import uploadMotivationalData from './uploadMotivationalData';
import revertLoadButtonsColors from './revertLoadButtonsColors';
import NewLoadButton from '../../../Utils/NewLoadButton';
import inputState from '../../GlobalState/inputState.js';
import appState from '../../GlobalState/appState';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

const MotivationalButton1 = () => {
  const { t } = useTranslation();
  const isLoadMotivationalButtonGreen = inputState((state) => state.isLoadMotivationalButtonGreen);
  const isDataAlreadyLoaded = inputState((state) => state.isDataAlreadyLoaded);

  const trans1 = i18n.t('Data have already been loaded and the analysis has started');
  const trans2 = i18n.t('To clear this analysis and restart the application');
  const trans3 = i18n.t('click the Clear Project button near the bottom of the navigation panel');

  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);
  const updateErrorMessage = inputState((state) => state.updateErrorMessage);
  const updateExtendedErrorMessage = inputState((state) => state.updateExtendedErrorMessage);
  const updateErrorStackTrace = inputState((state) => state.updateErrorStackTrace);
  const updateIsLoadMotivationalButtonGreen = inputState(
    (state) => state.updateIsLoadMotivationalButtonGreen
  );
  const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);
  const updateAreStatementsLoaded = inputState((state) => state.updateAreStatementsLoaded);
  const updateAreQsortsLoaded = inputState((state) => state.updateAreQsortsLoaded);
  const updateIsInputButtonGreen = appState((state) => state.updateIsInputButtonGreen);
  const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);
  const updateIsDataAlreadyLoaded = inputState((state) => state.updateIsDataAlreadyLoaded);

  const handleClick = () => {
    console.log('isDataAlreadyLoaded', isDataAlreadyLoaded);
    if (isDataAlreadyLoaded) {
      updateShowErrorMessageBar(true);
      updateErrorMessage(i18n.t('Data are already loaded click Clear Project to restart'));
      updateExtendedErrorMessage(`${trans1}. ${trans2}, ${trans3}.`);
      updateErrorStackTrace(i18n.t('no stack trace available'));
    } else {
      uploadMotivationalData();
      revertLoadButtonsColors();
      console.log('isDataAlreadyLoaded', isDataAlreadyLoaded);

      updateNotifyDataUploadSuccess(true);
      updateAreStatementsLoaded(true);
      updateAreQsortsLoaded(true);
      updateIsInputButtonGreen(true);
      updateIsDataButtonGreen(true);
      updateIsDataAlreadyLoaded(true);
      updateIsLoadMotivationalButtonGreen(true);
    }
  };

  console.log('isLoadMotivationalButtonGreen', isLoadMotivationalButtonGreen);

  return (
    <div>
      <NewLoadButton
        id="motivationalButton"
        className={`${isLoadMotivationalButtonGreen ? 'bg-primary-button' : 'bg-grey-button'}`}
        floated="right"
        onClick={handleClick}
      >
        <div className="flex flex-row justify-center items-center h-full w-full gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="rotate-180 mr-5 h-[17px] w-[17px] fill-current"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <div className="ml-5 font-sans text-lg font-bold">{t('Load Motivational')}</div>
        </div>
      </NewLoadButton>
    </div>
  );
};

export default MotivationalButton1;
