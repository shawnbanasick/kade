import React, { Component } from "react";
import { view, store } from "react-easy-state";
import styled from "styled-components";
import state from "../../../store";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import loadingsTableDataPrep from "../../Loadings/LoadingsTable/loadingsTableDataPrep";

const localStore = store({
  modalOpen: false
});

class FactorSelectButtonModal extends Component {
  handleOpen = () => {
    let numFactorsKept = state.getState("numFactorsKeptForRot");
    if (isNaN(numFactorsKept)) {
      localStore.modalOpen = true;
    } else {
      let projectHistoryText =
        "Selected " + numFactorsKept + " factors for rotation";
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
    const { active } = localStore.modalOpen;
    let isFacSelectDisabled = state.getState("isFacSelectDisabled");
    let isLoadingFactorsKept = state.getState("isLoadingFactorsKept");
    return (
      <FactorSelectModalDiv>
        <Modal
          trigger={
            <Button
              id="factorsKeptSubmitButton"
              size={"big"}
              toggle
              active={active}
              disabled={isFacSelectDisabled}
              loading={isLoadingFactorsKept}
              className="instagram"
              onClick={this.handleOpen}
            >
              Submit
            </Button>
          }
          open={localStore.modalOpen}
          onClose={this.handleClose}
          basic
          size="small"
        >
          <Header icon="browser" content="Factor Rotation" />
          <Modal.Content>
            <span style={{ fontSize: 30 }}>
              Please select the number of factors to keep for rotation.
            </span>
          </Modal.Content>
          <Modal.Actions>
            <Button
              id="FactorSelectModalGotItButton"
              color="green"
              onClick={this.handleClose}
              inverted
            >
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
