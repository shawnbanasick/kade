import styled from "styled-components";
import { view } from "react-easy-state";
import React, { Component } from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import state from "../../../store";
import centroidDispatch from "../centroidLogic/centroidDispatch";

class noFacSelectedModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        };
    }

    handleOpen() {
        const numFactors = state.getState("numCentroidFactors");
        if (isNaN(numFactors)) {
            this.setState({
                modalOpen: true
            });
        } else {
            state.setState({
                isCentroidLoading: true
            });
            setTimeout(() => {
                centroidDispatch(numFactors);
                state.setState({
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
    }

    handleClose() {
        this.setState({
            modalOpen: false
        });
    }

    render() {
        const isActive = state.getState("activeCentroidFactorsButton");
        const isDisabled = state.getState("disabledCentroidFactorButton");
        const isCentroidLoading = state.getState("isCentroidLoading");
        return (
            <Modal dimmer={ "blurring" } trigger={ <StyledWrapper>
                                         <StyledButton1 id="noFacSelectedModalButton" className="wrapper1" size={ "small" } toggle active={ isActive } loading={ isCentroidLoading } disabled={ isDisabled }
                                           onClick={ this.handleOpen }>
                                           Centroid Factors
                                         </StyledButton1>
                                       </StyledWrapper> } open={ this.state.modalOpen } className="wrapper1" onClose={ this.handleClose } basic size={ "small" }>
              <Header content="Centroid Factor Extraction" />
              <Modal.Content>
                <h3>Please select the number of factors to extract first.</h3>
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

const StyledWrapper = styled.div`
  margin-right: 140px;

  .wrapper1 {
    border: 1px solid black;
    box-shadow: 0 2px 2px 0 black;

    &:hover {
      border: 1px solid black;
      box-shadow: 0 2px 2px 0 black;
    }

    &:active {
      box-shadow: 0 1px 1px 0 black;
      transform: translateY(1px);
    }
  }
`;


const StyledButton1 = styled.button`
  display: grid;
  align-self: "flexStart",
  align-items: center;
  justify-items: center;
  background-color: #d6dbe0;
  height: 40px;
  width: 170px;
  border: 1px solid black;
  text-align: center;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
  box-shadow: 0 2px 2px 0 black;
  outline: none;

  &:hover {
    font-weight: 900;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 3px;
  }
`;