import styled from "styled-components";
import { view, store } from "react-easy-state";
import React, { Component } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
// import store from "../../store";
import initialState from '../../initialState';
import state from '../../store';

const localStore = store({
    modalOpen: false
});

class noFacSelectedModal extends Component {

    handleOpen() {
        localStore.modalOpen = true
    };

    handleClose() {
        localStore.modalOpen = false
    };

    render() {
        // const isActive = store.getState("activeCentroidFactorsButton");
        // const isDisabled = store.getState("disabledCentroidFactorButton");
        // const isCentroidLoading = store.getState("isCentroidLoading");
        return (
            <Modal trigger={ <BeginAnalysisButton onClick={ this.handleOpen } size='large'>Clear Project</BeginAnalysisButton> } open={ localStore.modalOpen } className="wrapper1" onClose={ this.handleClose } basic size={ "small" }>
              <Header content="Centroid Factor Extraction" />
              <Modal.Content>
                <h3>Are you sure you want to clear the project?</h3>
              </Modal.Content>
              <Modal.Actions>
                <Button id="noFacSelectedModalGotItButton" color="green" onClick={ this.handleClose } inverted>
                  Got it
                </Button>
              </Modal.Actions>
            </Modal>
            );
    }
}

export default view(noFacSelectedModal);

// const StyledWrapper = styled.div`
//   margin-right: 140px;

//   .wrapper1 {
//     border: 1px solid black;
//     box-shadow: 0 2px 2px 0 black;

//     &:hover {
//       border: 1px solid black;
//       box-shadow: 0 2px 2px 0 black;
//     }

//     &:active {
//       box-shadow: 0 1px 1px 0 black;
//       transform: translateY(1px);
//       /* margin-left: 3px; */
//       margin-top: 3px;
//     }
//   }
// `;

const BeginAnalysisButton = styled.button`
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
    font-weight: bold
  }

  &:active {
    box-shadow: 0 1px 1px 0 black;
    transform: translateY(1px);  
  }
`;

// import styled, { keyframes } from "styled-components";
