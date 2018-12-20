import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import ForcedUnforcedRadio from "./CSV/ForcedUnforcedRadio";
import UnforcedQsortDesignInput from "./CSV/UnforcedQsortDesignInput";
import PQMethodStaCard from "./PQMethod/PQMethodStaCard";
import PQMethodQsortsCard from "./PQMethod/PQMethodQsortsCard";

// import CsvSuccessfulLoadBar from "./CSV/CsvSuccessfulLoadBar";

class CsvPanel extends Component {
    render() {
        const windowHeight = window.innerHeight - 100;
        return (
            <DataWindow height={ windowHeight }>
              <Header>Load both a statements STA file and Q sorts DAT file.</Header>
              <CardHolder>
                <PQMethodStaCard />
                <PQMethodQsortsCard />
                <ForcedUnforcedRadio />
                <UnforcedQsortDesignInput />
              </CardHolder>
            </DataWindow>
            );
    }
}

export default view(CsvPanel);

const DataWindow = styled.div`
  height: ${props => (`${props.height}px`)};    
  background-color: white;
`;

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: 350px 350px;
  grid-template-rows: 320px 115px 180px;
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 22px;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
`;

