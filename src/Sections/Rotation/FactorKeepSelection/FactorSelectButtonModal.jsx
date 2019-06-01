import React, { Component } from "react";
import styled from "styled-components";
import { view, store } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import loadingsTableDataPrep from "../../Loadings/LoadingsTable/loadingsTableDataPrep";
import state from "../../../store";

const localStore = store({
  isActive: false,
  modalOpen: false
});

const handleOpen = () => {
  const numFactorsKept = state.getState("numFactorsKeptForRot");
  if (isNaN(numFactorsKept)) {
    localStore.modalOpen = true;
  } else {
    localStore.isActive = true;
    const projectHistoryText = `Selected ${numFactorsKept} factors for rotation`;
    const projectHistoryArray = state.getState("projectHistoryArray");
    // a shortcut to remove history when selecting a second time
    projectHistoryArray.length = 2;
    projectHistoryArray.push(projectHistoryText);
    const numFactors = state.getState("numFactorsKeptForRot");
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
      projectHistoryArray
    });

    // localStore.isActive = true;

    // archive values for undo function (ProjectHistory component)
    let archiveCounter = state.getState("archiveCounter");
    const factorMatrix = state.getState("factorMatrix");
    archiveCounter += 1;
    const archiveName = `facMatrixArc${archiveCounter}`;
    state.setState({
      archiveCounter
    });
    sessionStorage.setItem(archiveName, JSON.stringify(factorMatrix));
  }
};

const handleClose = () => {
  localStore.modalOpen = false;
};

class FactorSelectButtonModal extends Component {
  render() {
    const isFacSelectDisabled = state.getState("isFacSelectDisabled");
    localStore.isActive = isFacSelectDisabled;
    const isLoadingFactorsKept = state.getState("isLoadingFactorsKept");
    const isActive = localStore.isActive;
    const showKeepFacForRotButton = state.getState("showKeepFacForRotButton");

    if (showKeepFacForRotButton) {
      return (
        <FactorSelectModalDiv>
          <Modal
            dimmer={"blurring"}
            trigger={
              <StyledWrapper>
                <Button
                  id="factorsKeptSubmitButton"
                  className="wrapper1"
                  size={"medium"}
                  toggle
                  active={isActive}
                  disabled={isFacSelectDisabled}
                  loading={isLoadingFactorsKept}
                  onClick={handleOpen}
                >
                  Submit
                </Button>
              </StyledWrapper>
            }
            open={localStore.modalOpen}
            onClose={handleClose}
            basic
            size="small"
          >
            <Header content="Factor Rotation" />
            <Modal.Content>
              <span style={{ fontSize: 30 }}>
                Please select the number of factors to keep for rotation.
              </span>
            </Modal.Content>
            <Modal.Actions>
              <Button
                id="FactorSelectModalGotItButton"
                color="green"
                onClick={handleClose}
                inverted
              >
                Got it
              </Button>
            </Modal.Actions>
          </Modal>
        </FactorSelectModalDiv>
      );
    }
    return null;
  }
}

export default view(FactorSelectButtonModal);

// grid-row-start: 2;

const FactorSelectModalDiv = styled.div``;

const StyledWrapper = styled.div`
  margin-left: 10px;

  .wrapper1 {
    display: inherit;
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
