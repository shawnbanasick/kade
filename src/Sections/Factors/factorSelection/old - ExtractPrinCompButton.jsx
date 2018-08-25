import React from "react";
import { view } from "react-easy-state";
import styled from "styled-components";
import store from "../../../store";
import pcaDispatch from "../PcaLogic/pcaDispatch";

const style = {
  // marginLeft: 30,
  // marginTop: 12
};

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
  }

  render() {
    // const isActive = store.getState("activePcaButton");
    const isDisabled = store.getState("disabledPcaButton");
    // const isCalculating = store.getState("calculatingPca");
    const pcaButtonText = store.getState("pcaButtonText");
    return (
      <div>
        <BeginPCAButton
          id="extractPrinCompButton"
          disabled={isDisabled}
          onClick={this.handleClick}
          style={style}
        >
          {pcaButtonText}
        </BeginPCAButton>
      </div>
    );
  }
}
export default view(PCAButton);

const BeginPCAButton = styled.button`
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: ${props => props.buttonColor};
  height: 48px;
  width: 200px;
  border: 1px solid black;
  text-align: center;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border-radius: 4px;
  margin-right: 3px;
  outline: none;
  margin-left: 230px;
  margin-top: 3px;
  box-shadow: 0 2px 2px 0 black;

  &:hover {
    font-weight: bold;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
    margin-left: 30px;
    margin-top: 3px;
  }
`;
