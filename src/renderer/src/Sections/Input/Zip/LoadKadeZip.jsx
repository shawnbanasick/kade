import React from 'react';

// import revertLoadButtonsColors from "../DemoData/revertLoadButtonsColors.js";
import LoadButton from '../DemoData/LoadButton.js';
import inputState from '../../GlobalState/inputState.js';
import getInputState from '../../GlobalState/getInputState.js';
import appState from '../../GlobalState/appState.js';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import processKadeZip from './processKadeZip.js';
import projectHistoryState from '../../GlobalState/projectHistoryState.js';
import styled from 'styled-components';

const { remote } = require('electron');
const mainWindow = remote.getCurrentWindow();
const { dialog } = require('electron').remote;
const fs = require('fs');

const handleClick = async () => {
  const trans1 = i18n.t('Data have already been loaded and the analysis has started');
  const trans2 = i18n.t('To clear this analysis and restart the application');
  const trans3 = i18n.t('click the Clear Project button near the bottom of the navigation panel');
  // check to see if data loaded and correlations started - true ==> throw error
  const isDataAlreadyLoaded = getInputState('isDataAlreadyLoaded');
  if (isDataAlreadyLoaded) {
    inputState.showErrorMessageBar = true;
    inputState.showErrorMessageBar = true;
    inputState.errorMessage = i18n.t('Data are already loaded click Clear Project to restart');
    inputState.extendedErrorMessage = `${trans1}. ${trans2}, ${trans3}.`;
    inputState.errorStackTrace = i18n.t('no stack trace available');
  } else {
    try {
      const data = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
          {
            name: 'Zip',
            extensions: ['zip', 'ZIP'],
          },
        ],
      });

      const path = data.filePaths[0];

      // dialog cancelled case
      if (path === undefined) {
        return;
      }

      fs.readFile(path, (error, data) => {
        if (error != null) {
          alert('file open error.');
          return;
        }
        inputState.showErrorMessageBar = false;

        processKadeZip(data);
        // });

        const logMessageObj1 = {
          logMessage: `Data loaded from ZIP file`,
          logType: 'csvInput',
        };

        projectHistoryState.projectHistoryArray = [logMessageObj1];
      });

      inputState.notifyDataUploadSuccess = true;
      inputState.isLoadExcelT3ButtonGreen = true;
      appState.isInputButtonGreen = true;
      inputState.isLoadZipButtonGreen = true;
      inputState.statementsLoaded = true;
      inputState.areQsortsLoaded = true;
      inputState.isQsortPatternLoaded = true;
    } catch (error) {
      // catch unknown input error
      inputState.showErrorMessageBar = true;
      inputState.errorMessage = `There was an unexpected KADE Zip data input error`;
      inputState.extendedErrorMessage = `Check the format of the KADE zip file and try again.`;
      inputState.errorStackTrace = 'no stack trace available';
    }
  }
};

const LoadTxtStatementFile = () => {
  const { t } = useTranslation();

  // getState
  const isLoadZipButtonGreen = getInputState('isLoadZipButtonGreen');

  return (
    <LoadButton isActive={isLoadZipButtonGreen} onClick={() => handleClick()}>
      <LineContainer>
        <SvgContainer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </SvgContainer>
        <p>{t('Load KADE Zip File')}</p>
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
