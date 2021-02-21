import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import downloadDistStates from "./downloadDistStates";
import outputState from "../../GlobalState/outputState";
import GeneralButton from "../../../Utils/GeneralButton";
import { useTranslation } from "react-i18next";

const clearAllButtons = () => {
  outputState.thresholdButtonActive = false;
  outputState.qSortValueButtonActive = false;
  outputState.statementNumButtonActive = false;
  outputState.zScoreButtonActive = false;
};

const handleDownload = () => {
  downloadDistStates();
};

const handleOnclick = event => {
  const buttonId = event.target.id;

  // clear all button highlighting
  if (buttonId === "thresholdButton") {
    clearAllButtons();
    outputState.thresholdButtonActive = true;
    outputState.distStateListSortKey = "threshold";
  }

  if (buttonId === "qSortValueButton") {
    clearAllButtons();
    outputState.qSortValueButtonActive = true;
    outputState.distStateListSortKey = "qSortValue";
  }

  if (buttonId === "statementNumButton") {
    clearAllButtons();
    outputState.statementNumButtonActive = true;
    outputState.distStateListSortKey = "statementNum";
  }

  if (buttonId === "zScoreButton") {
    clearAllButtons();
    outputState.zScoreButtonActive = true;
    outputState.distStateListSortKey = "zScore";
  }
};

const DistStateListSortByButtons = () => {
  const { t } = useTranslation();

  const shouldDisplayDistStateListButtons = true;
  if (shouldDisplayDistStateListButtons) {
    return (
      <StyledWrapper>
        <TextLabel>{t("Sort By")}</TextLabel>
        <SortButton
          id={"thresholdButton"}
          isActive={outputState.thresholdButtonActive}
          onClick={handleOnclick}
          key={"f1"}
        >
          {t("Threshold")}
        </SortButton>
        <SortButton
          id={"qSortValueButton"}
          isActive={outputState.qSortValueButtonActive}
          onClick={handleOnclick}
          key={"f2"}
        >
          {t("Q Sort Value")}
        </SortButton>
        <SortButton
          id={"statementNumButton"}
          isActive={outputState.statementNumButtonActive}
          onClick={handleOnclick}
          key={"f3"}
        >
          {t("Number")}
        </SortButton>
        <SortButton
          id={"zScoreButton"}
          isActive={outputState.zScoreButtonActive}
          onClick={handleOnclick}
          key={"f4"}
        >
          {t("Z score")}
        </SortButton>
        <SortButton
          id={"downloadButton"}
          className="downloadButton"
          onClick={handleDownload}
          key={"f5"}
        >
          {t("Download")}
        </SortButton>
      </StyledWrapper>
    );
  }
  return null;
};

export default view(DistStateListSortByButtons);

/* 
          begin comparisons
           const lookupArray = [3.891, 3.291, 2.575, 1.96, 1.645, 1.44, 1.28];
          
           const pValuesTextArray = [
            "P < 0.0001",
            "P < 0.001",
            "P < 0.01",
            "P < 0.05",
            "P < 0.1",
            "P < 0.15"
            "P < 0.2"
          ];
          */

const StyledWrapper = styled.div`
  display: flex;
  align-items: baseline;

  .wrapper1 {
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      box-shadow: 0 2px 2px 0 black;
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
    }
  }

  .downloadButton {
    margin-left: 120px;
  }
`;

const TextLabel = styled.div`
  margin-right: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const SortButton = styled(GeneralButton)`
  min-width: 120px;
`;
