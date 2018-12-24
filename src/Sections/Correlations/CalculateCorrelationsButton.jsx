import styled from "styled-components";
import React, { Component } from "react";
import { view, store } from "react-easy-state";
import state from "../../store";
import mainCorrCalcs from "./correlationsLogic/mainCorrCalcs";

const localStore = store({
  buttonColor: "#d6dbe0"
});

const handleClick = () => {
  const respondentNames = state.getState("respondentNames");

  const mainDataObject = state.getState("mainDataObject");
  const rawSortsArray = mainDataObject.map(item => item.rawSort);

  mainCorrCalcs(respondentNames, rawSortsArray);
  state.setState({
    isCorrelationsButtonGreen: true
  });
};

class CalculateCorrelationsButton extends Component {
  render() {
    return (
      <BeginAnalysisButton
        buttonColor={localStore.buttonColor}
        onClick={() => handleClick()}
      >
        <p>Calculate Correlations</p>
      </BeginAnalysisButton>
    );
  }
}

export default view(CalculateCorrelationsButton);

const BeginAnalysisButton = styled.button`
  grid-column-start: 3;
  display: grid;
  align-items: center;
  justify-items: center;
  background-color: ${props => props.buttonColor};
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
    font-weight: bold;
  }

  &:active {
    box-shadow: 0 1px 1px 0 black;
    margin-left: 3px;
    transform: translateY(1px);
  }
`;
