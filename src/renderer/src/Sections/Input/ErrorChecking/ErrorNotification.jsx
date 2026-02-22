import ExtendedErrorModal from './ExtendedErrorModal';
import inputState from '../../GlobalState/inputState';
import { useTranslation } from 'react-i18next';
import GeneralButton from '../../../Utils/GeneralButton';

const ErrorNotification = () => {
  const { t } = useTranslation();
  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);
  const updateErrorStackTrace = inputState((state) => state.updateErrorStackTrace);
  const updateIsCsvDataErrorCheckButtonGreen = inputState(
    (state) => state.updateIsCsvDataErrorCheckButtonGreen
  );
  const updateShowDataImportSuccessMessage = inputState(
    (state) => state.updateShowDataImportSuccessMessage
  );

  const showErrorMessageBar = inputState((state) => state.showErrorMessageBar);
  const errorMessage = inputState((state) => state.errorMessage);
  const errorMessageString = `${t('Error')}:  ${errorMessage}`;

  const handleOnClick = () => {
    updateShowErrorMessageBar(false);
    updateErrorStackTrace(t('no stack trace available'));
    updateIsCsvDataErrorCheckButtonGreen(false);
    updateShowDataImportSuccessMessage(false);
  };

  if (showErrorMessageBar) {
    return (
      <div
        className="
          absolute flex items-center justify-between
          left-[155px] bottom-0 mb-[5px] z-[9999]
          w-[calc(100vw-188px)] h-[50px]
          bg-[rgba(255,102,102,0.8)]
          px-[10px]
          font-sans text-xl
          rounded
        "
      >
        <div>{errorMessageString}</div>
        <ExtendedErrorModal />
        <div>
          <GeneralButton className="wrapper1" onClick={handleOnClick}>
            {t('Close')}
          </GeneralButton>
        </div>
      </div>
    );
  }
  return null;
};

export default ErrorNotification;
