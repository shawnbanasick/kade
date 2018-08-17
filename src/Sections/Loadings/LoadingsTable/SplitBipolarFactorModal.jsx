import store from "../../store";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import splitBipolarFactor from "../loadingsLogic/splitBipolarFactor";
import SplitBipolarFactorDropdownSelect from "./SplitBipolarFactorDropdownSelect";

class SplitBipolarFactorButtonModal extends Component {
    handleClose = () => {
        store.setState({
            showSplitFactorModal: false
        });
        splitBipolarFactor();
    };

    render() {
        let showSplitFactorModal = store.getState("showSplitFactorModal");
        if (showSplitFactorModal) {
            return (
                <Modal open={ showSplitFactorModal } onClose={ this.handleClose }>
                  <Header icon="table" content="Factor Loadings Table" />
                  <Modal.Content>
                    <SplitBipolarFactorDropdownSelect />
                  </Modal.Content>
                  <Modal.Actions>
                    <Button id="splitBipolarModalSubmitButton" color="green" style={ { margin: 15 } } floated="right" onClick={ this.handleClose } inverted>
                      Submit
                    </Button>
                  </Modal.Actions>
                </Modal>
                );
        } else {
            return null;
        }
    }
}

export default easyComp(SplitBipolarFactorButtonModal);
