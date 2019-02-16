import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import state from "../../store";
import Dropdown from "./JSON/DropdownJSON";
import JsonQsortsCard from "./JSON/JsonQsortsCard";
import displayJsonData from "./JSON/displayJsonData";
import LoadJsonStatementsCard from './JSON/LoadJsonStatementsCard';
import ProjectNameInput from "./CSV/ProjectNameInput";
import DownloadCsvModal from "./JSON/DownloadCsvModal";
import ForcedUnforcedRadio from "./CSV/ForcedUnforcedRadio";
import QsortDesignInputElement from "./CSV/QsortDesignInputElement";

const handleMessage = jsonIdSelection => {
  displayJsonData(jsonIdSelection);
};

class JsonPanel extends Component {
  render() {
    const options = state.getState("jsonParticipantId") || [];
    const windowHeight = window.innerHeight - 100;
    return (
      <DataWindow height={ windowHeight }>
        <Header>Load both a statements TXT file and Q sorts JSON file.</Header>
        <CardHolder id="JsonCardHolder">
          <LoadJsonStatementsCard />
          <JsonQsortsCard />
          <ProjectNameInput />
          <Dropdown options={ options } class="ui fluid selection dropdown" onChangeMessageUpTree={ handleMessage } />
          <ForcedUnforcedRadio />
          <div />
          <QsortDesignInputElement style={ { gridRowStart: 4 } } />
          <DownloadCsvModal />
        </CardHolder>
      </DataWindow>
      );
  }
}

export default view(JsonPanel);

const DataWindow = styled.div`
  height: calc(100vh - 28px);
  background-color: white;
  user-select: none;
`;

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: 350px 350px;
  grid-template-rows: 320px 55px 50px 100px 100px;
  grid-template-areas:
    "card card"
    "projectName projectName"
    "Qsortsare Qsortsare"
    "design design"
    "unforced unforced"
    ". download";
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 22px;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
`;
