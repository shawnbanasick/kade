import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import ExcelT1Card from "./Excel/ExcelT1Card";
import ExcelT2Card from "./Excel/ExcelT2Card";
import ForcedUnforcedRadio from "./CSV/ForcedUnforcedRadio";

class ExcelPanel extends Component {
  render() {
    const windowHeight = window.innerHeight - 100;
    return (
      <DataWindow height={ windowHeight }>
        <Header>Load a Type 1 or Type 2 Excel file.</Header>
        <CardHolder>
          <ExcelT1Card />
          <ExcelT2Card />
          <div/>
          <ForcedUnforcedRadio />
        </CardHolder>
      </DataWindow>
      );
  }
}

export default view(ExcelPanel);

const DataWindow = styled.div`
  height: ${props => `${props.height}px`};
  background-color: white;
  user-select: none;
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
