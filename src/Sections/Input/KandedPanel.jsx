import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import KandedCard from "./Kanded/ExcelT3Card";
import ForcedUnforcedRadio from "./CSV/ForcedUnforcedRadio";
// import ExcelT1Card from "./Excel/ExcelT1Card";
// import ExcelT2Card from "./Excel/ExcelT2Card";

class ExcelPanel extends Component {
    render() {
        const windowHeight = window.innerHeight - 100;
        return (
            <DataWindow height={ windowHeight }>
              <Header>
                Load a KADE or Ken-Q Analysis (web) Excel output file.
              </Header>
              <CardHolder>
                <KandedCard />
                <ForcedUnforcedRadio />
              </CardHolder>
            </DataWindow>
            );
    }
}

export default view(ExcelPanel);

const DataWindow = styled.div`
  height: ${props => (`${props.height}px`)};  
  background-color: white;
  user-select: none;
`;

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: 350px 350px;
  grid-template-rows: 320px 115px 180px;
  align-items: center;
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 22px;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
`;
