import React from "react";
import styled from "styled-components";
import { view } from "react-easy-state";
import { Button } from "semantic-ui-react";
import state from "../../../store";
import pcaDispatch from "../PcaLogic/pcaDispatch";

function handleClick() {
  state.setState({
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
  state.setState({
    isFactorsButtonGreen: true
  });
}

class PCAButton extends React.Component {
  render() {
    const isActive = state.getState("activePcaButton");
    const isDisabled = state.getState("disabledPcaButton");
    const isCalculating = state.getState("calculatingPca");
    const pcaButtonText = state.getState("pcaButtonText");
    return (
      <div>
        <StyledWrapper>
          <Button id="extractPrinCompButton" className="wrapper1" size={ "large" } compact toggle active={ isActive } loading={ isCalculating } disabled={ isDisabled }
            onClick={ handleClick }>
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
      /* margin-left: 3px; */
      /* margin-top: 3px; */
    }
  }
`;

const StyledButton1 = styled.button`
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: #d6dbe0;
  height: 40px;
  width: 200px;
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
