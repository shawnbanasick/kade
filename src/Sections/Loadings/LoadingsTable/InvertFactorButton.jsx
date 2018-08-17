import store from "../../store";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import InvertFactorDropdownSelect from "./InvertFactorDropdownSelect";
import invertFactor from "../loadingsLogic/invertFactor";

class InvertFactorButtonModal extends Component {
  store = {
    modalOpen: false
  };

  handleOpen = () => {
    this.store.modalOpen = true;
  };

  handleClose = () => {
    this.store.modalOpen = false;
    invertFactor();
  };

  render() {
    let isDisabled = store.getState("bipolarDisabled");
    return (
      <Modal
        trigger={
          <Button
            id="invertFactorsButton"
            style={{ marginRight: "250px" }} // loading={isLoadingFactorsKept} //
            disabled={isDisabled}
            onClick={this.handleOpen}
          >
            Invert Factor
          </Button>
        }
        open={this.store.modalOpen}
        onClose={this.handleClose}
      >
        <Header icon="table" content="Factor Loadings Table" />
        <Modal.Content>
          <InvertFactorDropdownSelect />
        </Modal.Content>
        <Modal.Actions>
          <Button
            id="invertFactorSubmitButton"
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
}

export default easyComp(InvertFactorButtonModal);
