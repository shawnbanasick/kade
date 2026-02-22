import inputState from '../../GlobalState/inputState';
import { useTranslation } from 'react-i18next';
import GeneralButton from '../../../Utils/GeneralButton';

const WarningNotification = () => {
  const { t } = useTranslation();

  const showWarningMessageBar = inputState((state) => state.showWarningMessageBar);
  const errorMessage = inputState((state) => state.errorMessage);
  const errorMessageString = `${t('Warning')}:  ${errorMessage}`;
  const updateShowWarningMessageBar = inputState((state) => state.updateShowWarningMessageBar);
  const updateErrorStackTrace = inputState((state) => state.updateErrorStackTrace);
  const updateIsCsvDataErrorCheckButtonGreen = inputState(
    (state) => state.updateIsCsvDataErrorCheckButtonGreen
  );
  const updateShowDataImportSuccessMessage = inputState(
    (state) => state.updateShowDataImportSuccessMessage
  );

  const handleOnClick = () => {
    updateShowWarningMessageBar(false);
    updateErrorStackTrace(t('no stack trace available'));
    updateIsCsvDataErrorCheckButtonGreen(false);
    updateShowDataImportSuccessMessage(false);
  };

  if (showWarningMessageBar) {
    return (
      <div
        className="
          absolute flex items-center justify-between
          left-[155px] bottom-0 mb-[5px] z-[9999]
          w-[calc(100vw-188px)] h-[50px]
          bg-[yellow]
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

export default WarningNotification;
