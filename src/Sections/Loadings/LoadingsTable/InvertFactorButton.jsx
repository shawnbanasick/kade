import React, { Component } from "react";
import { view } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import state from "../../../store";
import invertFactor from "../loadingsLogic/invertFactor";
import InvertFactorDropdownSelect from "./InvertFactorDropdownSelect";

class InvertFactorButtonModal extends Component {
    handleClose() {
        state.setState({
            showInvertFactorModal: false
        });
        // send localStore data here - begin inversion process
        invertFactor();
    }

    render() {
        const showInvertFactorModal = state.getState("showInvertFactorModal");
        if (showInvertFactorModal) {
            return (
                <Modal dimmer={ "blurring" } open={ showInvertFactorModal } onClose={ this.handleClose }>
                  <Header content="Factor Loadings Table" />
                  <Modal.Content>
                    <InvertFactorDropdownSelect />
                  </Modal.Content>
                  <Modal.Actions>
                    <Button id="invertFactorSubmitButton" color="green" style={ { margin: 15 } } floated="right" onClick={ this.handleClose } inverted>
                      Submit
                    </Button>
                  </Modal.Actions>
                </Modal>
                );
        }
        return null;
    }
}

export default view(InvertFactorButtonModal);
