import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import state from "../../store";
import Dropdown from "./JSON/DropdownJSON";
import JsonQsortsCard from "./JSON/JsonQsortsCard";
import displayJsonData from "./JSON/displayJsonData";
import CsvStatementCard from "./CSV/CsvStatementCard";
import ProjectNameInput from "./CSV/ProjectNameInput";
import DownloadCsvModal from "./JSON/DownloadCsvModal";
import ForcedUnforcedRadio from "./CSV/ForcedUnforcedRadio";
import UnforcedQsortDesignInput from "./CSV/UnforcedQsortDesignInput";

class JsonPanel extends Component {
  handleMessage(jsonIdSelection) {
    displayJsonData(jsonIdSelection);
  }

  render() {
    const options = state.getState("jsonParticipantId") || [];
    const windowHeight = window.innerHeight - 100;
    return (
      <DataWindow height={windowHeight}>
        <Header>Load both a statements TXT file and Q sorts CSV file.</Header>
        <CardHolder id="JsonCardHolder">
          <CsvStatementCard />
          <JsonQsortsCard />
          <ProjectNameInput />
          <Dropdown
            options={options}
            class="ui fluid selection dropdown"
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
  height: ${props => `${props.height}px`};
  background-color: white;
  user-select: none;
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
