import React from 'react';
import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
import GeneralButton from './../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import getInputState from '../../GlobalState/getInputState';
import inputState from '../../GlobalState/inputState';

const FirebaseButton = () => {
  const { t } = useTranslation();

  const handleOnclick = () => {
    inputState.showSheetsInput = false;
    inputState.showFirebaseInput = true;
    inputState.showNetlifyInput = false;
    inputState.isShowFirebaseInputButtonGreen = true;
    inputState.isShowSheetsInputButtonGreen = false;
    inputState.isShowNetlifyInputButtonGreen = false;
  };

  // getState
  const isActive = getInputState('isShowFirebaseInputButtonGreen');
  const isDisabled = getInputState('disabledFirebaseButton');

  return (
    <TradButton
      as={GeneralButton}
      id="FirebaseButton"
      isActive={isActive}
      onClick={handleOnclick}
      disabled={isDisabled}
    >
      {t('Firebase or Local Data')}
    </TradButton>
  );
};

export default view(FirebaseButton);

const TradButton = styled.div`
  margin-left: 70px;
  margin-right: 5px;
`;
