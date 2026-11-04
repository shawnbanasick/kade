import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { useTranslation } from 'react-i18next';

import inputState from '../../GlobalState/inputState';

import throwDataAlreadyLoadedInputErrorModal from '../ErrorChecking/throwDataAlreadyLoadedInputErrorModal';
import NewLoadButton from '../../../Utils/NewLoadButton';
import parseQsortRecord from './parseQsortRecord';
import processQuinceQsorts from './processQuinceQsorts';
import quinceCheckForUnforced from '../ErrorChecking/quinceCheckForUnforced';

const LoadQuinceQsorts = () => {
  const { t } = useTranslation();
  const isLoadQuinceQsortsButtonGreen = inputState((state) => state.isLoadQuinceQsortsButtonGreen);
  const isDataAlreadyLoaded = inputState((state) => state.isDataAlreadyLoaded);
  const numQuinceQsortsLoaded = inputState((state) => state.numQuinceQsortsLoaded);
  const updateNumQuinceQsortsLoaded = inputState((state) => state.updateNumQuinceQsortsLoaded);
  const isQuinceQsortImportButtonDisabled = inputState(
    (state) => state.isQuinceQsortImportButtonDisabled
  );
  const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);
  const updateQuinceRawData = inputState((state) => state.updateQuinceRawData);

  const [showErrorModal, setShowErrorModal] = useState(false);

  // Listen for data sent from the main process
  useEffect(() => {
    const unsubscribe = window.bridge.quinceData((content) => {
      Papa.parse(content, {
        header: true,
        delimiter: Papa.RECORD_SEP,
        skipEmptyLines: true,
        complete: (results) => {
          const cleanedData = results.data.map((row) => parseQsortRecord(row));
          // Read fresh state at the moment the data arrives
          const { isPatternInputComplete, updateNumQuinceQsortsLoaded } = inputState.getState();
          // isPatternInputComplete is a stand in for checking if the user has selected "forced" or "unforced" in the radio button. If they have selected "unforced", we need to check for unforced Q sorts in the data and throw an error if any are found.
          if (isPatternInputComplete === false) {
            const passesTest = quinceCheckForUnforced(cleanedData);
            if (!passesTest) {
              setShowErrorModal(true);
              return;
            }
          }
          updateQuinceRawData([...cleanedData]);
          processQuinceQsorts(cleanedData);
          updateNumQuinceQsortsLoaded(cleanedData.length);
          updateNotifyDataUploadSuccess(true);
        },
      });
    });
    return unsubscribe; // removes the listener on unmount
  }, [updateNumQuinceQsortsLoaded, updateNotifyDataUploadSuccess]);

  const handleClick = async () => {
    if (isDataAlreadyLoaded) {
      throwDataAlreadyLoadedInputErrorModal();
      return;
    }
    try {
      await window.electronAPI.openQuinceSortFile();
    } catch (error) {
      console.error('Error opening Quince sort file:', error);
      setShowErrorModal(true);
    }
  };

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

  const buttonText = isLoadQuinceQsortsButtonGreen
    ? `${t('Data records imported:')} ${numQuinceQsortsLoaded} `
    : t('Import Quince Data');

  return (
    <>
      <NewLoadButton
        className={isLoadQuinceQsortsButtonGreen ? 'bg-primary-button' : 'bg-grey-button'}
        disabled={isQuinceQsortImportButtonDisabled}
        onClick={handleClick}
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
                  {t('Set Step 6 to "Free Placement" and input the Q sort pattern in Step 7.')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadQuinceQsorts;
