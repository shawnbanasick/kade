import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import CsvQsortsCard from "./CSV/CsvQsortsCard";
import ProjectNameInput from "./CSV/ProjectNameInput";
import CsvStatementCard from "./CSV/CsvStatementCard";
import ForcedUnforcedRadio from "./CSV/ForcedUnforcedRadio";
import CsvSuccessfulLoadBar from "./CSV/CsvSuccessfulLoadBar";
import QsortDesignInputElement from "./CSV/QsortDesignInputElement";

class CsvPanel extends Component {
  render() {
    const windowHeight = window.innerHeight - 100;
    return (
      <DataWindow height={windowHeight}>
        <Header style={{ userSelect: "none" }}>
          Load both a statements TXT file and Q sorts CSV file.
        </Header>
        <CardHolder>
          <CsvStatementCard />
          <CsvQsortsCard />
          <ProjectNameInput />
          <ForcedUnforcedRadio />
          <QsortDesignInputElement />
          <CsvSuccessfulLoadBar />
        </CardHolder>
      </DataWindow>
    );
  }
}

export default view(CsvPanel);

// height: ${props => `${props.height}px`};
// 645px  ;
const DataWindow = styled.div`
  height: calc(100vh - 25px);
  background-color: white;
  overflow: hidden;
`;

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: 350px 350px;
  grid-template-rows: 320px 115px 120px;
  user-select: none;
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 22px;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
  user-select: none;
`;

