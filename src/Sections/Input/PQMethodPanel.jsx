import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import ForcedUnforcedRadio from "./CSV/ForcedUnforcedRadio";
import PQMethodStaCard from "./PQMethod/PQMethodStaCard";
import PQMethodQsortsCard from "./PQMethod/PQMethodQsortsCard";
import { useTranslation } from "react-i18next";

// import CsvSuccessfulLoadBar from "./CSV/CsvSuccessfulLoadBar";

const CsvPanel = () => {
  const { t } = useTranslation();

  return (
    <DataWindow>
      <Header>
        {t("Load both a statements STA file and Q sorts DAT file")}
      </Header>
      <CardHolder>
        <PQMethodStaCard />
        <PQMethodQsortsCard />
      </CardHolder>
      <ForcedUnforcedRadio />
    </DataWindow>
  );
};

export default view(CsvPanel);

const DataWindow = styled.div`
  background-color: white;
`;

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: 350px 350px;
  grid-template-rows: 320px 115px 1fr;
  user-select: none;
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 1.5vw;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
`;
