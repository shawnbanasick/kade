import React, { Component } from "react";
import { view, store } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import state from "../../../store";
import invertFactor from "../loadingsLogic/invertFactor";
import InvertFactorDropdownSelect from "./InvertFactorDropdownSelect";

const localStore = store({ modalOpen: false });

class InvertFactorButtonModal extends Component {
  handleOpen() {
    localStore.modalOpen = true;
  }

  handleClose() {
    localStore.modalOpen = false;
    invertFactor();
  }

  render() {
    const isDisabled = state.getState("bipolarDisabled");
    return (
      <Modal
        trigger={
          <Button
            id="invertFactorsButton"
            className="wrapper1"
            style={{ marginRight: "250px" }} // loading={isLoadingFactorsKept} //
            disabled={isDisabled}
            onClick={this.handleOpen}
          >
            Invert Factor
          </Button>
        }
        open={localStore.modalOpen}
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

export default view(InvertFactorButtonModal);
