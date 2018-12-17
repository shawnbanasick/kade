import React, { Component } from "react";
import { view } from "react-easy-state";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import store from "../../store";

class UnforcedWarningModal extends Component {
    handleClose() {
        store.setState({
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

    render() {
        const showMultipleFactorsFlaggedWarningModal = store.getState(
            "showMultipleFactorsFlaggedWarningModal"
        );
        const sortsFlaggedOnTwoFactors = store.getState("sortsFlaggedOnTwoFactors");
        if (showMultipleFactorsFlaggedWarningModal) {
            return (
                <Modal open={ showMultipleFactorsFlaggedWarningModal } onClose={ this.handleClose }>
                  <Header content="Warning!" />
                  <Modal.Content>
                    <span style={ { fontSize: 30, display: "block" } }>
                                      Q-sorts flagged for more than one factor:
                                    </span>
                    <span style={ { fontSize: 22, display: "block" } }>
                                      { sortsFlaggedOnTwoFactors }
                                    </span>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button id="multipleFactorsFlaggedWarningModalGotItButton" color="green" style={ { margin: 15 } } floated="right" onClick={ this.handleClose } inverted>
                      <Icon name="checkmark" /> Got it
                    </Button>
                  </Modal.Actions>
                </Modal>
                );
        }
        return null;

    }
}
export default view(UnforcedWarningModal);
