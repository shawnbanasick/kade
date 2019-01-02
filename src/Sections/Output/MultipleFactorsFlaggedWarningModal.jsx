import React, { Component } from "react";
import { view } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import state from "../../store";

function handleClose() {
  state.setState({
    showOutputFactorSelection: false,
    shouldDisplayFactorVizOptions: false,
    showFactorCorrelationsTable: false,
    showStandardErrorsDifferences: false,
    showFactorCharacteristicsTable: false,
    showDownloadOutputButtons: false,
    userSelectedFactors: [],
    displayFactorVisualizations: false,
    showMultipleFactorsFlaggedWarningModal: false
  });
}

class UnforcedWarningModal extends Component {
  render() {
    const showMultipleFactorsFlaggedWarningModal = state.getState(
      "showMultipleFactorsFlaggedWarningModal"
    );
    const sortsFlaggedOnTwoFactors = state.getState("sortsFlaggedOnTwoFactors");
    if (showMultipleFactorsFlaggedWarningModal) {
      return (
        <Modal
          open={showMultipleFactorsFlaggedWarningModal}
          onClose={handleClose}
        >
          <Header content="Warning!" />
          <Modal.Content>
            <span style={{ fontSize: 30, display: "block" }}>
              Q sorts flagged for more than one factor:
            </span>
            <span style={{ fontSize: 22, display: "block" }}>
              {sortsFlaggedOnTwoFactors}
            </span>
          </Modal.Content>
          <Modal.Actions>
            <Button
              id="multipleFactorsFlaggedWarningModalGotItButton"
              color="green"
              style={{ margin: 15 }}
              floated="right"
              onClick={handleClose}
              inverted
            >
              Got it
            </Button>
          </Modal.Actions>
        </Modal>
      );
    }
    return null;
  }
}
export default view(UnforcedWarningModal);
