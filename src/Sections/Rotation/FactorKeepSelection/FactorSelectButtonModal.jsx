import React, { Component } from "react";
import styled from "styled-components";
import { view, store } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import loadingsTableDataPrep from "../../Loadings/LoadingsTable/loadingsTableDataPrep";
import state from "../../../store";

const localStore = store({
  modalOpen: false
});

const handleOpen = () => {
  const numFactorsKept = state.getState("numFactorsKeptForRot");
  if (isNaN(numFactorsKept)) {
    localStore.modalOpen = true;
  } else {
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
    const {active} = localStore.modalOpen;
    const isFacSelectDisabled = state.getState("isFacSelectDisabled");
    const isLoadingFactorsKept = state.getState("isLoadingFactorsKept");
    return (
      <FactorSelectModalDiv>
        <Modal dimmer={ "blurring" } trigger={ <StyledWrapper>
                                                 <StyledButton1 id="factorsKeptSubmitButton" className="wrapper1" size={ "medium" } toggle active={ active } disabled={ isFacSelectDisabled } loading={ isLoadingFactorsKept }
                                                   onClick={ handleOpen }>
                                                   Submit
                                                 </StyledButton1>
                                               </StyledWrapper> } open={ localStore.modalOpen } onClose={ handleClose } basic size="small">
          <Header content="Factor Rotation" />
          <Modal.Content>
            <span style={ { fontSize: 30 } }>
                    Please select the number of factors to keep for rotation.
                  </span>
          </Modal.Content>
          <Modal.Actions>
            <Button id="FactorSelectModalGotItButton" color="green" onClick={ handleClose } inverted>
              Got it
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
  width: 70px;
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
