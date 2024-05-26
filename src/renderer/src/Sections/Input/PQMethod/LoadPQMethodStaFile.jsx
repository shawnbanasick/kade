import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import numStatementsMatchErrorModal from '../ErrorChecking/numStatementsMatchErrorModal';
import coreState from '../../GlobalState/coreState';
import appState from '../../GlobalState/appState';
import inputState from '../../GlobalState/inputState';
import LoadButton from '../DemoData/LoadButton';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// const { dialog } = require('electron').remote;
// const fs = require('fs')
// const { remote } = require('electron');
// const mainWindow = remote.getCurrentWindow();

// import { app, BrowserWindow, dialog, ipcMain } from 'electron';

import { dialog, BrowserWindow } from 'electron';

const LoadTxtStatementFile = () => {
  const { t } = useTranslation();
  const updateStatements = coreState((state) => state.updateStatements);
  const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);
  const updateStatementsLoaded = inputState((state) => state.updateStatementsLoaded);
  // const areQsortsLoaded = inputState((state) => state.areQsortsLoaded);
  const updateIsLoadPqmethodTextButtonButtonGreen = inputState(
    (state) => state.updateIsLoadPqmethodTextButtonButtonGreen
  );
  const updateIsInputButtonGreen = appState((state) => state.updateIsInputButtonGreen);
  const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);
  const updateAreStatementsLoaded = inputState((state) => state.updateAreStatementsLoaded);

  // getState
  const isLoadPqmethodTextButtonButtonGreen = inputState(
    (state) => state.isLoadPqmethodTextButtonButtonGreen
  );

  const handleClick = async () => {
    let isNoError = true;

    const files = await dialog.showOpenDialog(BrowserWindow, {
      properties: ['openFile'],
      filters: [
        {
          name: 'STA',
          extensions: ['sta', 'STA'],
        },
      ],
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
      const areQsortsLoaded = inputState((state) => state.areQsortsLoaded);
      if (areQsortsLoaded) {
        const qSortPattern = coreState((state) => state.qSortPattern);
        if (qSortPattern.length !== lines2.length) {
          isNoError = false;
          numStatementsMatchErrorModal();
        } else {
          inputState.statementsLoaded = true;
        }
      }

      if (isNoError) {
        revertLoadButtonsColors('pqmethod');
        // update state
        updateStatements(lines2);
        updateStatementsLoaded(true);
        updateNotifyDataUploadSuccess(true);
        updateIsLoadPqmethodTextButtonButtonGreen(true);
        updateAreStatementsLoaded(true);

        updateIsInputButtonGreen(areQsortsLoaded);
        updateIsDataButtonGreen(areQsortsLoaded);
      }
    };
  };

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

export default LoadTxtStatementFile;

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
