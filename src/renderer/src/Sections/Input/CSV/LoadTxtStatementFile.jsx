import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import throwNoStatementsInputErrorModal from '../throwNoStatementsInputErrorModal.js';
import inputState from '../../GlobalState/inputState';
import getInputState from '../../GlobalState/getInputState';
import appState from '../../GlobalState/appState';
import coreState from '../../GlobalState/coreState';
import LoadButton from '../DemoData/LoadButton';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const { dialog } = require('electron').remote;
const fs = require('fs');
const { remote } = require('electron');
const mainWindow = remote.getCurrentWindow();

const handleClick = async () => {
  // check to see if data loaded and correlations started - true ==> throw error

  const files = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      {
        name: 'Text',
        extensions: ['txt', 'TXT'],
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
      console.log('file open error');
      // alert("file open error.");
      return;
    }
    processBlob(data.toString());
  });

  const processBlob = (data) => {
    const lines = data.split(/[\r\n]+/g);
    // remove empty strings
    const lines2 = lines.filter((e) => e === 0 || e);
    const statementsLength = lines2.length;
    const areQsortsLoaded = getInputState('areQsortsLoaded');
    if (lines2.length === 0) {
      throwNoStatementsInputErrorModal("Can't find any statements in file");
    } else {
      revertLoadButtonsColors('csv');
      coreState.statements = lines2;
      coreState.numStatements = statementsLength;
      inputState.statementsLoaded = true;
      inputState.notifyDataUploadSuccess = true;
      inputState.areStatementsLoaded = true;
      inputState.isLoadCsvTextButtonGreen = true;
      appState.isInputButtonGreen = areQsortsLoaded;
      appState.isDataButtonGreen = areQsortsLoaded;
    }
  };
};

const LoadTxtStatementFile = () => {
  const { t } = useTranslation();

  // getState
  const isLoadCsvTextButtonGreen = getInputState('isLoadCsvTextButtonGreen');

  return (
    <LoadButton isActive={isLoadCsvTextButtonGreen} onClick={handleClick}>
      <LineContainer>
        <SvgContainer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </SvgContainer>
        <p>{t('Load TXT File')}</p>
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
