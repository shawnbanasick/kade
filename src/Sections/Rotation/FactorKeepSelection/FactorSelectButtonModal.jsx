import React, { Component } from "react";
import styled from "styled-components";
import { view, store } from "react-easy-state";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import loadingsTableDataPrep from "../../Loadings/LoadingsTable/loadingsTableDataPrep";
import state from "../../../store";

const localStore = store({
  modalOpen: false
});

class FactorSelectButtonModal extends Component {
  handleOpen() {
    let numFactorsKept = state.getState("numFactorsKeptForRot");
    if (isNaN(numFactorsKept)) {
      localStore.modalOpen = true;
    } else {
      let projectHistoryText = "Selected " + numFactorsKept + " factors for rotation";
      let projectHistoryArray = state.getState("projectHistoryArray");
      // a shortcut to remove history when selecting a second time
      projectHistoryArray.length = 2;
      projectHistoryArray.push(projectHistoryText);
      let numFactors = state.getState("numFactorsKeptForRot");
      state.setState({
        isLoadingFactorsKept: true
      });
      setTimeout(() => {
        loadingsTableDataPrep(numFactors);
      }, 10);
      state.setState({
        // isLoadingFactorsKept: false,
        isFacSelectDisabled: true,
        shouldDisplayFacKept: true,
        showLoadingsTable: true,
        projectHistoryArray: projectHistoryArray
      });

      // archive values for undo function (ProjectHistory component)
      let archiveCounter = state.getState("archiveCounter");
      let factorMatrix = state.getState("factorMatrix");
      archiveCounter = archiveCounter + 1;
      let archiveName = "facMatrixArc" + archiveCounter;
      state.setState({
        archiveCounter: archiveCounter
      });
      sessionStorage.setItem(archiveName, JSON.stringify(factorMatrix));
    }
  };

  handleClose = () => (localStore.modalOpen = false);

  render() {
    const {active} = localStore.modalOpen;
    let isFacSelectDisabled = state.getState("isFacSelectDisabled");
    let isLoadingFactorsKept = state.getState("isLoadingFactorsKept");
    return (
      <FactorSelectModalDiv>
        <Modal trigger={ <StyledWrapper>
                           <Button id="factorsKeptSubmitButton" className="wrapper1" size={ "medium" } toggle active={ active } disabled={ isFacSelectDisabled } loading={ isLoadingFactorsKept }
                             onClick={ this.handleOpen }>
                             Submit
                           </Button>
                         </StyledWrapper> } open={ localStore.modalOpen } onClose={ this.handleClose } basic size="small">
          <Header content="Factor Rotation" />
          <Modal.Content>
            <span style={ { fontSize: 30 } }>
                                Please select the number of factors to keep for rotation.
                              </span>
          </Modal.Content>
          <Modal.Actions>
            <Button id="FactorSelectModalGotItButton" color="green" onClick={ this.handleClose } inverted>
              <Icon name="checkmark" /> Got it
            </Button>
          </Modal.Actions>
        </Modal>
      </FactorSelectModalDiv>
      );
  }
}

export default view(FactorSelectButtonModal);

const FactorSelectModalDiv = styled.div`
  grid-row-start: 2;
`;

const StyledWrapper = styled.div`
  margin-left: 10px;
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
