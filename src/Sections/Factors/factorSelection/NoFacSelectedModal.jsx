import store from "../../store";
import React, { Component } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import centroidDispatch from "../centroidLogic/centroidDispatch";

export default class ModalExampleControlled extends Component {
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
                    showKeepFacForRotButton: true
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
            <Modal trigger={ <Button id="noFacSelectedModalButton" className="instagram" size={ "big" } toggle active={ isActive } loading={ isCentroidLoading } disabled={ isDisabled }
                   onClick={ this.handleOpen }>
                   Centroid Factors
                 </Button> } open={ this.state.modalOpen } onClose={ this.handleClose } basic size="small">
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
