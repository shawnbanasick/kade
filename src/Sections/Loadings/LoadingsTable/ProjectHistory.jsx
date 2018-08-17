import store from "../../store";
import transposeMatrix from "../../Utils/transposeMatrix";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import { Button } from "semantic-ui-react";
import calculateCommunalities from "../../S4-rotation/varimaxLogic/2calculateCommunalities";
import calcuateSigCriterionValues from "../../S4-rotation/varimaxLogic/2calculateSigCriterionValues";
import loadingsTableDataPrep from "../../S5-loadings/LoadingsTable/loadingsTableDataPrep";

const olStyles = {
    // border: "solid 2px red",
    marginTop: "2px",
    marginBottom: "2px",
    fontSize: "16px"
};

const spanStyle = {
    fontSize: "28px"
};

const buttonStyle = {
    // border: "solid 2px blue",
    marginTop: "3px"
};

class ProjectHistory extends Component {
    handleUndo = () => {
        // get counter and adjust value
        let archiveCounter = store.getState("archiveCounter");
        archiveCounter = archiveCounter - 1;
        let previousFacMatrixArchive = "facMatrixArc" + archiveCounter;

        // remove entry from project history
        let projectHistoryArray = store.getState("projectHistoryArray");
        let typeOfUndo3 = projectHistoryArray.pop();
        let typeOfUndo2 = typeOfUndo3.split(" ");
        let typeOfUndo = typeOfUndo2[0];

        // get the previous matrix from archive
        let previousFacMatrix = JSON.parse(
            sessionStorage.getItem(previousFacMatrixArchive)
        );

        let numFactors = store.getState("numFactorsKeptForRot");
        // see if there are other bipolar splits
        let bipolarSplitCount = store.getState("bipolarSplitCount");

        if (typeOfUndo === "Bipolar") {
            previousFacMatrix = JSON.parse(
                sessionStorage.getItem("undoAllBipolarMatrix")
            );

            let projectHistoryArrayLength = JSON.parse(
                sessionStorage.getItem("projectHistoryArrayLength")
            );

            // remove all listings of bipolar splits from history array
            projectHistoryArray.length = projectHistoryArrayLength;

            bipolarSplitCount = 0;
            archiveCounter = archiveCounter - 1;
        }

        // ************* Regular Undo

        // reset significance calculations
        let previousFacMatrix2 = transposeMatrix([...previousFacMatrix]);
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
                archiveCounter: archiveCounter,
                projectHistoryArray: projectHistoryArray,
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
                displayFactorVisualizations: false
            });
            return; // early return varimax undo
        }

        if (typeOfUndo === "Selected") {
            store.setState({
                archiveCounter: archiveCounter,
                projectHistoryArray: projectHistoryArray,
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
                displayFactorVisualizations: false
            });
            return;
        }

        // default undo
        store.setState({
            archiveCounter: archiveCounter,
            bipolarSplitCount: bipolarSplitCount,
            projectHistoryArray: projectHistoryArray,
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
            shouldDisplayFactorViz: false
        });
        return; // normal return
    };

    render() {
        let projectHistoryArray = store.getState("projectHistoryArray");
        let shouldDisplayUndoButton = projectHistoryArray.length > 3 ? true : false;
        return (
            <div style={ { marginTop: "30px" } }>
              <span style={ spanStyle }>Project History</span>
              <ol style={ olStyles }>
                { projectHistoryArray.map(function(listValue, index) {
                      return <li key={ index }>
                               { listValue }
                             </li>;
                  }) }
              </ol>
              { shouldDisplayUndoButton && (
                <Button id="undoButton" onClick={ this.handleUndo.bind(this) } style={ buttonStyle } size="tiny">
                  Undo Last Action
                </Button>
                ) }
            </div>
            );
    }
}

export default easyComp(ProjectHistory);
