import styled from "styled-components";
import React, { Component } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import centroidDispatch from "../centroidLogic/centroidDispatch";
import store from "../../../store";
import { view } from "react-easy-state";

class noFacSelectedModal extends Component {
  state = {
    modalOpen: false
  };

  handleOpen = () => {
    let numFactors = store.getState("numCentroidFactors");
    if (isNaN(numFactors)) {
      console.log("try again");
      this.setState({
        modalOpen: true
      });
    } else {
      store.setState({
        isCentroidLoading: true
      });
      setTimeout(() => {
        centroidDispatch(numFactors);
        store.setState({
          numFacsForTableWidth: numFactors,
          showUnrotatedFactorTable: true,
          showEigenvaluesTable: true,
          showScreePlot: true,
          activeCentroidFactorsButton: true,
          disabledPcaButton: true,
          disabledCentroidFactorButton: true,
          showKeepFacForRotButton: true,
          isFactorsButtonGreen: true
        });
      }, 10);
    }
  };

  handleClose = () => this.setState({
    modalOpen: false
  });

  render() {
    let isActive = store.getState("activeCentroidFactorsButton");
    let isDisabled = store.getState("disabledCentroidFactorButton");
    let isCentroidLoading = store.getState("isCentroidLoading");
    return (
      <Modal trigger={ <StyledWrapper>
                   <Button id="noFacSelectedModalButton" className="wrapper1" size={ "small" } toggle active={ isActive } loading={ isCentroidLoading } disabled={ isDisabled }
                     onClick={ this.handleOpen }>
                     Centroid Factors
                   </Button>
                 </StyledWrapper> } open={ this.state.modalOpen } className="wrapper1" onClose={ this.handleClose } basic size={ "small" }>
        <Header icon="browser" content="Centroid Factor Extraction" />
        <Modal.Content>
          <h3>Please select the number of factors to extract first.</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button id="noFacSelectedModalGotItButton" color="green" onClick={ this.handleClose } inverted>
            <Icon name="checkmark" /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
      );
  }
}

export default view(noFacSelectedModal);

const StyledWrapper = styled.div`
  margin-right: 230px;

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
      margin-top: 3px;
    }
  }
`;
