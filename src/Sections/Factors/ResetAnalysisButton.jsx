import styled from "styled-components";
import React, { Component } from "react";
import { view, store } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import state from "../../store";

const localStore = store({
  modalOpen: false
});

function handleOpen() {
  const numFactors = state.getState("numCentroidFactors");
  if (isNaN(numFactors)) {
    // console.log("try again");
    localStore.modalOpen = true;
  } else {
    localStore.modalOpen = true;
  }
}

function handleClose() {
  localStore.modalOpen = false;
}

function resetAnalysis() {
  const projectHistoryArray = state.getState("projectHistoryArray");
  const newProjectHistoryArray = [projectHistoryArray.shift()];
  const userSelectedRotFactors = [];
  const abFactors = [];

  state.setState({
    projectHistoryArray: newProjectHistoryArray,
    // reset num factors kept for rotation - so warning modal triggers on no selected
    numFactorsKeptForRot: undefined,
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

    // reset centroid factors dropdown
    numCentroidFactors: 7,

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
    abFactors,
    highlightRotfactor1: false,
    highlightRotfactor2: false,
    highlightRotfactor3: false,
    highlightRotfactor4: false,
    highlightRotfactor5: false,
    highlightRotfactor6: false,
    highlightRotfactor7: false,
    highlightRotfactor8: false,
    userSelectedRotFactors,

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
    displayFactorVisualizations: false,

    isLoadingsButtonGreen: false,
    isRotationButtonGreen: false,
    isFactorsButtonGreen: false,
    sendDataToOutputButtonColor: "#d6dbe0"
  });
  handleClose();
}

class ResetAnalysisButton extends Component {
  render() {
    const style = {
      alignSelf: "flexEnd"
    };

    return (
      <Modal dimmer={ "blurring" } trigger={ <StyledWrapper>
                                         <StyledButton1 id="resetAnalysisButton" size={ "small" } className="wrapper1" style={ style } onClick={ handleOpen }>
                                           Reset Analysis
                                         </StyledButton1>
                                       </StyledWrapper> } open={ localStore.modalOpen } onClose={ handleClose } basic size="small">
        <Header content="Reset Analysis" />
        <Modal.Content>
          <h2>This will remove the current analysis and cannot be reversed.</h2>
          <h2> Are you sure you want to reset?</h2>
        </Modal.Content>
        <Modal.Actions>
          <div style={ { display: "flex" } }>
            <Button size={ "big" } style={ { alignSelf: "flexStart" } } color="green" onClick={ handleClose } inverted>
              No, Go back.
            </Button>
            <Button id="resetAnalysisModalGotItButton" size={ "big" } style={ { alignSelf: "flexEnd", marginLeft: 220 } } color="red" onClick={ resetAnalysis } inverted>
              Yes, reset the analysis.
            </Button>
          </div>
        </Modal.Actions>
      </Modal>
      );
  }
}

export default view(ResetAnalysisButton);

const StyledWrapper = styled.div`
  .wrapper1 {
    border: 1px solid black;
    box-shadow: 0 2px 2px 0 black;
    margin-left: 103px;

    &:hover {
      border: 1px solid black;
      box-shadow: 0 2px 2px 0 black;
      font-weight: bold;
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
      margin-left: 103px;
      /* margin-top: 3px; */
    }
  }
`;


const StyledButton1 = styled.button`
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: #d6dbe0;
  height: 40px;
  width: 150px;
  border: 1px solid black;
  text-align: center;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
  box-shadow: 0 2px 2px 0 black;
  outline: none;

  &:hover {
    font-weight: 900;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
  }
`;

