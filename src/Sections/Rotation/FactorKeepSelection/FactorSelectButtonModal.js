import store from "../../store";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import loadingsTableDataPrep from "../../S5-loadings/LoadingsTable/loadingsTableDataPrep";

class FactorSelectButtonModal extends Component {
    store = {
        modalOpen: false
    };

    handleOpen = () => {
        let numFactorsKept = store.getState("numFactorsKeptForRot");
        if (isNaN(numFactorsKept)) {
            this.store.modalOpen = true;
        } else {
            let projectHistoryText = "Selected " + numFactorsKept + " factors for rotation";
            let projectHistoryArray = store.getState("projectHistoryArray");
            // a shortcut to remove history when selecting a second time
            projectHistoryArray.length = 2;
            projectHistoryArray.push(projectHistoryText);
            let numFactors = store.getState("numFactorsKeptForRot");
            store.setState({
                isLoadingFactorsKept: true
            });
            setTimeout(() => {
                loadingsTableDataPrep(numFactors);
            }, 10);
            store.setState({
                // isLoadingFactorsKept: false,
                isFacSelectDisabled: true,
                shouldDisplayFacKept: true,
                showLoadingsTable: true,
                projectHistoryArray: projectHistoryArray
            });

            // archive values for undo function (ProjectHistory component)
            let archiveCounter = store.getState("archiveCounter");
            let factorMatrix = store.getState("factorMatrix");
            archiveCounter = archiveCounter + 1;
            let archiveName = "facMatrixArc" + archiveCounter;
            store.setState({
                archiveCounter: archiveCounter
            });
            sessionStorage.setItem(archiveName, JSON.stringify(factorMatrix));
        }
    };

    handleClose = () => (this.store.modalOpen = false);

    render() {
        const {active} = this.store.modalOpen;
        let isFacSelectDisabled = store.getState("isFacSelectDisabled");
        let isLoadingFactorsKept = store.getState("isLoadingFactorsKept");
        return (
            <Modal trigger={ <Button id="factorsKeptSubmitButton" size={ "big" } toggle active={ active } disabled={isFacSelectDisabled} loading={ isLoadingFactorsKept } className="instagram" onClick={ this.handleOpen }>
                   Submit
                 </Button> } open={ this.store.modalOpen } onClose={ this.handleClose } basic size="small">
              <Header icon="browser" content="Factor Rotation" />
              <Modal.Content>
                <span style={ { fontSize: 30 } }>
                              Please select the number of factors to keep for rotation.
                            </span>
              </Modal.Content>
              <Modal.Actions>
                <Button id="FactorSelectModalGotItButton" color="green" onClick={ this.handleClose } inverted>
                  <Icon name="checkmark" /> Got it
                </Button>
              </Modal.Actions>
            </Modal>
            );
    }
}

export default easyComp(FactorSelectButtonModal);
