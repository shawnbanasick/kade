import React from "react";
import styled from "styled-components";
import { view, store } from "react-easy-state";
import { Button } from "semantic-ui-react";
import state from "../../../store";
import downloadDistStates from "./downloadDistStates";

const localStore = store({
  thresholdButtonActive: true,
  qSortValueButtonActive: false,
  statementNumButtonActive: false,
  zScoreButtonActive: false
});

const clearAllButtons = () => {
  localStore.thresholdButtonActive = false;
  localStore.qSortValueButtonActive = false;
  localStore.statementNumButtonActive = false;
  localStore.zScoreButtonActive = false;
};

const handleDownload = () => {
  downloadDistStates();
};

const handleOnclick = event => {
  const buttonId = event.target.id;

  // clear all button highlighting

  if (buttonId === "thresholdButton") {
    clearAllButtons();
    localStore.thresholdButtonActive = true;
    state.setState({ distStateListSortKey: "threshold" });
  }

  if (buttonId === "qSortValueButton") {
    clearAllButtons();
    localStore.qSortValueButtonActive = true;
    state.setState({ distStateListSortKey: "qSortValue" });
  }

  if (buttonId === "statementNumButton") {
    clearAllButtons();
    localStore.statementNumButtonActive = true;
    state.setState({ distStateListSortKey: "statementNum" });
  }

  if (buttonId === "zScoreButton") {
    clearAllButtons();
    localStore.zScoreButtonActive = true;
    state.setState({ distStateListSortKey: "zScore" });
  }
};

class DistStateListSortByButtons extends React.Component {
  render() {
    const shouldDisplayDistStateListButtons = true;
    // const rotationDegreeInputDisplay =  localStore.rotationDegreeInput
    if (shouldDisplayDistStateListButtons) {
      return (
        <StyledWrapper>
          <TextLabel>Sort By:</TextLabel>
          <Button
            id={"thresholdButton"}
            className="wrapper1"
            toggle
            active={localStore.thresholdButtonActive}
            onClick={handleOnclick}
            key={"f1"}
          >
            Threshold
          </Button>
          <Button
            id={"qSortValueButton"}
            className="wrapper1"
            toggle
            active={localStore.qSortValueButtonActive}
            onClick={handleOnclick}
            key={"f2"}
          >
            Q Sort Value
          </Button>
          <Button
            id={"statementNumButton"}
            className="wrapper1"
            toggle
            active={localStore.statementNumButtonActive}
            onClick={handleOnclick}
            key={"f3"}
          >
            Statement Number
          </Button>
          <Button
            id={"zScoreButton"}
            className="wrapper1"
            toggle
            active={localStore.zScoreButtonActive}
            onClick={handleOnclick}
            key={"f4"}
          >
            Z score
          </Button>
          <Button
            id={"downloadButton"}
            className="wrapper1 downloadButton"
            onClick={handleDownload}
            key={"f5"}
          >
            Download
          </Button>
        </StyledWrapper>
      );
    }
    return null;
  }
}

export default view(DistStateListSortByButtons);

/* 
          begin comparisons
           const lookupArray = [3.906, 3.291, 2.575, 1.96, 1.645, 1.44, 1.28];
          
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
    border: 1px solid black;
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      border: 1px solid black;
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
