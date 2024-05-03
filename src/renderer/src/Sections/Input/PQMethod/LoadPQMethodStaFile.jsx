import { view } from '@risingstack/react-easy-state';
import React from 'react';
import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import numStatementsMatchErrorModal from '../ErrorChecking/numStatementsMatchErrorModal';
import coreState from '../../GlobalState/coreState';
import appState from '../../GlobalState/appState';
import inputState from '../../GlobalState/inputState';
import LoadButton from '../DemoData/LoadButton';
import { useTranslation } from 'react-i18next';
import getInputState from '../../GlobalState/getInputState';
import getCoreState from '../../GlobalState/getCoreState';
import styled from 'styled-components';

const { dialog } = require('electron').remote;
const fs = require('fs');
const { remote } = require('electron');
const mainWindow = remote.getCurrentWindow();

const handleClick = async () => {
  let isNoError = true;

  const files = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      {
        name: 'STA',
        extensions: ['sta', 'STA']
      }
    ]
  });

  const path = files.filePaths[0];

  // dialog cancelled case
  if (path === undefined) {
    return;
  }

  fs.readFile(path, 'utf8', (error, data) => {
    if (error != null) {
      // alert("file open error.");
      console.log('file open error');
      return;
    }
    processBlob(data.toString());
  });

  const processBlob = (data) => {
    // split into lines
    const lines = data.split(/[\r\n]+/g);
    // remove empty strings
    const lines2 = lines.filter((e) => e === 0 || e);

    // getState
    const areQsortsLoaded = getInputState('areQsortsLoaded');
    if (areQsortsLoaded) {
      const qSortPattern = getCoreState('qSortPattern');
      if (qSortPattern.length !== lines2.length) {
        isNoError = false;
        numStatementsMatchErrorModal();
      } else {
        inputState.statementsLoaded = true;
      }
    }

    if (isNoError) {
      coreState.statements = lines2;
      inputState.statementsLoaded = true;

      revertLoadButtonsColors('pqmethod');
      inputState.notifyDataUploadSuccess = true;
      inputState.areStatementsLoaded = true;
      inputState.isLoadPqmethodTextButtonButtonGreen = true;
      const areQsortsLoaded = getInputState('areQsortsLoaded');
      appState.isInputButtonGreen = areQsortsLoaded;
      appState.isDataButtonGreen = areQsortsLoaded;
    }
  };
};

const LoadTxtStatementFile = () => {
  const { t } = useTranslation();

  // getState
  const isLoadPqmethodTextButtonButtonGreen = getInputState('isLoadPqmethodTextButtonButtonGreen');

  return (
    <LoadButton isActive={isLoadPqmethodTextButtonButtonGreen} onClick={() => handleClick()}>
      <LineContainer>
        <SvgContainer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </SvgContainer>
        <p>{t('Load STA File')}</p>
      </LineContainer>
    </LoadButton>
  );
};

export default view(LoadTxtStatementFile);

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
