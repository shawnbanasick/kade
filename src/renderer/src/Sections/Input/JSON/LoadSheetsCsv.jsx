import throwDataAlreadyLoadedInputErrorModal from '../ErrorChecking/throwDataAlreadyLoadedInputErrorModal';
import inputState from '../../GlobalState/inputState';
import getInputState from '../../GlobalState/getInputState';
import projectHistoryState from '../../GlobalState/projectHistoryState';
import LoadButton from '../DemoData/LoadButton';
import processSheetsCsv from './processSheetsCsv';
import { useTranslation } from 'react-i18next';

const LoadSheetsCsv = () => {
  const { t } = useTranslation();
  const updateProjectHistoryArray = projectHistoryState((state) => state.updateProjectHistoryArray);
  const updateIsDataAlreadyLoaded = inputState((state) => state.updateIsDataAlreadyLoaded);
  const isDataAlreadyLoaded = inputState((state) => state.isDataAlreadyLoaded);
  const updateErrorMessage = inputState((state) => state.updateErrorMessage);
  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);

  const handleClick = async () => {
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

        if (path === undefined) {
          return;
        }

        fs.readFile(path, 'utf8', (error, data) => {
          if (error != null) {
            alert('file open error.');
            return;
          }
          processSheetsCsv(data);

          const logMessageObj1 = {
            logMessage: `Data loaded from Sheets CSV file`,
            logType: 'csvInput',
          };

          updateProjectHistoryArray([logMessageObj1]);
          updateIsDataAlreadyLoaded(true);
        });
      } catch (error) {
        updateErrorMessage(error.message);
        updateShowErrorMessageBar(true);
      }
    }
  };

  const isLoadSheetsCsvButtonGreen = getInputState('isLoadSheetsCsvButtonGreen');

  return (
    <LoadButton $isActive={isLoadSheetsCsvButtonGreen} onClick={handleClick}>
      <div className="flex flex-row justify-center items-center h-full w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className="rotate-180 mr-[20px] h-[17px] w-[17px] fill-current"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <p>{t('Load Sheets CSV File')}</p>
      </div>
    </LoadButton>
  );
};

export default LoadSheetsCsv;
