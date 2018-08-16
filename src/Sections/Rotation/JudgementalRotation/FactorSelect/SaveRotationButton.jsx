import React from "react";
import store from "../../../store";
import { Button } from "semantic-ui-react";
import { easyComp } from "react-easy-state";
import transposeMatrix from "../../../Utils/transposeMatrix";
import calcuateSigCriterionValues from "../../varimaxLogic/2calculateSigCriterionValues";
import loadingsTableDataPrep from "../../../S5-loadings/LoadingsTable/loadingsTableDataPrep";

class SaveRotationButton extends React.Component {
  saveRotations(e) {
    e.stopPropagation();

    let rotationDegrees = store.getState("rotationDegrees");

    // moved here to give faster DOM update
    store.setState({
      rotationDegrees: 0,
      showScatterPlotTableDiv: false
    });

    // replace current rot factor matrix with tempRotFacStateArray
    let tempRotFacStateArray = store.getState("tempRotFacStateArray");
    let abFactors = store.getState("abFactors");
    let factorA = abFactors[0];
    let factorB = abFactors[1];

    // update state before re-drawing loadings table
    let tempRotFacStateArray2 = transposeMatrix(tempRotFacStateArray);
    store.setState({
      factorMatrix: tempRotFacStateArray2
    });

    // re-draw loadings table
    let numFactors = store.getState("numFactorsKeptForRot");

    calcuateSigCriterionValues("noFlag");

    loadingsTableDataPrep(numFactors);

    // to archive current rot factor matrix
    let archiveCounter = store.getState("archiveCounter");
    archiveCounter = archiveCounter + 1;
    let archiveName = "facMatrixArc" + archiveCounter;
    store.setState({
      archiveCounter: archiveCounter
    });

    // send archive to storage to use with the undo function in Project History
    sessionStorage.setItem(archiveName, JSON.stringify(tempRotFacStateArray2));

    // update Project History
    let projectHistoryArray = store.getState("projectHistoryArray");
    projectHistoryArray.push(
      "Factors " +
        factorA +
        " and " +
        factorB +
        " rotated by " +
        rotationDegrees +
        " degrees"
    );

    // remove plot and table from DOM and update state
    let userSelectedRotFactors = [];
    abFactors = [];
    store.setState({
      projectHistoryArray: projectHistoryArray,
      highlightRotfactor1: false,
      highlightRotfactor2: false,
      highlightRotfactor3: false,
      highlightRotfactor4: false,
      highlightRotfactor5: false,
      highlightRotfactor6: false,
      highlightRotfactor7: false,
      highlightRotfactor8: false,
      userSelectedRotFactors: userSelectedRotFactors,
      abFactors: abFactors,
      showScatterPlotTableDiv: false,
      // hide section 6
      showOutputFactorSelection: false,
      shouldDisplayFactorVizOptions: false,
      userSelectedFactors: [],      
      showFactorCorrelationsTable: false,
      showStandardErrorsDifferences: false,
      showFactorCharacteristicsTable: false,
      showDownloadOutputButtons: false,
      displayFactorVisualizations: false
    });
  }

  render() {
    let rotationDegrees = store.getState("rotationDegrees");
    let isDisabled = store.getState("bipolarDisabled");
    if (rotationDegrees !== 0) {
      return (
        <div>
          <Button
            id="saveRotationButtonOrange"
            onClick={this.saveRotations}
            disabled={isDisabled}
            color="orange"
          >
            {" "}
            Save Rotation
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button id="saveRotationButtonGray"> Save Rotation</Button>
        </div>
      );
    }
  }
}

export default easyComp(SaveRotationButton);
