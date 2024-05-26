import React from 'react';

import throwDataAlreadyLoadedInputErrorModal from '../throwDataAlreadyLoadedInputErrorModal';
import inputState from '../../GlobalState/inputState';
import getInputState from '../../GlobalState/getInputState';
import projectHistoryState from '../../GlobalState/projectHistoryState';
import LoadButton from '../DemoData/LoadButton';
import processCsvQsorts from './processCsvQsorts';
import { useTranslation } from 'react-i18next';

const { dialog } = require('electron').remote;
const fs = require('fs');
const { remote } = require('electron');
const mainWindow = remote.getCurrentWindow();

const handleClick = async () => {
  // getState - check to see if data loaded and correlations started - true ==> throw error
  const isDataAlreadyLoaded = getInputState('isDataAlreadyLoaded');
  if (isDataAlreadyLoaded) {
    throwDataAlreadyLoadedInputErrorModal();
  } else {
    try {
      const files = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
          {
            name: 'CSV',
            extensions: ['csv', 'CSV'],
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
          alert('file open error.');
          return;
        }
        inputState.showErrorMessageBar = false;
        processCsvQsorts(data);

        const logMessageObj1 = {
          logMessage: `Data loaded from CSV file`,
          logType: 'csvInput',
        };

        projectHistoryState.projectHistoryArray = [logMessageObj1];
      });
    } catch (error) {
      inputState.errorMessage = error.message;
      inputState.showErrorMessageBar = true;
    }
  }
};

const LoadTxtStatementFile = () => {
  const { t } = useTranslation();

  const isLoadCsvQsortsButtonGreen = getInputState('isLoadCsvQsortsButtonGreen');
  return (
    <LoadButton isActive={isLoadCsvQsortsButtonGreen} onClick={handleClick}>
      <p>{t('Load CSV File')}</p>
    </LoadButton>
  );
};

export default LoadTxtStatementFile;
