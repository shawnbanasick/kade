import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import { Button } from "semantic-ui-react";
import store from "../../../store";
import pcaDispatch from "../PcaLogic/pcaDispatch";

class PCAButton extends React.Component {
    handleClick() {
        store.setState({
            calculatingPca: true,
            activePcaButton: true,
            disabledCentroidFactorButton: true,
            disabledPcaButton: true,
            showKeepFacForRotButton: true
        });
        // to allow time for the spinner to display
        setTimeout(() => {
            pcaDispatch();
        }, 10);
        store.setState({
            isFactorsButtonGreen: true
        })
    }

    render() {
        const isActive = store.getState("activePcaButton");
        const isDisabled = store.getState("disabledPcaButton");
        const isCalculating = store.getState("calculatingPca");
        const pcaButtonText = store.getState("pcaButtonText");
        return (
            <div>
              <StyledWrapper>
                <Button id="extractPrinCompButton" className="wrapper1" size={ "small" } toggle active={ isActive } loading={ isCalculating } disabled={ isDisabled }
                  onClick={ this.handleClick }>
                  { pcaButtonText }
                </Button>
              </StyledWrapper>
            </div>
            );
    }
}
export default view(PCAButton);

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
      margin-top: 3px;
    }
  }
`;
