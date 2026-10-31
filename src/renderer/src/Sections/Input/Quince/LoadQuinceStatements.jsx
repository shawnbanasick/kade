import { useEffect } from 'react';
import throwNoStatementsInputErrorModal from '../ErrorChecking/throwNoStatementsInputErrorModal';
import NewLoadButton from '../../../Utils/NewLoadButton';
import { useTranslation } from 'react-i18next';
import coreState from '../../GlobalState/coreState';
import inputState from '../../GlobalState/inputState';
import appState from '../../GlobalState/appState';

function parseStatements(xmlString) {
  const doc = new DOMParser().parseFromString(xmlString, 'application/xml');

  if (doc.querySelector('parsererror')) {
    throw new Error('Invalid XML');
  }

  return Array.from(doc.getElementsByTagName('statement'), (el) => el.textContent.trim());
}

const LoadQuinceStatements = () => {
  const { t } = useTranslation();

  const isLoadCsvTextButtonGreen = inputState((state) => state.isLoadCsvTextButtonGreen);
  const areStatementsLoaded = inputState((state) => state.areStatementsLoaded); // <-- statements, not qsorts
  const numStatements = coreState((state) => state.numStatements); // <-- persisted count
  const updateStatements = coreState((state) => state.updateStatements);
  const updateNumStatements = coreState((state) => state.updateNumStatements);
  const updateStatementsLoaded = inputState((state) => state.updateStatementsLoaded);
  const updateAreStatementsLoaded = inputState((state) => state.updateAreStatementsLoaded);
  const updateIsLoadCsvTextButtonGreen = inputState(
    (state) => state.updateIsLoadCsvTextButtonGreen
  );
  const updateIsInputButtonGreen = appState((state) => state.updateIsInputButtonGreen);
  const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);
  // const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);

  const processBlob = (data) => {
    const statements = parseStatements(data);

    if (statements.length > 1) {
      updateStatements(statements);
      updateNumStatements(statements.length);
      updateStatementsLoaded(true);
      updateAreStatementsLoaded(true);
      updateIsLoadCsvTextButtonGreen(true);
      setTimeout(() => {
        // read the *current* value, not a stale closure
        const qsortsLoaded = inputState.getState().areQsortsLoaded;
        // updateNotifyDataUploadSuccess(true);
        updateIsInputButtonGreen(qsortsLoaded);
        updateIsDataButtonGreen(qsortsLoaded);
      }, 50);
    } else {
      throwNoStatementsInputErrorModal(`Can't find any statements in the file!`);
    }
  };

  useEffect(() => {
    const unsubscribe = window.bridge.xmlData((content) => {
      processBlob(content);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleClick = async () => {
    // only open the dialog; the listener in useEffect handles the data
    await window.electronAPI.openXmlFile();
  };

  const buttonText = areStatementsLoaded
    ? `${t('Statements imported:')} ${numStatements} `
    : t('Import statements.xml');

  return (
    <NewLoadButton
      onClick={handleClick}
      className={`${isLoadCsvTextButtonGreen ? 'bg-primary-button' : 'bg-grey-button'}`}
    >
      <div className="flex flex-row justify-center items-center h-full w-full gap-3">
        {!areStatementsLoaded ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="rotate-180 h-[17px] w-[17px] fill-current"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
        ) : null}

        <div className="font-sans text-sm font-bold">{buttonText}</div>
      </div>
    </NewLoadButton>
  );
};

export default LoadQuinceStatements;
