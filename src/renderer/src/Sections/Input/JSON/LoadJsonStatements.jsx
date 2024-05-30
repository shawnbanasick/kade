import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import throwNoStatementsInputErrorModal from '../ErrorChecking/throwNoStatementsInputErrorModal';
import LoadButton from '../DemoData/LoadButton';
import inputState from '../../GlobalState/inputState';
import getInputState from '../../GlobalState/getInputState';
import coreState from '../../GlobalState/coreState';
import appState from '../../GlobalState/appState';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// const { dialog } = require('electron').remote;
// const fs = require('fs');
// // needed to attach open dialog to mainWindow when opened
// const { remote } = require('electron');
// const mainWindow = remote.getCurrentWindow();

const LoadTxtStatementFile = () => {
  const { t } = useTranslation();
  const isLoadJsonTextButtonGreen = getInputState('isLoadJsonTextButtonGreen');

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

    // handle case when open dialog closed
    if (files.filePaths[0] === undefined) {
      return;
    }

    const path = files.filePaths[0];

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

      if (lines2.length > 1) {
        const areQsortsLoaded = inputState((state) => state.areQsortsLoaded);
        revertLoadButtonsColors('json');

        const updateStatements = coreState((state) => state.updateStatements);
        const updateNumStatements = coreState((state) => state.updateNumStatements);
        const updateStatementsLoaded = inputState((state) => state.updateStatementsLoaded);
        const updateNotifyDataUploadSuccess = inputState(
          (state) => state.updateNotifyDataUploadSuccess
        );
        const updateAreStatementsLoaded = inputState((state) => state.updateAreStatementsLoaded);
        const updateIsLoadJsonTextButtonGreen = inputState(
          (state) => state.updateIsLoadJsonTextButtonGreen
        );
        const updateIsInputButtonGreen = appState((state) => state.updateIsInputButtonGreen);
        const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);

        // const updateAreQsortsLoaded = inputState((state) => state.updateAreQsortsLoaded);

        updateStatements(lines2);
        updateNumStatements(lines2.length);
        updateStatementsLoaded(true);
        updateNotifyDataUploadSuccess(true);
        updateAreStatementsLoaded(true);
        updateStatementsLoaded(true);
        updateIsLoadJsonTextButtonGreen(true);
        updateIsInputButtonGreen(areQsortsLoaded);
        updateIsDataButtonGreen(areQsortsLoaded);

        /*
        coreState.statements = lines2;
        coreState.numStatements = lines2.length;
        inputState.statementsLoaded = true;
        inputState.notifyDataUploadSuccess = true;
        inputState.areStatementsLoaded = true;
        inputState.statementsLoaded = true;
        inputState.isLoadJsonTextButtonGreen = true;
        appState.isInputButtonGreen = areQsortsLoaded;
        appState.isDataButtonGreen = areQsortsLoaded;
        */
      } else {
        throwNoStatementsInputErrorModal(`Can't find any statements in the file!`);
      }
    };
  };

  return (
    <LoadButton $isActive={isLoadJsonTextButtonGreen} onClick={handleClick}>
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
