import styled from 'styled-components';
import GeneralButton from './../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import getInputState from '../../GlobalState/getInputState';
import inputState from '../../GlobalState/inputState';

const SheetsButton = () => {
  const { t } = useTranslation();
  const handleOnclick = () => {
    inputState.showSheetsInput = false;
    inputState.showNetlifyInput = true;
    inputState.showFirebaseInput = false;
    inputState.isShowSheetsInputButtonGreen = false;
    inputState.isShowFirebaseInputButtonGreen = false;
    inputState.isShowNetlifyInputButtonGreen = true;
  };

  // getState
  const isActive = getInputState('isShowNetlifyInputButtonGreen');
  const isDisabled = getInputState('disabledNetlifyButton');

  return (
    <TradButton
      as={GeneralButton}
      id="NetlifyButton"
      isActive={isActive}
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
