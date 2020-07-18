import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import LoadingsTable from "./LoadingsTable/LoadingsTable";
import loadingState from "../GlobalState/loadingState";
import { useTranslation } from "react-i18next";

const LoadingsTableTransitionContainer = () => {
  const { t } = useTranslation();
  const showLoadingsTable = loadingState.showLoadingsTable;

  // loadings table is still class component, so this is a work around
  // to get proper re-rendering on language change
  const childTrans = {
    none: t("None"),
    colors: t("Colors"),
    gray: t("Gray"),
    autoflag: t("Auto-Flag"),
    all: t("All"),
    default: t("Default sort is by factor group"),
    fg: t("FG highest loading factor"),
    click: t("Click the column headers to resort"),
    send: t("Send Table Data to Output"),
    invert: t("Invert Factor"),
    split: t("Split Bipolar Factor"),
    at: t("at"),
    row: t("Row Highlighting"),
    flagging: t("Flagging")
  };

  if (showLoadingsTable) {
    return (
      <div>
        <LoadingsTable childTrans={childTrans} />
      </div>
    );
  }
  return <DefaultMessage>{t("No factor loadings calculated")}</DefaultMessage>;
};

export default view(LoadingsTableTransitionContainer);

const DefaultMessage = styled.div`
  height: 150px;
  margin-top: 50px;
  font-size: 22px;
`;
