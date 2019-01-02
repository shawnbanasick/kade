import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import state from "../../../../store";
import transposeMatrix from "../../../../Utils/transposeMatrix";
import calcuateSigCriterionValues from "../../varimaxLogic/2calculateSigCriterionValues";
import loadingsTableDataPrep from "../../../Loadings/LoadingsTable/loadingsTableDataPrep";

class SaveRotationButton extends React.Component {
  saveRotations(e) {
    e.stopPropagation();

    const rotationDegrees = state.getState("rotationDegrees");

    // moved here to give faster DOM update
    state.setState({
      rotationDegrees: 0,
      showScatterPlotTableDiv: false
    });

    // replace current rot factor matrix with tempRotFacStateArray
    const tempRotFacStateArray = state.getState("tempRotFacStateArray");
    let abFactors = state.getState("abFactors");
    const factorA = abFactors[0];
    const factorB = abFactors[1];

    // update state before re-drawing loadings table
    const tempRotFacStateArray2 = transposeMatrix(tempRotFacStateArray);
    state.setState({
      factorMatrix: tempRotFacStateArray2
    });

    // re-draw loadings table
    const numFactors = state.getState("numFactorsKeptForRot");

    calcuateSigCriterionValues("noFlag");

    loadingsTableDataPrep(numFactors);

    // to archive current rot factor matrix
    let archiveCounter = state.getState("archiveCounter");
    archiveCounter += 1;
    const archiveName = `facMatrixArc${archiveCounter}`;
    state.setState({
      archiveCounter
    });

    // send archive to storage to use with the undo function in Project History
    sessionStorage.setItem(archiveName, JSON.stringify(tempRotFacStateArray2));

    // update Project History
    const projectHistoryArray = state.getState("projectHistoryArray");
    projectHistoryArray.push(
      `Factors ${factorA} and ${factorB} rotated by ${rotationDegrees} degrees`
    );

    // remove plot and table from DOM and update state
    const userSelectedRotFactors = [];
    abFactors = [];
    state.setState({
      projectHistoryArray,
      highlightRotfactor1: false,
      highlightRotfactor2: false,
      highlightRotfactor3: false,
      highlightRotfactor4: false,
      highlightRotfactor5: false,
      highlightRotfactor6: false,
      highlightRotfactor7: false,
      highlightRotfactor8: false,
      userSelectedRotFactors,
      abFactors,
      showScatterPlotTableDiv: false,
      // hide section 6
      showOutputFactorSelection: false,
      shouldDisplayFactorVizOptions: false,
      userSelectedFactors: [],
      showFactorCorrelationsTable: false,
      showStandardErrorsDifferences: false,
      showFactorCharacteristicsTable: false,
      showDownloadOutputButtons: false,
      displayFactorVisualizations: false,
      notifyForSavedRotation: true
    });
  }

  render() {
    const rotationDegrees = state.getState("rotationDegrees");
    const isDisabled = state.getState("bipolarDisabled");
    if (rotationDegrees !== 0) {
      return (
        <StyledWrapper2>
          <Button
            id="saveRotationButtonOrange"
            onClick={this.saveRotations}
            disabled={isDisabled}
            // color="orange"
            className="wrapper2"
          >
            {" "}
            Save Rotation
          </Button>
        </StyledWrapper2>
      );
    }
    return (
      <React.Fragment>
        <StyledWrapper>
          <Button id="saveRotationButtonGray" className="wrapper1">
            {" "}
            Save Rotation
          </Button>
        </StyledWrapper>
      </React.Fragment>
    );
  }
}

export default view(SaveRotationButton);

const StyledWrapper = styled.div`
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
      /* margin-top: 3px; */
    }
  }
`;

const StyledWrapper2 = styled.div`
  .wrapper2 {
    border: 1px solid black;
    box-shadow: 0 2px 2px 0 black;
    background-color: orange !important;

    &:hover {
      border: 1px solid black;
      box-shadow: 0 2px 2px 0 black;
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
      margin-left: 3px;
      /* margin-top: 3px; */
    }
  }
`;
