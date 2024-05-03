import React from 'react';
import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
import GeneralButton from './../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import getInputState from '../../GlobalState/getInputState';
import inputState from '../../GlobalState/inputState';

const handleOnclick = () => {
  inputState.showSheetsInput = false;
  inputState.showNetlifyInput = true;
  inputState.showFirebaseInput = false;
  inputState.isShowSheetsInputButtonGreen = false;
  inputState.isShowFirebaseInputButtonGreen = false;
  inputState.isShowNetlifyInputButtonGreen = true;
};

const SheetsButton = () => {
  const { t } = useTranslation();

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

export default view(SheetsButton);

const TradButton = styled.div`
  min-width: 120px;
  margin-left: 70px;
  margin-right: 5px;
`;
