import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import LipsetCard from "./DemoData/LipsetCard";
import BuzzwordCard from "./DemoData/BuzzwordCard";
import MotivationalCard from "./DemoData/MotivationalCard";
import IpadSurveyCard from "./DemoData/IpadSurveyCard";

class CsvPanel extends Component {
  render() {
    const windowHeight = window.innerHeight - 100;
    return (
      <DataWindow height={ windowHeight }>
        <Header>Choose a Demo Data file.</Header>
        <CardHolder>
          <LipsetCard />
          <BuzzwordCard />
          <MotivationalCard />
          <IpadSurveyCard />
        </CardHolder>
      </DataWindow>
      );
  }
}

export default view(CsvPanel);

const DataWindow = styled.div`
  height: ${props => (`${props.height}px`)};    
  padding-top: 10px;
  padding-left: 10px;
  background-color: white;
  user-select: none;
`;

const CardHolder = styled.div`
  padding-top: 30px;
  padding-left: 30px;
  display: grid;
  grid-template-columns: 350px 350px;
  grid-template-rows: 270px 270px 35px;
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 22px;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
`;
