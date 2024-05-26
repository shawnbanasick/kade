import parsePQMethodFile from '../logic/parsePQMethodFile';
import sortsDisplayText from '../logic/sortsDisplayText';
import checkUniqueParticipantName from '../logic/checkUniqueParticipantNames';
import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import numStatementsMatchErrorModal from '../ErrorChecking/numStatementsMatchErrorModal';
import coreState from '../../GlobalState/coreState';
import projectHistoryState from '../../GlobalState/projectHistoryState';
import appState from '../../GlobalState/appState';
import inputState from '../../GlobalState/inputState';
import LoadButton from '../DemoData/LoadButton';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import styled from 'styled-components';
import getInputState from '../../GlobalState/getInputState';
import getCoreState from '../../GlobalState/getCoreState';

const clone = require('rfdc')();
const { dialog } = require('electron').remote;
const fs = require('fs');
const { remote } = require('electron');
const mainWindow = remote.getCurrentWindow();

const LoadTxtStatementFile = () => {
  const { t } = useTranslation();
  // getState
  const isLoadPqmethodQsortsButtonGreen = inputState(
    (state) => state.isLoadPqmethodQsortsButtonGreen
  );
  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);
  const isDataAlreadyLoaded = inputState((state) => state.isDataAlreadyLoaded);
  const updateErrorMessage = inputState((state) => state.updateErrorMessage);
  const updateExtendedErrorMessage = inputState((state) => state.updateExtendedErrorMessage);
  const updateErrorStackTrace = inputState((state) => state.updateErrorStackTrace));
  const updateNumQsorts = coreState((state) => state.updateNumQsorts);
  const updateProjectName = coreState((state) => state.updateProjectName);
  const updateProjectHistoryArray = projectHistoryState((state) => state.updateProjectHistoryArray);
  const updateNumStatements = coreState((state) => state.updateNumStatements);
  const updateMultiplierArray = coreState((state) => state.updateMultiplierArray);
  const updateRespondentNames = coreState((state) => state.updateRespondentNames);
  const updateMainDataObject = coreState((state) => state.updateMainDataObject);
  /*
  projectHistoryState.projectHistoryArray = [logMessageObj1];
  coreState.numStatements = data[2];
  coreState.multiplierArray = clone(data[3]);
  coreState.respondentNames = participantNamesPrep2;
  coreState.mainDataObject = mainDataObject;
  coreState.sortsDisplayText = sortsDisplayTextArray;
  coreState.qSortPattern = data[5];
  inputState.isQsortPatternLoaded = true;
  inputState.dataOrigin = 'pqmethod';
  */
  
  const handleClick = async () => {
    // check to see if data loaded and correlations started - true ==> throw error
    const trans1 = i18n.t('Data have already been loaded and the analysis has started');
    const trans2 = i18n.t('To clear this analysis and restart the application');
    const trans3 = i18n.t('click the Clear Project button near the bottom of the navigation panel');
    if (isDataAlreadyLoaded) {
      updateShowErrorMessageBar(true);
      updateErrorMessage(i18n.t('Data are already loaded click Clear Project to restart'));
      updateExtendedErrorMessage(`${trans1}. ${trans2}, ${trans3}.`);
      updateErrorStackTrace(i18n.t('no stack trace available'));
    } else {
      let isNoError = true;

      try {
        const files = await dialog.showOpenDialog(mainWindow, {
          properties: ['openFile'],
          filters: [
            {
              name: 'DAT',
              extensions: ['dat', 'DAT'],
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

        const processBlob = (data2) => {
          const data = parsePQMethodFile(data2);

          const mainDataObject = clone(data[4][1]);
          const sortsDisplayTextArray = sortsDisplayText(mainDataObject);

          const participantNamesPrep = clone(data[4][0]);
          const participantNamesPrep2 = checkUniqueParticipantName(participantNamesPrep);

          // error check number of statements
          const statementsLoaded = getInputState('statementsLoaded');
          if (statementsLoaded) {
            // getState
            const statements = getCoreState('statements');
            if (data[5].length !== statements.length) {
              isNoError = false;
              numStatementsMatchErrorModal();
            }
          }

          if (isNoError) {
            // send data to STATE
            updateNumQsorts(data[0]);
            updateProjectName(data[1]);

            const logMessageObj1 = {
              logMessage: `${data[1]} data loaded from PQMethod DAT file`,
              logType: 'pqmethodInput',
            };

            projectHistoryState.projectHistoryArray = [logMessageObj1];
            coreState.numStatements = data[2];
            coreState.multiplierArray = clone(data[3]);
            coreState.respondentNames = participantNamesPrep2;
            coreState.mainDataObject = mainDataObject;
            coreState.sortsDisplayText = sortsDisplayTextArray;
            coreState.qSortPattern = data[5];
            inputState.isQsortPatternLoaded = true;
            inputState.dataOrigin = 'pqmethod';

            revertLoadButtonsColors('pqmethod');
            inputState.notifyDataUploadSuccess = true;
            inputState.areQsortsLoaded = true;
            inputState.isLoadPqmethodQsortsButtonGreen = true;
            const areStatementsLoaded = getInputState('areStatementsLoaded');
            appState.isInputButtonGreen = areStatementsLoaded;
            appState.isDataButtonGreen = areStatementsLoaded;
            inputState.isDataAlreadyLoaded = true;
          }
        };
      } catch (error) {
        inputState.csvErrorMessage1 = error.message;
        inputState.showCsvErrorModal = true;
      }
    }
  };

  return (
    <LoadButton isActive={isLoadPqmethodQsortsButtonGreen} onClick={() => handleClick()}>
      <LineContainer>
        <SvgContainer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </SvgContainer>
        <p>{t('Load DAT File')}</p>
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
