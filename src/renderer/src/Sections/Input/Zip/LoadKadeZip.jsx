import LoadButton from '../DemoData/LoadButton.js';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import processKadeZip from './processKadeZip.js';
import styled from 'styled-components';
import inputState from '../../GlobalState/inputState.js';
import appState from '../../GlobalState/appState.js';
import projectHistoryState from '../../GlobalState/projectHistoryState.js';

const LoadTxtStatementFile = () => {
  const { t } = useTranslation();

  // getState
  const isLoadZipButtonGreen = inputState((state) => state.isLoadZipButtonGreen);
  const isDataAlreadyLoaded = inputState((state) => state.isDataAlreadyLoaded);
  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);
  const updateErrorMessage = inputState((state) => state.updateErrorMessage);
  const updateExtendedErrorMessage = inputState((state) => state.updateExtendedErrorMessage);
  const updateErrorStackTrace = inputState((state) => state.updateErrorStackTrace);
  const updateIsInputButtonGreen = appState((state) => state.updateIsInputButtonGreen);
  const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);
  const updateIsLoadExcelT3ButtonGreen = inputState(
    (state) => state.updateIsLoadExcelT3ButtonGreen
  );
  const updateIsLoadZipButtonGreen = inputState((state) => state.updateIsLoadZipButtonGreen);
  const updateStatementsLoaded = inputState((state) => state.updateStatementsLoaded);
  const updateAreQsortsLoaded = inputState((state) => state.updateAreQsortsLoaded);
  const updateIsQsortPatternLoaded = inputState((state) => state.updateIsQsortPatternLoaded);

  const trans1 = i18n.t('Data have already been loaded and the analysis has started');
  const trans2 = i18n.t('To clear this analysis and restart the application');
  const trans3 = i18n.t('click the Clear Project button near the bottom of the navigation panel');

  // check to see if data loaded and correlations started - true ==> throw error

  const handleClick = async () => {
    if (isDataAlreadyLoaded) {
      updateShowErrorMessageBar(true);
      updateErrorMessage(i18n.t('Data are already loaded click Clear Project to restart'));
      updateExtendedErrorMessage(`${trans1}. ${trans2}, ${trans3}.`);
      updateErrorStackTrace(i18n.t('no stack trace available'));
    } else {
      try {
        await window.electronAPI.openZipFile();
        window.bridgeZip.zipData((event, zipData) => {
          processKadeZip(zipData);
          updateShowErrorMessageBar(false);
          const logMessageObj1 = {
            logMessage: `Data loaded from ZIP file`,
            logType: 'csvInput',
          };
          updateIsInputButtonGreen(true);
          updateNotifyDataUploadSuccess(true);
          updateIsLoadExcelT3ButtonGreen(true);
          updateIsLoadZipButtonGreen(true);
          updateStatementsLoaded(true);
          updateAreQsortsLoaded(true);
          updateIsQsortPatternLoaded(true);
          projectHistoryState.projectHistoryArray = [logMessageObj1];
        });
      } catch (error) {
        // catch unknown input error
        updateShowErrorMessageBar(true);
        updateErrorMessage(`There was an unexpected KADE Zip data input error`);
        updateExtendedErrorMessage(`Check the format of the KADE zip file and try again.`);
        updateErrorStackTrace('no stack trace available');
      }
    }
  };

  return (
    <LoadButton $isActive={isLoadZipButtonGreen} onClick={() => handleClick()}>
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
