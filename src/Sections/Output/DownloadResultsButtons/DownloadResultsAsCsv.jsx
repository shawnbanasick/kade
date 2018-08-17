import React from "react";
import { easyComp } from "react-easy-state";
import store from "../../store";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import downloadResultsAsCsv from "../downloadCsvLogic/downloadCsvOutputFile";

class DownloadResultsAsExcel extends React.Component {
    store = {
        modalOpen: false
    };

    handleOpen = () => {
        let userSelectedFactors = store.getState("userSelectedFactors");
        if (userSelectedFactors.length === 0) {
            console.log("must select factors first");
            this.store.modalOpen = true;
        } else {
            downloadResultsAsCsv();
        }
    };

    handleClose = () => {
        this.store.modalOpen = false;
    };

    render() {
        const {active} = this.store;
        return (
            <Modal trigger={ <Button id="downloadResultsAsCsvButton" className="instagram" size={ "large" } style={ { marginTop: 50 } } toggle active={ active } onClick={ this.handleOpen }>
                   CSV File
                 </Button> } open={ this.store.modalOpen } onClose={ this.handleClose } basic size="small">
              <Header icon="browser" content="Analysis Output" />
              <Modal.Content>
                <span style={ { fontSize: 30 } }>
                        Select the factors to output first.
                      </span>
              </Modal.Content>
              <Modal.Actions>
                <Button id="downloadResultsAsCsvModalGotItButton" size={ "huge" } color="green" onClick={ this.handleClose } inverted>
                  <Icon name="checkmark" /> Got it
                </Button>
              </Modal.Actions>
            </Modal>
            );
    }
}

export default easyComp(DownloadResultsAsExcel);
