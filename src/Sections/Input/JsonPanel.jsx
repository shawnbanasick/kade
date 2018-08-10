import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import ForcedUnforcedRadio from "./CSV/ForcedUnforcedRadio";
import UnforcedQsortDesignInput from "./CSV/UnforcedQsortDesignInput";
import ProjectNameInput from "./CSV/ProjectNameInput";
import CsvStatementCard from "./CSV/CsvStatementCard";
import JsonQsortsCard from "./JSON/JsonQsortsCard";
import Dropdown from "../../Utils/Dropdown";
import state from "../../store";
import displayJsonData from "./JSON/displayJsonData";
import DownloadCsvModal from "./JSON/DownloadCsvModal";

class JsonPanel extends Component {
  handleMessage(jsonIdSelection) {
    displayJsonData(jsonIdSelection);
  }

  render() {
    const options = state.getState("jsonParticipantId") || [];

    return (
      <DataWindow>
        <Header>Load both a statements TXT file and Q sorts CSV file.</Header>
        <CardHolder id="JsonCardHolder">
          <CsvStatementCard />
          <JsonQsortsCard />
          <ProjectNameInput />
          <Dropdown
            options={options}
            onChangeMessageUpTree={this.handleMessage}
          />
          <ForcedUnforcedRadio />
          <UnforcedQsortDesignInput />
          <DownloadCsvModal />
        </CardHolder>
      </DataWindow>
    );
  }
}

export default view(JsonPanel);

const DataWindow = styled.div`
  height: 100%;
  background-color: white;
`;

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: 350px 350px;
  grid-template-rows: 320px 95px 80px 130px;
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 22px;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
`;
