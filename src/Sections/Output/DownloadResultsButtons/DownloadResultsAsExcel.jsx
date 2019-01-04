import React from "react";
import styled from "styled-components";
import { view, store } from "react-easy-state";
import { Button, Header, Modal } from "semantic-ui-react";
import downloadExcelDispatch from "../downloadExcelLogic/1_downloadExcelDispatch";
import state from "../../../store";

const localStore = store({
    modalOpen: false
});

const handleOpen = () => {
    const userSelectedFactors = state.getState("userSelectedFactors");
    if (userSelectedFactors.length === 0) {
        localStore.modalOpen = true;
    } else {
        downloadExcelDispatch();
    }
};

const handleClose = () => {
    localStore.modalOpen = false;
};

class DownloadResultsAsExcel extends React.Component {
    render() {
        const {active} = localStore;
        return (
            <Modal dimmer={ "blurring" } trigger={ <StyledWrapper>
                                         <Button id="downloadResultsAsExcelButton" className="wrapper1" size={ "large" } toggle active={ active } onClick={ handleOpen }>
                                           Excel File
                                         </Button>
                                       </StyledWrapper> } open={ localStore.modalOpen } onClose={ handleClose } basic size="small">
              <Header content="Analysis Output" />
              <Modal.Content>
                <span style={ { fontSize: 30 } }>
                              Select the factors to output first.
                            </span>
              </Modal.Content>
              <Modal.Actions>
                <Button id="downloadResultsAsExcelModalGotItButton" size={ "huge" } color="green" onClick={ handleClose } inverted>
                  Got it
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
