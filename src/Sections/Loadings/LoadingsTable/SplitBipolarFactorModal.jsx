import React, { Component } from "react";
import { view } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import state from "../../../store";
import splitBipolarFactor from "../loadingsLogic/splitBipolarFactor";
import SplitBipolarFactorDropdownSelect from "./SplitBipolarFactorDropdownSelect";

class SplitBipolarFactorButtonModal extends Component {
    handleClose() {
        state.setState({
            showSplitFactorModal: false
        });
    }

    handleClick() {
        state.setState({
            showSplitFactorModal: false
        });
        splitBipolarFactor();
    }

    render() {
        const showSplitFactorModal = state.getState("showSplitFactorModal");
        if (showSplitFactorModal) {
            return (
                <Modal dimmer={ "blurring" } open={ showSplitFactorModal } onClose={ this.handleClose }>
                  <Header content="Factor Loadings Table" />
                  <Modal.Content>
                    <SplitBipolarFactorDropdownSelect />
                  </Modal.Content>
                  <Modal.Actions>
                    <Button id="splitBipolarModalSubmitButton" color="green" style={ { margin: 15 } } floated="right" onClick={ this.handleClick } inverted>
                      Submit
                    </Button>
                  </Modal.Actions>
                </Modal>
                );
        }
        return null;
    }
}

export default view(SplitBipolarFactorButtonModal);

