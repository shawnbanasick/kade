import React from 'react';

import parseExcelType3 from './KandedLogic/parseExcelType3.js';
import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import LoadButton from '../DemoData/LoadButton';
import inputState from '../../GlobalState/inputState';
import getInputState from '../../GlobalState/getInputState';
import appState from '../../GlobalState/appState';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import styled from 'styled-components';

const { remote } = require('electron');
const mainWindow = remote.getCurrentWindow();
const { dialog } = require('electron').remote;

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
            name: 'Excel',
            extensions: ['xls', 'XLS', 'xlsx', 'XLSX'],
          },
        ],
      });

      const path = data.filePaths[0];

      // dialog cancelled case
      if (path === undefined) {
        return;
      }

      parseExcelType3(path);
      revertLoadButtonsColors('excelT3');
      inputState.notifyDataUploadSuccess = true;
      inputState.isLoadExcelT3ButtonGreen = true;
      appState.isInputButtonGreen = true;
      appState.isDataButtonGreen = true;
    } catch (error) {
      // catch unknown input error
      inputState.showErrorMessageBar = true;
      inputState.errorMessage = `There was an unexpected XSLX data input error`;
      inputState.extendedErrorMessage = `Check the format of the KADE file and try again.`;
      inputState.errorStackTrace = 'no stack trace available';
    }
  }
};

const LoadTxtStatementFile = () => {
  const { t } = useTranslation();

  // getState
  const isLoadExcelT3ButtonGreen = getInputState('isLoadExcelT3ButtonGreen');

  return (
    <LoadButton isActive={isLoadExcelT3ButtonGreen} onClick={() => handleClick()}>
      <LineContainer>
        <SvgContainer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </SvgContainer>
        <p>{t('Load KADE XLSX File')}</p>
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
