import { useEffect } from 'react';
import throwNoStatementsInputErrorModal from '../ErrorChecking/throwNoStatementsInputErrorModal';
import NewLoadButton from '../../../Utils/NewLoadButton';
import { useTranslation } from 'react-i18next';
import coreState from '../../GlobalState/coreState';
import inputState from '../../GlobalState/inputState';
import appState from '../../GlobalState/appState';

const LoadConfigXml = () => {
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

  // parseSurvey.js
  const unmarkup = (s = '') => s.replace(/\{\{\{(\/?\w+\/?)\}\}\}/g, '<$1>'); // {{{b}}} -> <b>, {{{br/}}} -> <br/>

  const parseSurvey = (xmlString) => {
    // The XML declaration must be the very first characters, so trim leading whitespace
    const doc = new DOMParser().parseFromString(xmlString.trim(), 'application/xml');

    const err = doc.querySelector('parsererror');
    if (err) throw new Error('Invalid XML: ' + err.textContent);

    const items = doc.querySelectorAll('item[id="survey"]');

    return Array.from(items).map((item, index) => {
      const input = item.querySelector('input');
      const type = input.getAttribute('type'); // text | select | radio | information
      const raw = input.textContent.trim();

      return {
        key: `q${index}`, // your own stable id
        type,
        label: item.querySelector('label')?.textContent.trim() ?? '',
        note: unmarkup(item.querySelector('note')?.textContent.trim() ?? ''),
        required: input.getAttribute('required') === 'true',
        options: raw
          ? raw
              .split(';;;')
              .map((o) => o.trim())
              .filter(Boolean)
          : [],
      };
    });
  };

  const processBlob = (data) => {
    // split into lines
    console.log('data', parseSurvey(data));
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
        <div className="font-sans text-sm font-bold">{t('Import config.xml')}</div>
      </div>
    </NewLoadButton>
  );
};

export default LoadConfigXml;
