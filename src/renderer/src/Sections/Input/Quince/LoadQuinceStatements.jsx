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

  const areStatementsLoaded = inputState((state) => state.areStatementsLoaded); // <-- statements, not qsorts
  const numStatements = coreState((state) => state.numStatements); // <-- persisted count
  const updateStatements = coreState((state) => state.updateStatements);
  const updateNumStatements = coreState((state) => state.updateNumStatements);
  const updateStatementsLoaded = inputState((state) => state.updateStatementsLoaded);
  const updateAreStatementsLoaded = inputState((state) => state.updateAreStatementsLoaded);
  const updateIsQuinceStatementsXMLButtonGreen = inputState(
    (state) => state.updateIsQuinceStatementsXMLButtonGreen
  );
  const isQuinceStatementsXMLButtonGreen = inputState(
    (state) => state.isQuinceStatementsXMLButtonGreen
  );

  const updateIsInputButtonGreen = appState((state) => state.updateIsInputButtonGreen);
  const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);

  const processBlob = (data) => {
    const statements = parseStatements(data);

    if (statements.length > 1) {
      updateStatements(statements);
      updateNumStatements(statements.length);
      updateStatementsLoaded(true);
      updateAreStatementsLoaded(true);
      updateIsQuinceStatementsXMLButtonGreen(true);
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
    const unsubscribe = window.bridge.xmlDataStatements((content) => {
      processBlob(content);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleClick = async () => {
    // only open the dialog; the listener in useEffect handles the data
    await window.electronAPI.openXmlFileStatements();
  };

  const buttonText = areStatementsLoaded
    ? `${t('Statements imported:')} ${numStatements} `
    : t('Import statements.xml');

  return (
    <button
      onClick={handleClick}
      className={`text-center font-normal text-[calc(10px+1vw)] font-[Helvetica,sans-serif]
        rounded mr-[3px] mb-[3px]
        no-underline text-black
        transition-[box-shadow] duration-300
        transform translate-z-0
        h-[60px] px-[15px] w-[250px]    
        ${isQuinceStatementsXMLButtonGreen ? 'bg-primary-button' : 'bg-grey-button'}`}
      id="LoadQuinceStatementsButton"
    >
      <div className="flex flex-row justify-center items-center h-full w-full gap-3">
        {!isQuinceStatementsXMLButtonGreen ? (
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
    </button>
  );
};

export default LoadQuinceStatements;
