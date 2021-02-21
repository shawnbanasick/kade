import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import KandedCard from "./Kanded/ExcelT3Card";
import ForcedUnforcedRadio from "./CSV/ForcedUnforcedRadio";
// import ExcelT1Card from "./Excel/ExcelT1Card";
// import ExcelT2Card from "./Excel/ExcelT2Card";
import { useTranslation } from "react-i18next";

const KandedPanel = () => {
  const { t } = useTranslation();

  return (
    <DataWindow>
      <Header>
        {t("Load a KADE or Ken-Q Analysis (web) Excel output file")}
      </Header>
      <CardHolder>
        <KandedCard />
      </CardHolder>
      <ForcedUnforcedRadio />
    </DataWindow>
  );
};

export default view(KandedPanel);

const DataWindow = styled.div`
  background-color: white;
`;

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: 350px 350px;
  grid-template-rows: 320px 115px 1fr;
  align-items: center;
  user-select: none;
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 1.5vw;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
`;
