import React from 'react';
import { view } from '@risingstack/react-easy-state';
import uploadMotivationalData from './uploadMotivationalData';
import revertLoadButtonsColors from './revertLoadButtonsColors';
import LoadButton from './LoadButton';
import inputState from '../../GlobalState/inputState.js';
import getInputState from '../../GlobalState/getInputState.js';
import appState from '../../GlobalState/appState';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import styled from 'styled-components';

const handleClick = () => {
  const isDataAlreadyLoaded = getInputState('isDataAlreadyLoaded');
  const trans1 = i18n.t('Data have already been loaded and the analysis has started');
  const trans2 = i18n.t('To clear this analysis and restart the application');
  const trans3 = i18n.t('click the Clear Project button near the bottom of the navigation panel');

  if (isDataAlreadyLoaded) {
    inputState.showErrorMessageBar = true;
    inputState.showErrorMessageBar = true;
    inputState.errorMessage = i18n.t('Data are already loaded click Clear Project to restart');
    inputState.extendedErrorMessage = `${trans1}. ${trans2}, ${trans3}.`;
    inputState.errorStackTrace = i18n.t('no stack trace available');
  } else {
    uploadMotivationalData();
    revertLoadButtonsColors();
    inputState.isLoadMotivationalButtonGreen = true;
    inputState.notifyDataUploadSuccess = true;
    inputState.areStatementsLoaded = true;
    inputState.areQsortsLoaded = true;
    appState.isInputButtonGreen = true;
    appState.isDataButtonGreen = true;
    inputState.isDataAlreadyLoaded = true;
  }
};

const MotivationalButton1 = () => {
  const { t } = useTranslation();

  const isLoadMotivationalButtonGreen = inputState.isLoadMotivationalButtonGreen;
  return (
    <div>
      <LoadButton
        id="motivationalButton"
        floated="right"
        onClick={handleClick}
        isActive={isLoadMotivationalButtonGreen}
      >
        <LineContainer>
          <SvgContainer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </SvgContainer>
          {t('Load Motivational')}
        </LineContainer>
      </LoadButton>
    </div>
  );
};

export default view(MotivationalButton1);

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
