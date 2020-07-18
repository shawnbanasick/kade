import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import ExcelT1Card from "./Excel/ExcelT1Card";
import ExcelT2Card from "./Excel/ExcelT2Card";
import ForcedUnforcedRadio from "./CSV/ForcedUnforcedRadio";
import { useTranslation } from "react-i18next";

const ExcelPanel = () => {
  const [t] = useTranslation();

  return (
    <DataWindow>
      <Header>{t("Load a Type 1 or Type 2 Excel file")}</Header>
      <CardHolder>
        <ExcelT1Card />
        <ExcelT2Card />
        <div />
        <ForcedUnforcedRadio />
      </CardHolder>
    </DataWindow>
  );
};

export default view(ExcelPanel);

const DataWindow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${props => props.height};
  min-height: ${props => props.height};
  width: calc(100vw-135);
`;

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: 350px 350px;
  grid-template-rows: 320px 115px 1fr;
  user-select: none;
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 22px;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
`;
