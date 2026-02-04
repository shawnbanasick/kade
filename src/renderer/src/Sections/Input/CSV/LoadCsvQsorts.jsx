import inputState from '../../GlobalState/inputState';
import getInputState from '../../GlobalState/getInputState';
import NewLoadButton from '../../../Utils/NewLoadButton';
import { useTranslation } from 'react-i18next';

const handleClick = async () => {
  // getState - check to see if data loaded and correlations started - true ==> throw error
  // const isDataAlreadyLoaded = getInputState('isDataAlreadyLoaded');
  // if (isDataAlreadyLoaded) {
  //   throwDataAlreadyLoadedInputErrorModal();
  // } else {
  try {
    //     const files = await dialog.showOpenDialog(mainWindow, {
    //       properties: ['openFile'],
    //       filters: [
    //         {
    //           name: 'CSV',
    //           extensions: ['csv', 'CSV'],
    //         },
    //       ],
    //     });
    //     const path = files.filePaths[0];
    //     // dialog cancelled case
    //     if (path === undefined) {
    //       return;
    //     }
    //     fs.readFile(path, 'utf8', (error, data) => {
    //       if (error != null) {
    //         alert('file open error.');
    //         return;
    //       }
    //       inputState.showErrorMessageBar = false;
    //       processCsvQsorts(data);
    //       const logMessageObj1 = {
    //         logMessage: `Data loaded from CSV file`,
    //         logType: 'csvInput',
    //       };
    //       projectHistoryState.projectHistoryArray = [logMessageObj1];
    // });
  } catch (error) {
    inputState.errorMessage = error.message;
    inputState.showErrorMessageBar = true;
  }
};

const LoadTxtStatementFile = () => {
  const { t } = useTranslation();

  const isLoadCsvQsortsButtonGreen = getInputState('isLoadCsvQsortsButtonGreen');

  return (
    <NewLoadButton isActive={isLoadCsvQsortsButtonGreen} onClick={handleClick}>
      <div className="flex flex-row justify-center items-center h-full w-full gap-3">
        <svg
          id="ExcelT1SvgContainer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className="rotate-180 mr-5 h-[17px] w-[17px] fill-current"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <div className="ml-5 font-sans text-lg font-bold">{t('Load CSV File')}</div>
      </div>
    </NewLoadButton>
  );
};

export default LoadTxtStatementFile;
