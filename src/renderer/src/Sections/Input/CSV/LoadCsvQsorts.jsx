import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { useTranslation } from 'react-i18next';

import inputState from '../../GlobalState/inputState';

import NewLoadButton from '../../../Utils/NewLoadButton';
import processCsvQsorts from './processCsvQsorts';
import csvCheckForUnforced from '../ErrorChecking/csvCheckForUnforced';

const LoadCsvQsorts = (props) => {
  const { t } = useTranslation();
  const isLoadCsvQsortsButtonGreen = inputState((state) => state.isLoadCsvQsortsButtonGreen);
  const numCsvQsortsLoaded = inputState((state) => state.numCsvQsortsLoaded);

  const [showErrorModal, setShowErrorModal] = useState(false);

  // const trans1 = t('Data have already been loaded and the analysis has started');
  // const trans2 = t('To clear this analysis and restart the application');
  // const trans3 = t('click the Clear Project button near the bottom of the navigation panel');

  const closeModal = () => setShowErrorModal(false);

  // While the modal is open: close on Escape and lock background scrolling.
  useEffect(() => {
    if (!showErrorModal) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setShowErrorModal(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showErrorModal]);

  const handleClick = async () => {
    try {
      await window.electronAPI.openCsvFile();
      window.bridge.csvData((event, csvData) => {
        const { isPatternInputComplete, updateNumCsvQsortsLoaded } = inputState.getState();
        // parse file
        const parsedFile = Papa.parse(csvData, { skipEmptyLines: true });
        const lines3 = parsedFile.data;
        // remove the first (header) line
        lines3.shift();
        const lines4a = JSON.parse(JSON.stringify(lines3)); // Deep copy to avoid mutation
        const lines4 = [lines4a].map((row) => row.splice(1)); // Trim whitespace from each cell
        // isPatternInputComplete is a stand in for checking if the user has selected "forced" or "unforced" in the radio button. If they have selected "unforced", we need to check for unforced Q sorts in the data and throw an error if any are found.
        if (!isPatternInputComplete) {
          const passesTest = csvCheckForUnforced(lines4);
          if (!passesTest) {
            setShowErrorModal(true);
            // Show an error message or handle the error as needed
            console.error('Unforced Q sorts found in the CSV data.');
            return;
          }
        }
        updateNumCsvQsortsLoaded(lines3.length);
        processCsvQsorts(lines3);
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const buttonText = isLoadCsvQsortsButtonGreen
    ? `${t('Data records imported:')} ${numCsvQsortsLoaded} `
    : t('Load CSV File');

  return (
    <>
      <NewLoadButton
        onClick={handleClick}
        className={`${isLoadCsvQsortsButtonGreen ? 'bg-primary-button' : 'bg-grey-button'}`}
        disabled={props.disabled}
      >
        <div className="flex flex-row  justify-center items-center h-full w-full gap-3">
          {!isLoadCsvQsortsButtonGreen ? (
            <svg
              id="ExcelT1SvgContainer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="rotate-180 h-4.25 w-4.25 fill-current"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
          ) : null}
          <div className="font-sans text-sm font-bold">{buttonText}</div>
        </div>
      </NewLoadButton>

      {showErrorModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={t('Error')}
        >
          <div
            className="relative flex max-h-full max-w-[80rem] flex-col overflow-hidden rounded-lg bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label={t('Close')}
              className="absolute right-3 top-3 flex h-7 w-7.5 pb-1 pl-0.5 items-center justify-center rounded-full bg-black/60 text-lg leading-none text-white hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              autoFocus
            >
              &times;
            </button>

            <div className="min-h-50 items-center overflow-auto bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-col items-left justify-center gap-4">
                <h3 className="text-3xl font-semibold text-gray-900">
                  {t('Unforced Q Sorts Error')}
                </h3>
                <hr />
                <div className="mt-1 text-xl leading-relaxed text-gray-800">
                  {t('There are unforced Q sorts in the data.')}
                </div>
                <div className="mt-1 text-xl leading-relaxed text-gray-800">
                  {t('Set Step 3 to "Free Placement" and input the Q sort pattern in Step 4.')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadCsvQsorts;
