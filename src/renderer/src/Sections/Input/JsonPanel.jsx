import React from 'react';
import { view } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import Dropdown from './JSON/DropdownJSON';
import JsonQsortsCard from './JSON/JsonQsortsCard';
import displayJsonData from './JSON/displayJsonData';
import LoadJsonStatementsCard from './JSON/LoadJsonStatementsCard';
import ProjectNameInput from './CSV/ProjectNameInput';
import DownloadCsvModal from './JSON/DownloadCsvModal';
import ForcedUnforcedRadio from './CSV/ForcedUnforcedRadio';
import QsortDesignInputElement from './CSV/QsortDesignInputElement';
// import { useTranslation } from "react-i18next";
import getInputState from '../GlobalState/getInputState';
import DatabaseSelectButtons from './JSON/DatabaseSelectButtons';
import CsvJsonCard from './JSON/CsvJsonCard';
import DropdownSheets from './JSON/DropdownSheets';
import ZipErrorCheckButton from './Zip/ZipErrorCheckButton';
import NetlifyCard from './JSON/NetlifyCard';
import NetlifyDropdown from './JSON/NetlifyDropdown';

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
  const options = getInputState('jsonParticipantId');
  // const { t } = useTranslation();
  const showSheetsInput = false; // getInputState("showSheetsInput");
  const showFirebaseInput = true; //getInputState("showFirebaseInput");
  const showNetlifyInput = false; //getInputState("showNetlifyInput");

  if (!showFirebaseInput && !showSheetsInput && !showNetlifyInput) {
    return (
      <DataWindow>
        <DatabaseSelectButtons />
      </DataWindow>
    );
  } else {
    return (
      <DataWindow>
        <DatabaseSelectButtons />
        <CardHolder id="JsonCardHolder">
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
          <ForcedUnforcedRadio number={'5.'} />

          <div />
          <QsortDesignInputElement style={{ gridRowStart: 4 }} number={'6.'} />
          {showFirebaseInput && <DownloadCsvModal />}
          <ZipErrorCheckButton number={'7.'} gridRow={5} />
        </CardHolder>
      </DataWindow>
    );
  }
};

export default view(JsonPanel);

const DataWindow = styled.div`
  background-color: white;
`;

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: 350px 350px 1fr;
  grid-template-rows: 310px 45px 45px 120px 120px 1fr;
  grid-template-areas:
    'card card'
    'projectName projectName'
    'Qsortsare Qsortsare'
    'design design'
    'unforced'
    '. download';
  user-select: none;
`;

/*
const Header = styled.div`
  font-family: Helvetica;
  font-size: 1.5vw;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
`;
*/
