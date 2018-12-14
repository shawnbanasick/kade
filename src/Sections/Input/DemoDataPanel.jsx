import React, { Component } from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import LipsetCard from "./DemoData/LipsetCard";
import BuzzwordCard from "./DemoData/BuzzwordCard";
import MotivationalCard from "./DemoData/MotivationalCard";
import IpadSurveyCard from "./DemoData/IpadSurveyCard";

class CsvPanel extends Component {
  render() {
    return (
      <DataWindow>
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
  height: calc(100vh-150px);
  background-color: white;
`;

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: 350px 350px;
  grid-template-rows: 270px 270px 75px;
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 22px;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
`;

