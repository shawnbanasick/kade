import GeneralButton from './../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';

const SheetsButton = () => {
  const { t } = useTranslation();
  // getState
  const isActive = inputState((state) => state.isShowNetlifyInputButtonGreen);
  const isDisabled = inputState((state) => state.disabledNetlifyButton);
  const updateShowSheetsInput = inputState((state) => state.updateShowSheetsInput);
  const updateShowNetlifyInput = inputState((state) => state.updateShowNetlifyInput);
  const updateShowFirebaseInput = inputState((state) => state.updateShowFirebaseInput);
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
    updateShowSheetsInput(false);
    updateShowNetlifyInput(true);
    updateShowFirebaseInput(false);
    updateIsShowSheetsInputButtonGreen(false);
    updateIsShowFirebaseInputButtonGreen(false);
    updateIsShowNetlifyInputButtonGreen(true);

    /*
    inputState.showSheetsInput = false;
    inputState.showNetlifyInput = true;
    inputState.showFirebaseInput = false;
    inputState.isShowSheetsInputButtonGreen = false;
    inputState.isShowFirebaseInputButtonGreen = false;
    inputState.isShowNetlifyInputButtonGreen = true;
    */
  };

  return (
    <GeneralButton
      id="NetlifyButton"
      $isActive={isActive}
      onClick={handleOnclick}
      disabled={isDisabled}
      className="min-w-[120px] ml-[70px] mr-[5px]"
    >
      {t('Netlify')}
    </GeneralButton>
  );
};

export default SheetsButton;
