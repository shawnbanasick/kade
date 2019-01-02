import React, { Component } from "react";
import { view } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import state from "../../../store";

class NoLoadingsFlaggedWarningModal extends Component {
  handleClose() {
    state.setState({
      showNoLoadingsFlaggedWarningModal: false,
      showOutputFactorSelection: false,
      showFactorCorrelationsTable: false,
      showStandardErrorsDifferences: false,
      showFactorCharacteristicsTable: false,
      showDownloadOutputButtons: false,
      shouldDisplayFactorVizOptions: false,
      displayFactorVisualizations: false
    });
  }

  render() {
    const showNoLoadingsFlaggedWarningModal = state.getState(
      "showNoLoadingsFlaggedWarningModal"
    );
    const factorsWithoutLoading = state.getState("factorsWithoutLoading");
    if (showNoLoadingsFlaggedWarningModal) {
      return (
        <Modal open={ showNoLoadingsFlaggedWarningModal } onClose={ this.handleClose }>
          <Header content="Error Checking" />
          <Modal.Content>
            <span style={ { fontSize: 30, display: "block" } }>
                      A factor without a flagged loading was selected.
                    </span>
            <span style={ { fontSize: 22, marginTop: 20, display: "block" } }>
                      Problem factors: { factorsWithoutLoading }
                    </span>
          </Modal.Content>
          <Modal.Actions>
            <Button id="noLoadingsFlaggedModalGotItButton" color="green" style={ { margin: 15 } } floated="right" onClick={ this.handleClose } inverted>
              Got it
            </Button>
          </Modal.Actions>
        </Modal>
        );
    }
    return null;
  }
}
export default view(NoLoadingsFlaggedWarningModal);
