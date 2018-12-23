import styled from "styled-components";
import React, { Component } from "react";
import { view } from "react-easy-state";
import { Button } from "semantic-ui-react";
import store from "../../../store";
import transposeMatrix from "../../../Utils/transposeMatrix";
import calculateCommunalities from "../../Rotation/varimaxLogic/2calculateCommunalities";
import calcuateSigCriterionValues from "../../Rotation/varimaxLogic/2calculateSigCriterionValues";
import loadingsTableDataPrep from "../LoadingsTable/loadingsTableDataPrep";

const buttonStyle = {
  // border: "solid 2px blue",
  marginTop: "3px"
};

class ProjectHistory extends Component {
  handleUndo() {
    // get counter and adjust value
    let archiveCounter = store.getState("archiveCounter");
    archiveCounter -= 1;
    const previousFacMatrixArchive = `facMatrixArc${archiveCounter}`;

    // remove entry from project history
    const projectHistoryArray = store.getState("projectHistoryArray");
    const typeOfUndo3 = projectHistoryArray.pop();
    const typeOfUndo2 = typeOfUndo3.split(" ");
    const typeOfUndo = typeOfUndo2[0];

    // get the previous matrix from archive
    let previousFacMatrix = JSON.parse(
      sessionStorage.getItem(previousFacMatrixArchive)
    );

    const numFactors = store.getState("numFactorsKeptForRot");
    // see if there are other bipolar splits
    let bipolarSplitCount = store.getState("bipolarSplitCount");

    if (typeOfUndo === "Bipolar") {
      previousFacMatrix = JSON.parse(
        sessionStorage.getItem("undoAllBipolarMatrix")
      );

      const projectHistoryArrayLength = JSON.parse(
        sessionStorage.getItem("projectHistoryArrayLength")
      );

      // remove all listings of bipolar splits from history array
      projectHistoryArray.length = projectHistoryArrayLength;

      bipolarSplitCount = 0;
      archiveCounter -= 1;
    }

    // ************* Regular Undo

    // reset significance calculations
    const previousFacMatrix2 = transposeMatrix([...previousFacMatrix]);
    calculateCommunalities(previousFacMatrix2);
    calcuateSigCriterionValues("noFlag");

    // restore previous factor matrix to current factor matrix
    store.setState({
      factorMatrix: previousFacMatrix
    });

    // re-draw loadings table
    loadingsTableDataPrep(numFactors);

    // todo - undo name change of varimax button text on varimax undo
    if (typeOfUndo === "Varimax") {
      store.setState({
        archiveCounter,
        projectHistoryArray,
        varimaxButtonActive: false,
        varimaxButtonDisabled: false,
        varimaxButtonText: "Varimax Rotation",
        // hide section 6
        showOutputFactorSelection: false,
        userSelectedFactors: [],
        shouldDisplayFactorVizOptions: false,
        showFactorCorrelationsTable: false,
        showStandardErrorsDifferences: false,
        showFactorCharacteristicsTable: false,
        showDownloadOutputButtons: false,
        displayFactorVisualizations: false,
        sendDataToOutputButtonColor: "#d6dbe0",
        // reset manual rotation
        shouldShowJudgeRotDiv: false,
        judgeButtonActive: false,
        showScatterPlotTableDiv: false,
        abFactors: [],
        highlightRotfactor1: false,
        highlightRotfactor2: false,
        highlightRotfactor3: false,
        highlightRotfactor4: false,
        highlightRotfactor5: false,
        highlightRotfactor6: false,
        highlightRotfactor7: false,
        highlightRotfactor8: false,
        userSelectedRotFactors: []
      });
      return; // early return varimax undo
    }

    if (typeOfUndo === "Selected") {
      store.setState({
        archiveCounter,
        projectHistoryArray,
        // hide section 4
        shouldDisplayFacKept: false,
        varimaxButtonDisabled: false,
        // reset manual rotation
        shouldShowJudgeRotDiv: false,
        judgeButtonActive: false,
        showScatterPlotTableDiv: false,
        abFactors: [],
        highlightRotfactor1: false,
        highlightRotfactor2: false,
        highlightRotfactor3: false,
        highlightRotfactor4: false,
        highlightRotfactor5: false,
        highlightRotfactor6: false,
        highlightRotfactor7: false,
        highlightRotfactor8: false,
        userSelectedRotFactors: [],
        // hide section 5
        showLoadingsTable: false,
        // hide section 6
        showOutputFactorSelection: false,
        shouldDisplayFactorVizOptions: false,
        userSelectedFactors: [],
        showFactorCorrelationsTable: false,
        showStandardErrorsDifferences: false,
        showFactorCharacteristicsTable: false,
        showDownloadOutputButtons: false,
        displayFactorVisualizations: false,
        sendDataToOutputButtonColor: "#d6dbe0"
      });
      return;
    }

    // default undo
    store.setState({
      archiveCounter,
      bipolarSplitCount,
      projectHistoryArray,
      // hide section 6
      userSelectedFactors: [],
      showOutputFactorSelection: false,
      shouldDisplayFactorVizOptions: false,
      showFactorCorrelationsTable: false,
      showStandardErrorsDifferences: false,
      showFactorCharacteristicsTable: false,
      showDownloadOutputButtons: false,
      displayFactorVisualizations: false,
      bipolarDisabled: false,
      bipolarIndexArray: [],
      shouldDisplayFactorViz: false,
      sendDataToOutputButtonColor: "#d6dbe0"
    });
    // normal return
  }

  render() {
    const projectHistoryArray = store.getState("projectHistoryArray");
    const shouldDisplayUndoButton = projectHistoryArray.length > 3;
    return (
      <div style={{ marginTop: "30px", userSelect: "none" }}>
        <TitleDiv>Project History</TitleDiv>
        <CustomOl>
          {projectHistoryArray.map((listValue, index) => (
            <li key={index}>{listValue}</li>
          ))}
        </CustomOl>
        {shouldDisplayUndoButton && (
          <StyledWrapper>
            <Button
              id="undoButton"
              className="wrapper1"
              onClick={this.handleUndo.bind(this)}
              style={buttonStyle}
              size="tiny"
            >
              Undo Last Action
            </Button>
          </StyledWrapper>
        )}
      </div>
    );
  }
}

export default view(ProjectHistory);

const TitleDiv = styled.div`
  font-size: 28px;
  margin-bottom: 5px;
  height: 35px;
`;

const CustomOl = styled.ol`
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 20px;
  line-height: 2em;
`;

const StyledWrapper = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  .wrapper1 {
    border: 1px solid black;
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      border: 1px solid black;
      box-shadow: 0 2px 2px 0 black;
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
      margin-left: 3px;
      margin-top: 3px;
    }
  }
`;
