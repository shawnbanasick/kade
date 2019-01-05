import styled from "styled-components";
import React, { Component } from "react";
import { view, store } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import state from "../../store";
import initialState from "../../initialState";


const localStore = store({
  modalOpen: false
});

const handleOpen = () => {
  localStore.modalOpen = true;
};

const handleClose = () => {
  localStore.modalOpen = false;
};

const clearAnalysis = () => {
  const initialStateValues = initialState();
  state.setState(initialStateValues);
  localStore.modalOpen = false;
  notify();
};


function notify() {
  toast.success("Project Cleared");
// state.setState({
//   notifyDataUploadSuccess: false
// });
}

class ClearProjectModal extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer transition={ Zoom } />
        <Modal dimmer={ "blurring" } trigger={ <ClearProjectButton onClick={ handleOpen } size="large">
                                                 Clear Project
                                               </ClearProjectButton> } open={ localStore.modalOpen } className="wrapper1" onClose={ this.handleClose } basic size={ "small" }>
          <Header content="Clear Project" />
          <Modal.Content>
            <h2>
                                                      This will remove all data and analysis, and cannot be reversed.
                                                    </h2>
            <h2> Are you sure you want to clear the current project?</h2>
          </Modal.Content>
          <Modal.Actions>
            <div style={ { display: "flex" } }>
              <Button size={ "big" } style={ { alignSelf: "flexStart" } } color="green" onClick={ handleClose } inverted>
                No, Go back.
              </Button>
              <Button id="resetAnalysisModalGotItButton" size={ "big" } style={ { alignSelf: "flexEnd", marginLeft: 220 } } color="red" onClick={ clearAnalysis } inverted>
                Yes, delete the
                <br /> data and analysis.
              </Button>
            </div>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
      );
  }
}

export default view(ClearProjectModal);

const ClearProjectButton = styled.button`
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: ${props => props.buttonColor};
  height: 40px;
  width: 195px;
  border: 1px solid black;
  text-align: center;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border-radius: 4px;
  margin-bottom: 3px;
  box-shadow: 0 2px 2px 0 black;
  outline: none;

  &:hover {
    font-weight: bold;
  }

  &:active {
    box-shadow: 0 1px 1px 0 black;
    transform: translateY(1px);
  }
`;

