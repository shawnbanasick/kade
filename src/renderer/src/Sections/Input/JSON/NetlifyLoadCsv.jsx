import throwDataAlreadyLoadedInputErrorModal from '../ErrorChecking/throwDataAlreadyLoadedInputErrorModal';
import inputState from '../../GlobalState/inputState';
import getInputState from '../../GlobalState/getInputState';
import projectHistoryState from '../../GlobalState/projectHistoryState';
import LoadButton from '../DemoData/LoadButton';
import processNetlifyCsv from './processNetlifyCsv';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// const { dialog } = require('electron').remote;
// const fs = require('fs');
// const { remote } = require('electron');
// const mainWindow = remote.getCurrentWindow();

const LoadTxtStatementFile = () => {
  const { t } = useTranslation();
  const updateProjectHistoryArray = projectHistoryState((state) => state.updateProjectHistoryArray);
  const updateIsDataAlreadyLoaded = inputState((state) => state.updateIsDataAlreadyLoaded);
  const updateErrorMessage = inputState((state) => state.updateErrorMessage);
  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);
  const isLoadNetlifyCsvButtonGreen = inputState((state) => state.isLoadNetlifyCsvButtonGreen);

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
          processNetlifyCsv(data);

          const logMessageObj1 = {
            logMessage: `Data loaded from Sheets CSV file`,
            logType: 'csvInput',
          };

          updateProjectHistoryArray([logMessageObj1]);
          updateIsDataAlreadyLoaded(true);
          // projectHistoryState.projectHistoryArray = [logMessageObj1];
          // inputState.isDataAlreadyLoaded = true;
        });
      } catch (error) {
        updateErrorMessage(error.message);
        updateShowErrorMessageBar(true);
        // inputState.errorMessage = error.message;
        // inputState.showErrorMessageBar = true;
      }
    }
  };

  // const isLoadNetlifyCsvButtonGreen = getInputState('isLoadNetlifyCsvButtonGreen');
  return (
    <LoadButton $isActive={isLoadNetlifyCsvButtonGreen} onClick={handleClick}>
      <LineContainer>
        <SvgContainer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </SvgContainer>
        <p>{t('Load Netlify File')}</p>
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
