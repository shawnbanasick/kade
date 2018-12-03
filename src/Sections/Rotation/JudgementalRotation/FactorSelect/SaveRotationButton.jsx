import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import store from "../../../../store";
import transposeMatrix from "../../../../Utils/transposeMatrix";
import calcuateSigCriterionValues from "../../varimaxLogic/2calculateSigCriterionValues";
import loadingsTableDataPrep from "../../../Loadings/LoadingsTable/loadingsTableDataPrep";

class SaveRotationButton extends React.Component {
  saveRotations(e) {
    e.stopPropagation();

    const rotationDegrees = store.getState("rotationDegrees");

    // moved here to give faster DOM update
    store.setState({
      rotationDegrees: 0,
      showScatterPlotTableDiv: false
    });

    // replace current rot factor matrix with tempRotFacStateArray
    const tempRotFacStateArray = store.getState("tempRotFacStateArray");
    let abFactors = store.getState("abFactors");
    const factorA = abFactors[0];
    const factorB = abFactors[1];

    // update state before re-drawing loadings table
    const tempRotFacStateArray2 = transposeMatrix(tempRotFacStateArray);
    store.setState({
      factorMatrix: tempRotFacStateArray2
    });

    // re-draw loadings table
    const numFactors = store.getState("numFactorsKeptForRot");

    calcuateSigCriterionValues("noFlag");

    loadingsTableDataPrep(numFactors);

    // to archive current rot factor matrix
    let archiveCounter = store.getState("archiveCounter");
    archiveCounter += 1;
    const archiveName = `facMatrixArc${archiveCounter}`;
    store.setState({
      archiveCounter
    });

    // send archive to storage to use with the undo function in Project History
    sessionStorage.setItem(archiveName, JSON.stringify(tempRotFacStateArray2));

    // update Project History
    const projectHistoryArray = store.getState("projectHistoryArray");
    projectHistoryArray.push(
      `Factors ${factorA} and ${factorB} rotated by ${rotationDegrees} degrees`
    );

    // remove plot and table from DOM and update state
    const userSelectedRotFactors = [];
    abFactors = [];
    store.setState({
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
    const rotationDegrees = store.getState("rotationDegrees");
    const isDisabled = store.getState("bipolarDisabled");
    if (rotationDegrees !== 0) {
      return (
        <StyledWrapper>
          <Button
            id="saveRotationButtonOrange"
            onClick={this.saveRotations}
            disabled={isDisabled}
            color="orange"
            className="wrapper1"
          >
            {" "}
            Save Rotation
          </Button>
        </StyledWrapper>
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
      margin-top: 3px;
    }
  }
`;
