import React from 'react';
import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
import GeneralButton from './../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import getInputState from '../../GlobalState/getInputState';
import inputState from '../../GlobalState/inputState';

const handleOnclick = () => {
  inputState.showSheetsInput = true;
  inputState.showFirebaseInput = false;
  inputState.showNetlifyInput = false;
  inputState.isShowSheetsInputButtonGreen = true;
  inputState.isShowFirebaseInputButtonGreen = false;
  inputState.isShowNetlifyInputButtonGreen = false;
};

const SheetsButton = () => {
  const { t } = useTranslation();

  // getState
  const isActive = getInputState('isShowSheetsInputButtonGreen');
  const isDisabled = getInputState('disabledSheetsButton');

  return (
    <TradButton
      as={GeneralButton}
      id="SheetsButton"
      isActive={isActive}
      onClick={handleOnclick}
      disabled={isDisabled}
    >
      {t('Google Sheets')}
    </TradButton>
  );
};

export default view(SheetsButton);

const TradButton = styled.div`
  margin-left: 70px;
  margin-right: 5px;
`;
