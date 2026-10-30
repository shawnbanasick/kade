import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import inputState from '../../GlobalState/inputState';
import { useTranslation } from 'react-i18next';

import throwDataAlreadyLoadedInputErrorModal from '../ErrorChecking/throwDataAlreadyLoadedInputErrorModal';
import NewLoadButton from '../../../Utils/NewLoadButton';
import parseQsortRecord from './parseQsortRecord';
import processQuinceQsorts from './processQuinceQsorts';

// import convertJSONToData from './convertJSONToData';
// import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
// import throwNoSortsInputErrorModal from '../ErrorChecking/throwNoSortsInputError';
// import LoadButton from '../DemoData/LoadButton';
// import coreState from '../../GlobalState/coreState';
// import appState from '../../GlobalState/appState';
// import { ToastContainer, toast, Slide } from 'react-toastify';

// main function
const LoadQuinceQsorts = () => {
  const { t } = useTranslation();
  const isLoadQuinceQsortsButtonGreen = inputState((state) => state.isLoadQuinceQsortsButtonGreen);
  const isDataAlreadyLoaded = inputState((state) => state.isDataAlreadyLoaded);
  const updateCsvErrorMessage1 = inputState((state) => state.updateCsvErrorMessage1);
  const updateShowCsvErrorModal = inputState((state) => state.updateShowCsvErrorModal);
  const updateIsLoadQuinceQsortsButtonGreen = inputState(
    (state) => state.updateIsLoadQuinceQsortsButtonGreen
  );
  const [numDataRecords, setNumDataRecords] = useState(0);

  //   const updateJsonParticipantId = inputState((state) => state.updateJsonParticipantId);
  //   const updateShowJsonParticipantIdDropdown = inputState(
  //     (state) => state.updateShowJsonParticipantIdDropdown
  //   );
  //   const updateCsvData = coreState((state) => state.updateCsvData);
  //   const updateJsonObj = coreState((state) => state.updateJsonObj);
  //   const updateDataOrigin = inputState((state) => state.updateDataOrigin);
  //   const updateAreQsortsLoaded = inputState((state) => state.updateAreQsortsLoaded);
  //   const updateIsInputButtonGreen = appState((state) => state.updateIsInputButtonGreen);
  //   const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);
  //   const updateDisabledSheetsButton = inputState((state) => state.updateDisabledSheetsButton);
  //   const updateIsDataAlreadyLoaded = inputState((state) => state.updateIsDataAlreadyLoaded);
  //   const areStatementsLoaded = inputState((state) => state.areStatementsLoaded);

  useEffect(() => {
    const unsubscribe = window.bridge.quinceData((content) => {
      Papa.parse(content, {
        header: true,
        delimiter: Papa.RECORD_SEP,
        skipEmptyLines: true,
        complete: (results) => {
          const cleanedData = results.data.map((row) => {
            const cleanedRow = parseQsortRecord(row);
            return cleanedRow;
          });
          processQuinceQsorts(cleanedData);
          setNumDataRecords(cleanedData.length);
          console.log('cleanedData', JSON.stringify(cleanedData[0], null, 2));
        },
      });
    });
    return unsubscribe; // removes the listener on unmount
  }, []);

  const handleClick = async () => {
    if (isDataAlreadyLoaded) {
      throwDataAlreadyLoadedInputErrorModal();
    } else {
      try {
        await window.electronAPI.openQuinceSortFile();
      } catch (error) {
        updateCsvErrorMessage1(error.message);
        updateShowCsvErrorModal(true);
      }
    }
  };

  const buttonText = isLoadQuinceQsortsButtonGreen
    ? `${t('Data records imported:')} ${numDataRecords} `
    : t('Import Quince Data');

  return (
    <NewLoadButton
      className={`${isLoadQuinceQsortsButtonGreen ? 'bg-primary-button' : 'bg-grey-button'}`}
      onClick={() => handleClick()}
    >
      <div className="flex flex-row justify-center items-center h-full w-full gap-3">
        {!isLoadQuinceQsortsButtonGreen && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="rotate-180 mr-5 h-4.25 w-4.25 fill-current"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
        )}
        <div className="font-sans text-sm font-bold">{buttonText}</div>
      </div>
    </NewLoadButton>
  );
};

export default LoadQuinceQsorts;
