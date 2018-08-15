import store from "../../store";
import React, { Component } from "react";

export default class ResetAnalysisButton extends Component {
    state = {
        modalOpen: false
    };

    handleOpen = () => {
        let numFactors = store.getState("numCentroidFactors");
        if (isNaN(numFactors)) {
            console.log("try again");
            this.setState({
                modalOpen: true
            });
        } else {
            this.setState({
                modalOpen: true
            });
        }
    };

    handleClose = () => this.setState({
        modalOpen: false
    });

    resetAnalysis = () => {
        let projectHistoryArray = store.getState("projectHistoryArray");
        let newProjectHistoryArray = [projectHistoryArray.shift()];
        let userSelectedRotFactors = [];
        let abFactors = [];

        store.setState({
            projectHistoryArray: newProjectHistoryArray,
            // hide section 3
            showUnrotatedFactorTable: false,
            showEigenvaluesTable: false,
            showScreePlot: false,
            disabledPcaButton: false,
            activePcaButton: false,
            activeCentroidFactorsButton: false,
            disabledCentroidFactorButton: false,
            // pcaButtonText: "Principal Components",
            // calculatingPca: false

            // factor select re-enable
            isFacSelectDisabled: false,

            // hide section 4
            shouldDisplayFacKept: false,
            showKeepFacForRotButton: false,
            varimaxButtonDisabled: false,
            varimaxButtonText: "Varimax Rotation",
            varimaxButtonActive: false,

            // reset manual rotation
            shouldShowJudgeRotDiv: false,
            judgeButtonActive: false,
            showScatterPlotTableDiv: false,
            abFactors: abFactors,
            highlightRotfactor1: false,
            highlightRotfactor2: false,
            highlightRotfactor3: false,
            highlightRotfactor4: false,
            highlightRotfactor5: false,
            highlightRotfactor6: false,
            highlightRotfactor7: false,
            highlightRotfactor8: false,
            userSelectedRotFactors: userSelectedRotFactors,

            // bipolar
            bipolarDisabled: false,
            bipolarSplitCount: 0,

            // hide section 5
            showLoadingsTable: false,

            // hide section 6
            showOutputFactorSelection: false,
            shouldDisplayFactorVizOptions: false,
            showFactorCorrelationsTable: false,
            showStandardErrorsDifferences: false,
            showFactorCharacteristicsTable: false,
            showDownloadOutputButtons: false,
            userSelectedFactors: [],
            displayFactorVisualizations: false
        });
        this.handleClose();
    };

    render() {
        const style = {
            alignSelf: "flexEnd"
        };

        return (
            <Modal trigger={ <Button id="resetAnalysisButton" size={ "big" } className="instagram" color="black" basic style={ style } onClick={ this.handleOpen }>
                   Reset Analysis
                 </Button> } open={ this.state.modalOpen } onClose={ this.handleClose } basic size="small">
              <Header icon="browser" content="Reset Analysis" />
              <Modal.Content>
                <h2>This will remove the current analysis and cannot be reversed.</h2>
                <h2> Are you sure you want to reset?</h2>
              </Modal.Content>
              <Modal.Actions>
                <div style={ { display: "flex" } }>
                  <Button size={ "big" } style={ { alignSelf: "flexStart" } } color="green" onClick={ this.handleClose } inverted>
                    No, Go back.
                  </Button>
                  <Button id="resetAnalysisModalGotItButton" size={ "big" } style={ { alignSelf: "flexEnd", marginLeft: 220 } } color="red" onClick={ this.resetAnalysis } inverted>
                    Yes, reset the analysis.
                  </Button>
                </div>
              </Modal.Actions>
            </Modal>
            );
    }
}
