import styled from 'styled-components';
import GeneralButton from './../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';

const SheetsButton = () => {
  const { t } = useTranslation();
  // getState
  const isActive = getInputState('isShowNetlifyInputButtonGreen');
  const isDisabled = getInputState('disabledNetlifyButton');
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
    <TradButton
      as={GeneralButton}
      id="NetlifyButton"
      $isActive={isActive}
      onClick={handleOnclick}
      disabled={isDisabled}
    >
      {t('Netlify')}
    </TradButton>
  );
};

export default SheetsButton;

const TradButton = styled.div`
  min-width: 120px;
  margin-left: 70px;
  margin-right: 5px;
`;
