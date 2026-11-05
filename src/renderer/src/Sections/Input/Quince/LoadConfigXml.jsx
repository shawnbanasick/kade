import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';

const LoadConfigXml = () => {
  const { t } = useTranslation();
  const isLoadConfigXmlButtonGreen = inputState((state) => state.isLoadConfigXmlButtonGreen);
  const updateIsLoadConfigXmlButtonGreen = inputState(
    (state) => state.updateIsLoadConfigXmlButtonGreen
  );
  const updateQuinceExportConfigXmlData = inputState(
    (state) => state.updateQuinceExportConfigXmlData
  );
  const updateIsImportConfigXmlButtonDisabled = inputState(
    (state) => state.updateIsImportConfigXmlButtonDisabled
  );
  const updateIsImportConfigXmlButtonGreen = inputState(
    (state) => state.updateIsImportConfigXmlButtonGreen
  );

  // parseSurvey.js
  const unmarkup = (s = '') => s.replace(/\{\{\{(\/?\w+\/?)\}\}\}/g, '<$1>'); // {{{b}}} -> <b>, {{{br/}}} -> <br/>

  const parseSurvey = (xmlString) => {
    // The XML declaration must be the very first characters, so trim leading whitespace
    const doc = new DOMParser().parseFromString(xmlString.trim(), 'application/xml');

    const err = doc.querySelector('parsererror');
    if (err) throw new Error('Invalid XML: ' + err.textContent);

    const items = doc.querySelectorAll('item[id="survey"]');

    // console.log('items', items);

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
    const newData = parseSurvey(data);
    // console.log('data', JSON.stringify(newData, null, 2));
    updateIsImportConfigXmlButtonDisabled(false);
    updateIsLoadConfigXmlButtonGreen(true);
    updateQuinceExportConfigXmlData(newData);
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
    await window.electronAPI.openXmlFile();
  };

  const buttonText = isLoadConfigXmlButtonGreen ? t('Config.xml Loaded') : t('Load config.xml');

  return (
    <button
      onClick={handleClick}
      // className={`${isLoadConfigXmlButtonGreen ? 'bg-primary-button' : 'bg-grey-button'}`}
      className={`text-center font-normal text-[calc(10px+1vw)] font-[Helvetica,sans-serif]
        rounded mr-[3px] mb-[3px]
        no-underline text-black
        transition-[box-shadow] duration-300
        transform translate-z-0
        h-[60px] px-[15px] w-[250px]    
        ${isLoadConfigXmlButtonGreen ? 'bg-primary-button' : 'bg-grey-button'}`}
      id="LoadConfigXmlButton"
    >
      <div className="flex flex-row justify-center items-center h-full w-full gap-3">
        {!isLoadConfigXmlButtonGreen && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="h-[17px] w-[17px] fill-current"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
        )}
        <div className="font-sans text-sm font-bold">{buttonText}</div>
      </div>
    </button>
  );
};

export default LoadConfigXml;
