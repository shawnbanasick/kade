import GeneralButton from './../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';

const SheetsButton = () => {
  const { t } = useTranslation();
  // getState
  const isActive = inputState((state) => state.isShowSheetsInputButtonGreen);
  const isDisabled = inputState((state) => state.disabledSheetsButton);
  const updateShowSheetsInput = inputState((state) => state.updateShowSheetsInput);
  const updateShowFirebaseInput = inputState((state) => state.updateShowFirebaseInput);
  const updateShowNetlifyInput = inputState((state) => state.updateShowNetlifyInput);
  const updateIsShowSheetsInputButtonGreen = inputState(
    (state) => state.updateIsShowSheetsInputButtonGreen
  );
  const updateIsShowFirebaseInputButtonGreen = inputState(
    (state) => state.updateIsShowFirebaseInputButtonGreen
  );
  const updateIsShowNetlifyInputButtonGreen = inputState(
    (state) => state.updateIsShowNetlifyInputButtonGreen
  );

  const handleOnclick = () => {
    updateShowSheetsInput(true);
    updateShowFirebaseInput(false);
    updateShowNetlifyInput(false);
    updateIsShowSheetsInputButtonGreen(true);
    updateIsShowFirebaseInputButtonGreen(false);
    updateIsShowNetlifyInputButtonGreen(false);
  };

  return (
    <GeneralButton
      id="SheetsButton"
      $isActive={isActive}
      onClick={handleOnclick}
      disabled={isDisabled}
      className="ml-[70px] mr-[5px]"
    >
      {t('Google Sheets')}
    </GeneralButton>
  );
};

export default SheetsButton;
