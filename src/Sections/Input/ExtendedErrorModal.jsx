import React, { Component } from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import { view, store } from "react-easy-state";
import styled from "styled-components";
import state from "../../store";

const localStore = store({
  modalOpen: false
});

const handleOpen = () => {
  localStore.modalOpen = true;
};

const handleClose = () => {
  localStore.modalOpen = false;
};

class ExtendedErrorModal extends Component {
  render() {
    const extendedErrorMessage = state.getState("extendedErrorMessage");
    const errorStackTrace = state.getState("errorStackTrace");
    return (
      <Modal dimmer={ "blurring" } trigger={ <StyledWrapper>
                                         <Button className="wrapper1" onClick={ handleOpen }>
                                           Error Details
                                         </Button>
                                       </StyledWrapper> } open={ localStore.modalOpen } onClose={ handleClose } basic size="small">
        <Header content="Error Details:" />
        <Modal.Content>
          <h4>{ extendedErrorMessage }</h4>
          <StacktraceDiv>
            <h3>Stacktrace:</h3>
            <h4>{ errorStackTrace }</h4>
          </StacktraceDiv>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={ handleClose } inverted>
            Return
          </Button>
        </Modal.Actions>
      </Modal>
      );
  }
}

export default view(ExtendedErrorModal);

const StyledWrapper = styled.div`
  .wrapper1 {
    border: 1px solid black;
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      border: 1px solid black;
      box-shadow: 0 2px 2px 0 black;
    }

    &:active {
      box-shadow: 0 0 1px 0 black inset;
      margin-left: 3px;
      /* margin-top: 3px; */
    }
  }
`;

const StacktraceDiv = styled.div`
  margin-top: 30px;
`;
