import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import downloadExcelDispatch from "../downloadExcelLogic/1_downloadExcelDispatch";
import store from "../../../store";

class DownloadResultsAsExcel extends React.Component {
    store = {
        modalOpen: false
    };

    handleOpen = () => {
        let userSelectedFactors = store.getState("userSelectedFactors");
        if (userSelectedFactors.length === 0) {
            this.store.modalOpen = true;
        } else {
            downloadExcelDispatch();
        }
    };

    handleClose = () => {
        this.store.modalOpen = false;
    };

    render() {
        const {active} = this.store;
        return (
            <Modal trigger={ <StyledWrapper>
                   <Button id="downloadResultsAsExcelButton" className="wrapper1" size={ "large" } toggle active={ active } onClick={ this.handleOpen }>
                     Excel File
                   </Button>
                 </StyledWrapper> } open={ this.store.modalOpen } onClose={ this.handleClose } basic size="small">
              <Header content="Analysis Output" />
              <Modal.Content>
                <span style={ { fontSize: 30 } }>
                              Select the factors to output first.
                            </span>
              </Modal.Content>
              <Modal.Actions>
                <Button id="downloadResultsAsExcelModalGotItButton" size={ "huge" } color="green" onClick={ this.handleClose } inverted>
                  <Icon name="checkmark" /> Got it
                </Button>
              </Modal.Actions>
            </Modal>
            );
    }
}

export default view(DownloadResultsAsExcel);

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
    }
  }
`;
