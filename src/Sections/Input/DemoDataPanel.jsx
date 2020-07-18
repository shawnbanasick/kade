import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import LipsetCard from "./DemoData/LipsetCard";
import BuzzwordCard from "./DemoData/BuzzwordCard";
import MotivationalCard from "./DemoData/MotivationalCard";
import IpadSurveyCard from "./DemoData/IpadSurveyCard";

const CsvPanel = () => {
  return (
    <DataWindow>
      <Header>Choose a demo data file.</Header>
      <CardHolder>
        <LipsetCard />
        <BuzzwordCard />
        <MotivationalCard />
        <IpadSurveyCard />
      </CardHolder>
    </DataWindow>
  );
};

export default view(CsvPanel);

const DataWindow = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  background-color: white;
`;

const CardHolder = styled.div`
  padding-top: 15px;
  padding-left: 30px;
  display: grid;
  grid-template-columns: 350px 350px;
  grid-template-rows: 260px 250px 1fr;
  user-select: none;
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 22px;
  font-weight: bold;
  height: 25px;
  margin-top: 1px;
`;
