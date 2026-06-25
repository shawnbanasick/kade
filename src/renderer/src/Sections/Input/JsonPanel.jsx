import displayJsonData from './JSON/displayJsonData';
// import DatabaseSelectButtons from './JSON/DatabaseSelectButtons';
import Dropdown from './JSON/DropdownJSON';
import JsonQsortsCard from './JSON/JsonQsortsCard';
import LoadJsonStatementsCard from './JSON/LoadJsonStatementsCard';
import ProjectNameInput from './CSV/ProjectNameInput';
import CsvJsonCard from './JSON/CsvJsonCard';
import DropdownSheets from './JSON/DropdownSheets';
import NetlifyCard from './JSON/NetlifyCard';
import inputState from '../GlobalState/inputState';
import NetlifyDropdown from './JSON/NetlifyDropdown';
import { useTranslation } from 'react-i18next';

const handleMessage = (jsonIdSelection) => {
  displayJsonData(jsonIdSelection);
};

const handleSheetsMessage = (sheetsIdSelection) => {
  console.log(sheetsIdSelection);
};

const handleNetlifyMessage = (netlifyIdSelection) => {
  console.log(netlifyIdSelection);
};

const JsonPanel = () => {
  const options = inputState((state) => state.jsonParticipantId);
  const showSheetsInput = inputState((state) => state.showSheetsInput);
  const showFirebaseInput = inputState((state) => state.showFirebaseInput);
  const showNetlifyInput = inputState((state) => state.showNetlifyInput);

  const { t } = useTranslation();

  if (!showFirebaseInput && !showSheetsInput && !showNetlifyInput) {
    return (
      <div className="flex flex-col bg-white text-2xl">
        <div className="text-5xl mt-2 mb-10">{t('EQ Web Sort File Input')}</div>

        <p className="text-xl text-gray-700">
          For EQ Web Sort data, please use the online legacy data converter
        </p>
        <a
          href="https://kade-legacy-data-conversion.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center w-75 justify-center mt-4 gap-1.5 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-sm font-medium rounded-lg hover:text-white! transition-colors duration-100"
        >
          Visit the legacy data converter ↗
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <DatabaseSelectButtons />
      <div
        id="JsonCardHolder"
        className="grid select-none"
        style={{
          gridTemplateColumns: '350px 350px 1fr',
          gridTemplateRows: '310px 45px 45px 120px 120px 1fr',
          gridTemplateAreas: `
            'card card'
            'projectName projectName'
            'Qsortsare Qsortsare'
            'design design'
            'unforced'
            '. download'
          `,
        }}
      >
        <LoadJsonStatementsCard />
        {showFirebaseInput && <JsonQsortsCard />}
        {showSheetsInput && <CsvJsonCard />}
        {showNetlifyInput && <NetlifyCard />}
        {showNetlifyInput && <div />}
        {showSheetsInput && <div />}
        <ProjectNameInput />
        {showFirebaseInput && (
          <Dropdown
            id="select1"
            options={options}
            class="ui fluid selection dropdown"
            onChangeMessageUpTree={handleMessage}
          />
        )}
        {showSheetsInput && (
          <DropdownSheets
            id="selectSheets"
            options={options}
            class="ui fluid selection dropdown"
            onChangeMessageUpSheetsTree={handleSheetsMessage}
          />
        )}
        {showNetlifyInput && (
          <NetlifyDropdown
            id="selectNetlify"
            options={options}
            class="ui fluid selection dropdown"
            onChangeMessageUpNetlifyTree={handleNetlifyMessage}
          />
        )}
        <div />
      </div>
    </div>
  );
};

export default JsonPanel;
