import { useEffect } from 'react';
// import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import throwNoStatementsInputErrorModal from '../ErrorChecking/throwNoStatementsInputErrorModal';
import NewLoadButton from '../../../Utils/NewLoadButton';
import { useTranslation } from 'react-i18next';
import coreState from '../../GlobalState/coreState';
import inputState from '../../GlobalState/inputState';
import appState from '../../GlobalState/appState';

const LoadQuinceStatements = () => {
  const { t } = useTranslation();
  const isLoadCsvTextButtonGreen = inputState((state) => state.isLoadCsvTextButtonGreen);
  const areQsortsLoaded = inputState((state) => state.areQsortsLoaded);
  // revertLoadButtonsColors('json');

  const updateStatements = coreState((state) => state.updateStatements);
  const updateNumStatements = coreState((state) => state.updateNumStatements);
  const updateStatementsLoaded = inputState((state) => state.updateStatementsLoaded);
  const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);
  const updateAreStatementsLoaded = inputState((state) => state.updateAreStatementsLoaded);
  const updateIsLoadCsvTextButtonGreen = inputState(
    (state) => state.updateIsLoadCsvTextButtonGreen
  );
  const updateIsInputButtonGreen = appState((state) => state.updateIsInputButtonGreen);
  const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);

  function parseStatements(xmlString) {
    const doc = new DOMParser().parseFromString(xmlString, 'application/xml');

    if (doc.querySelector('parsererror')) {
      throw new Error('Invalid XML');
    }

    return Array.from(doc.getElementsByTagName('statement'), (el) => el.textContent.trim());
  }

  const processBlob = (data) => {
    // console.log('data', parseStatements(data));

    const lines2 = parseStatements(data);

    if (lines2.length > 1) {
      updateStatements(lines2);
      updateNumStatements(lines2.length);
      updateStatementsLoaded(true);
      updateAreStatementsLoaded(true);
      updateStatementsLoaded(true);
      updateIsLoadCsvTextButtonGreen(true);
      setTimeout(() => {
        updateNotifyDataUploadSuccess(true);
        updateIsInputButtonGreen(areQsortsLoaded);
        updateIsDataButtonGreen(areQsortsLoaded);
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
    // check to see if data loaded and correlations started - true ==> throw error

    await window.electronAPI.openXmlFile();
    window.bridge.xmlData((event, xmlData) => {
      processBlob(xmlData);
    });
  };

  return (
    <NewLoadButton
      onClick={handleClick}
      className={`${isLoadCsvTextButtonGreen ? 'bg-primary-button' : 'bg-grey-button'}`}
    >
      <div className="flex flex-row justify-center items-center h-full w-full gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className="rotate-180 h-[17px] w-[17px] fill-current"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <div className="font-sans text-sm font-bold">{t('Import statements.xml')}</div>
      </div>
    </NewLoadButton>
  );
};

export default LoadQuinceStatements;
