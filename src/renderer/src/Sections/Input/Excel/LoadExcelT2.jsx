import React from 'react';
import { view } from '@risingstack/react-easy-state';
import parseExcelType2 from './parseExcelType2';
import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import throwDataAlreadyLoadedInputErrorModal from '../ErrorChecking/throwDataAlreadyLoadedInputErrorModal';
import LoadButton from '../DemoData/LoadButton';
import inputState from '../../GlobalState/inputState';
import getInputState from '../../GlobalState/getInputState';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const { remote } = require('electron');
const mainWindow = remote.getCurrentWindow();
const { dialog } = require('electron').remote;

const LoadTxtStatementFile = () => {
  const [t] = useTranslation();
  const isLoadExcelT2ButtonGreen = getInputState('isLoadExcelT2ButtonGreen');

  const handleClick = async () => {
    // check to see if data loaded and correlations started - true ==> throw error
    const isDataAlreadyLoaded = getInputState('isDataAlreadyLoaded');
    if (isDataAlreadyLoaded) {
      throwDataAlreadyLoadedInputErrorModal();
    } else {
      try {
        const data = await dialog.showOpenDialog(mainWindow, {
          properties: ['openFile'],
          filters: [
            {
              name: 'Excel',
              extensions: ['xls', 'XLS', 'xlsx', 'XLSX']
            }
          ]
        });
        // send data to processing
        const path = data.filePaths[0];

        // dialog cancelled case
        if (path === undefined) {
          return;
        }

        parseExcelType2(path);
        revertLoadButtonsColors('excelT2');
      } catch (error) {
        // catch unknown input error
        inputState.errorMessage = t('There was an unexpected XSLX data input error');
        inputState.extendedErrorMessage = t('Check the format of the file and try again');
        inputState.errorStackTrace = t('no stack trace available');
        inputState.showErrorMessageBar = true;
      }
    }
  };

  return (
    <LoadButton isActive={isLoadExcelT2ButtonGreen} onClick={handleClick}>
      <LineContainer>
        <SvgContainer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </SvgContainer>
        <p>{t('Load Type 2 XLSX File')}</p>
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
