import React from 'react';
import { view } from '@risingstack/react-easy-state';
import uploadBuzzwordData from './uploadBuzzwordData';
import revertLoadButtonsColors from './revertLoadButtonsColors';
import LoadButton from './LoadButton';
import inputState from '../../GlobalState/inputState';
import getInputState from '../../GlobalState/getInputState';
import appState from '../../GlobalState/appState';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import styled from 'styled-components';

const handleClick = () => {
  const message1 = i18n.t('Data are already loaded click Clear Project to restart');
  const message2 = i18n.t('Data have already been loaded and the analysis has started');
  const message3 = i18n.t('To clear this analysis and restart the application');
  const message4 = i18n.t('click the Clear Project button near the bottom of the navigation panel');
  const message5 = i18n.t('no stack trace available');

  const isDataAlreadyLoaded = getInputState('isDataAlreadyLoaded');
  if (isDataAlreadyLoaded) {
    inputState.errorMessage = message1;
    inputState.extendedErrorMessage = `${message2}${message3}${message4}`;
    inputState.errorStackTrace = message5;
    inputState.showErrorMessageBar = true;
  } else {
    uploadBuzzwordData();
    revertLoadButtonsColors();
    inputState.isLoadBuzzwordsButtonGreen = true;
    inputState.notifyDataUploadSuccess = true;
    inputState.areStatementsLoaded = true;
    inputState.areQsortsLoaded = true;
    appState.isInputButtonGreen = true;
    appState.isDataButtonGreen = true;
    inputState.isDataAlreadyLoaded = true;
  }
};

const BuzzwordButton1 = () => {
  const { t } = useTranslation();

  const isLoadBuzzwordsButtonGreen = getInputState('isLoadBuzzwordsButtonGreen');
  return (
    <LoadButton
      id="buzzwordButton"
      floated="right"
      onClick={handleClick}
      isActive={isLoadBuzzwordsButtonGreen}
    >
      <LineContainer>
        <SvgContainer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </SvgContainer>

        {t('Load Buzzwords')}
      </LineContainer>
    </LoadButton>
  );
};

export default view(BuzzwordButton1);

const SvgContainer = styled.svg`
  transform: rotate(180deg);
  margin-right: 20px;
  height: 17px;
  width: 17px;
  fill: currentColor;
`;

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
