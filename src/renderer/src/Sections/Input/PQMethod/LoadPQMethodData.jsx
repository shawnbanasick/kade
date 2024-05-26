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
import cloneDeep from 'lodash/cloneDeep';

const LoadTxtStatementFile = () => {
  const { t } = useTranslation();
  // getState
  const isLoadPqmethodQsortsButtonGreen = inputState(
    (state) => state.isLoadPqmethodQsortsButtonGreen
  );
  const isDataAlreadyLoaded = inputState((state) => state.isDataAlreadyLoaded);
  const areStatementsLoaded = inputState((state) => state.areStatementsLoaded);
  const statementsLoaded = inputState((state) => state.statementsLoaded);
  const statements = coreState((state) => state.statements);

  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);
  const updateErrorMessage = inputState((state) => state.updateErrorMessage);
  const updateExtendedErrorMessage = inputState((state) => state.updateExtendedErrorMessage);
  const updateErrorStackTrace = inputState((state) => state.updateErrorStackTrace);
  const updateNumQsorts = coreState((state) => state.updateNumQsorts);
  const updateProjectName = coreState((state) => state.updateProjectName);
  const updateProjectHistoryArray = projectHistoryState((state) => state.updateProjectHistoryArray);
  const updateNumStatements = coreState((state) => state.updateNumStatements);
  const updateMultiplierArray = coreState((state) => state.updateMultiplierArray);
  const updateRespondentNames = coreState((state) => state.updateRespondentNames);
  const updateMainDataObject = coreState((state) => state.updateMainDataObject);
  const updateSortsDisplayText = coreState((state) => state.updateSortsDisplayText);
  const updateQSortPattern = coreState((state) => state.updateQSortPattern);
  const updateIsQsortPatternLoaded = inputState((state) => state.updateIsQsortPatternLoaded);
  const updateDataOrigin = inputState((state) => state.updateDataOrigin);
  const updateIsLoadPqmethodQsortsButtonGreen = inputState(
    (state) => state.updateIsLoadPqmethodQsortsButtonGreen
  );
  const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);
  const updateAreQsortsLoaded = inputState((state) => state.updateAreQsortsLoaded);
  // const updateAreStatementsLoaded = inputState((state) => state.updateAreStatementsLoaded);
  const updateIsInputButtonGreen = appState((state) => state.updateIsInputButtonGreen);
  const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);
  const updateIsDataAlreadyLoaded = inputState((state) => state.updateIsDataAlreadyLoaded);
  const updateCsvErrorMessage1 = inputState((state) => state.updateCsvErrorMessage1);
  const updateShowCsvErrorModal = inputState((state) => state.updateShowCsvErrorModal);

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
        const processBlob = (data2) => {
          const data = parsePQMethodFile(data2);

          const mainDataObject = cloneDeep(data[4][1]);
          const sortsDisplayTextArray = sortsDisplayText(mainDataObject);
          const participantNamesPrep = cloneDeep(data[4][0]);
          const participantNamesPrep2 = checkUniqueParticipantName(participantNamesPrep);

          // error check number of statements
          if (statementsLoaded) {
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

            updateProjectHistoryArray([logMessageObj1]);
            updateNumStatements(data[2]);
            updateMultiplierArray(cloneDeep(data[3]));
            updateRespondentNames(participantNamesPrep2);
            updateMainDataObject(mainDataObject);
            updateSortsDisplayText(sortsDisplayTextArray);
            updateQSortPattern(data[5]);
            updateIsQsortPatternLoaded(true);
            updateDataOrigin('pqmethod');

            revertLoadButtonsColors('pqmethod');

            updateNotifyDataUploadSuccess(true);
            updateAreQsortsLoaded(true);
            updateIsLoadPqmethodQsortsButtonGreen(true);
            updateIsInputButtonGreen(areStatementsLoaded);
            updateIsDataButtonGreen(areStatementsLoaded);
            updateIsDataAlreadyLoaded(true);
          }
        };

        await window.electronAPI.openDatFile();
        window.bridgeDat.datData((event, datData) => {
          processBlob(datData);
        });
      } catch (error) {
        updateCsvErrorMessage1(error.message);
        updateShowCsvErrorModal(true);
      }
    }
  };

  return (
    <LoadButton $isActive={isLoadPqmethodQsortsButtonGreen} onClick={() => handleClick()}>
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
