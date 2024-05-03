import styled from 'styled-components';
import React from 'react';
import { view } from '@risingstack/react-easy-state';
import { ToastContainer, toast, Slide } from 'react-toastify';
import convertJSONToData from './convertJSONToData';
import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import throwDataAlreadyLoadedInputErrorModal from '../ErrorChecking/throwDataAlreadyLoadedInputErrorModal';
import throwNoSortsInputErrorModal from '../ErrorChecking/throwNoSortsInputError';
import LoadButton from '../DemoData/LoadButton';
import inputState from '../../GlobalState/inputState';
import coreState from '../../GlobalState/coreState';
import appState from '../../GlobalState/appState';
import { useTranslation } from 'react-i18next';
import getInputState from '../../GlobalState/getInputState';

const { dialog } = require('electron').remote;
const fs = require('fs');
// needed to attach open dialog to mainWindow when opened
const { remote } = require('electron');
const mainWindow = remote.getCurrentWindow();

function notifyWarning() {
  toast.warn('Select Participant Id to complete JSON import', {
    autoClose: false
  });
}

let isNoError = true;

const handleClick = async () => {
  // check to see if data loaded and correlations started - true ==> throw error

  const isDataAlreadyLoaded = getInputState('isDataAlreadyLoaded');

  if (isDataAlreadyLoaded) {
    throwDataAlreadyLoadedInputErrorModal();
  } else {
    try {
      const files = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
          {
            name: 'JSON',
            extensions: ['json', 'JSON']
          }
        ]
      });

      const path = files.filePaths[0];

      fs.readFile(path, 'utf8', (error, data) => {
        if (error != null) {
          alert('file open error.');
          return;
        }

        if (data === undefined) {
          return;
        }

        const results = JSON.parse(data);

        // convert from JSON to array
        const resultsArray = [];
        const resultsKeys = Object.keys(results);

        for (let k = 0; k < resultsKeys.length; k += 1) {
          resultsArray.push(results[resultsKeys[k]]);
        }

        const testValue = Object.prototype.hasOwnProperty.call(resultsArray[0], 'sort');

        if (!testValue) {
          throwNoSortsInputErrorModal(`Can't find the key named "sort" in JSON object`);
          isNoError = false;
        }

        if (isNoError === true) {
          // todo - this is the source of the extra brackets
          const csvData = convertJSONToData(results);

          const columnHeaders = csvData[0][0];
          revertLoadButtonsColors('json');
          inputState.jsonParticipantId = columnHeaders;
          inputState.showJsonParticipantIdDropdown = true;
          coreState.csvData = csvData;
          coreState.jsonObj = results;
          inputState.dataOrigin = 'json';
          inputState.areQsortsLoaded = true;
          let areStatementsLoaded = getInputState('areStatementsLoaded');
          appState.isInputButtonGreen = areStatementsLoaded;
          appState.isDataButtonGreen = areStatementsLoaded;
          inputState.disabledSheetsButton = true;
          notifyWarning();
          inputState.isDataAlreadyLoaded = true;
        } // end if
      }); // end read file path
    } catch (error) {
      inputState.csvErrorMessage1 = error.message;
      inputState.showCsvErrorModal = true;
    }
  }
};

const LoadTxtStatementFile = () => {
  const { t } = useTranslation();

  const isLoadJsonQsortsButtonGreen = getInputState('isLoadJsonQsortsButtonGreen');

  return (
    <React.Fragment>
      <JsonButton
        as={LoadButton}
        isActive={isLoadJsonQsortsButtonGreen}
        onClick={() => handleClick()}
      >
        <LineContainer>
          <SvgContainer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </SvgContainer>
          <p>{t('Load JSON File')}</p>
        </LineContainer>
      </JsonButton>
      <ToastContainer transition={Slide} />
    </React.Fragment>
  );
};

export default view(LoadTxtStatementFile);

const JsonButton = styled.div`
  margin-top: 18px;
`;

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
