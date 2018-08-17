import store from "../../store";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

class NoLoadingsFlaggedWarningModal extends Component {
    handleClose = () => {
        store.setState({
            showNoLoadingsFlaggedWarningModal: false,
            showOutputFactorSelection: false,
            showFactorCorrelationsTable: false,
            showStandardErrorsDifferences: false,
            showFactorCharacteristicsTable: false,
            showDownloadOutputButtons: false,
            shouldDisplayFactorVizOptions: false,
            displayFactorVisualizations: false
        });
    };

    render() {
        let showNoLoadingsFlaggedWarningModal = store.getState(
            "showNoLoadingsFlaggedWarningModal"
        );
        let factorsWithoutLoading = store.getState("factorsWithoutLoading");
        if (showNoLoadingsFlaggedWarningModal) {
            return (
                <Modal open={ showNoLoadingsFlaggedWarningModal } onClose={ this.handleClose }>
                  <Header icon="browser" content="Error Checking" />
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
                      <Icon name="checkmark" /> Got it
                    </Button>
                  </Modal.Actions>
                </Modal>
                );
        } else {
            return null;
        }
    }
}
export default easyComp(NoLoadingsFlaggedWarningModal);
