import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import CsvQsortsCard from "./CSV/CsvQsortsCard";
import ProjectNameInput from "./CSV/ProjectNameInput";
import CsvStatementCard from "./CSV/CsvStatementCard";
import ForcedUnforcedRadio from "./CSV/ForcedUnforcedRadio";
import CsvSuccessfulLoadBar from "./CSV/CsvSuccessfulLoadBar";
import QsortDesignInputElement from "./CSV/QsortDesignInputElement";
import { useTranslation } from "react-i18next";

const CsvPanel = () => {
  // const windowHeight = window.innerHeight - 100;
  const { t } = useTranslation();

  return (
    <DataWindow>
      <Header style={{ userSelect: "none" }}>
        {t("Load both a statements TXT file and Q sorts CSV file")}
      </Header>
      <CardHolder>
        <CsvStatementCard />
        <CsvQsortsCard />
        <ProjectNameInput />
      </CardHolder>
      <ForcedUnforcedRadio />
      <QsortDesignInputElement />
      <CsvSuccessfulLoadBar />
    </DataWindow>
  );
};

export default view(CsvPanel);

// height: ${props => `${props.height}px`};
// 645px  ;
const DataWindow = styled.div`
  background-color: white;
  overflow: hidden;
`;

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: 350px 400px;
  grid-template-rows: 320px 50px 1fr;
  user-select: none;
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 1.5vw;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
  user-select: none;
`;
