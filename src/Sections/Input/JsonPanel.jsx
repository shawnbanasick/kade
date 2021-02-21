import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import Dropdown from "./JSON/DropdownJSON";
import JsonQsortsCard from "./JSON/JsonQsortsCard";
import displayJsonData from "./JSON/displayJsonData";
import LoadJsonStatementsCard from "./JSON/LoadJsonStatementsCard";
import ProjectNameInput from "./CSV/ProjectNameInput";
import DownloadCsvModal from "./JSON/DownloadCsvModal";
import ForcedUnforcedRadio from "./CSV/ForcedUnforcedRadio";
import QsortDesignInputElement from "./CSV/QsortDesignInputElement";
import inputState from "../GlobalState/inputState";
import { useTranslation } from "react-i18next";

const clone = require("rfdc")();

const handleMessage = jsonIdSelection => {
  displayJsonData(jsonIdSelection);
};

const JsonPanel = () => {
  const options = clone(inputState.jsonParticipantId);
  const { t } = useTranslation();

  return (
    <DataWindow>
      <Header>
        {t("Load both a statements TXT file and Q sorts JSON file")}
      </Header>
      <CardHolder id="JsonCardHolder">
        <LoadJsonStatementsCard />
        <JsonQsortsCard />
        <ProjectNameInput />
        <Dropdown
          options={options}
          class="ui fluid selection dropdown"
          onChangeMessageUpTree={handleMessage}
        />
        <div />
        <QsortDesignInputElement style={{ gridRowStart: 4 }} />
        <DownloadCsvModal />
      </CardHolder>
      <ForcedUnforcedRadio />
    </DataWindow>
  );
};

export default view(JsonPanel);

const DataWindow = styled.div`
  background-color: white;
`;

const CardHolder = styled.div`
  display: grid;
  grid-template-columns: 350px 350px 1fr;
  grid-template-rows: 310px 45px 30px 70px 1fr;
  grid-template-areas:
    "card card"
    "projectName projectName"
    "Qsortsare Qsortsare"
    "design design"
    "unforced unforced"
    ". download";
  user-select: none;
`;

const Header = styled.div`
  font-family: Helvetica;
  font-size: 1.5vw;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
`;
