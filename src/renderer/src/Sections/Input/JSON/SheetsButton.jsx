import styled from 'styled-components';
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

    /*
    inputState.showSheetsInput = true;
    inputState.showFirebaseInput = false;
    inputState.showNetlifyInput = false;
    inputState.isShowSheetsInputButtonGreen = true;
    inputState.isShowFirebaseInputButtonGreen = false;
    inputState.isShowNetlifyInputButtonGreen = false;
    */
  };

  return (
    <TradButton
      as={GeneralButton}
      id="SheetsButton"
      $isActive={isActive}
      onClick={handleOnclick}
      disabled={isDisabled}
    >
      {t('Google Sheets')}
    </TradButton>
  );
};

export default SheetsButton;

const TradButton = styled.div`
  margin-left: 70px;
  margin-right: 5px;
`;
