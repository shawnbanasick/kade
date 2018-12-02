import React, { Component } from "react";
import { view } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import store from "../../../store";
import splitBipolarFactor from "../loadingsLogic/splitBipolarFactor";
import SplitBipolarFactorDropdownSelect from "./SplitBipolarFactorDropdownSelect";

class SplitBipolarFactorButtonModal extends Component {
  handleClose() {
    store.setState({
      showSplitFactorModal: false
    });
    splitBipolarFactor();
  }

  render() {
    const showSplitFactorModal = store.getState("showSplitFactorModal");
    if (showSplitFactorModal) {
      return (
        <Modal open={showSplitFactorModal} onClose={this.handleClose}>
          <Header content="Factor Loadings Table" />
          <Modal.Content>
            <SplitBipolarFactorDropdownSelect />
          </Modal.Content>
          <Modal.Actions>
            <Button
              id="splitBipolarModalSubmitButton"
              color="green"
              style={{ margin: 15 }}
              floated="right"
              onClick={this.handleClose}
              inverted
            >
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
