import displayJsonData from './JSON/displayJsonData';
import DatabaseSelectButtons from './JSON/DatabaseSelectButtons';
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
      <div className="bg-white">
        <p>JSON panel</p>
        <DatabaseSelectButtons />
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
