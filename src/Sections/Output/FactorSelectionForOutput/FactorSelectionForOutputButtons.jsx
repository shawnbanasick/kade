import React from "react";
import includes from "lodash/includes";
import styled from "styled-components";
import { view } from "react-easy-state";
import { Button, Transition } from "semantic-ui-react";
import state from "../../../store";
import outputDispatch from "../calcualteOutputLogic/1_outputDispatch";

class FactorSelectionForOutputButtons extends React.Component {
  clearButtonHighlighting() {
    const btnId = state.getState("outputButtonsArray");
    const tempObj2 = {};
    for (let i = 0; i < btnId.length; i += 1) {
      tempObj2[`highlightfactor${btnId[i]}`] = false;
    }
    state.setState(tempObj2);
  }

  handleSubmit() {
    const userSelectedFactors = state.getState("userSelectedFactors");
    if (userSelectedFactors.length !== 0) {
      outputDispatch();
      state.setState({
        showDownloadOutputButtons: true,
        outputFactorSelectButtonsDisabled: true
      });
    }
  }

  initializeButtonActiveState(btnId) {
    // set all highlighting to false (not active)
    const tempObj = {};
    for (let i = 0; i < btnId.length; i += 1) {
      tempObj[`highlightfactor${btnId[i]}`] = false;
    }
    state.setState(tempObj);
  }

  handleOnclick(event) {
    const factor = event.target.id;
    let userSelectedFactors = state.getState("userSelectedFactors");
    const btnId = state.getState("outputButtonsArray");

    // select all
    if (factor === "selectAllFacs") {
      // construct state object and user selected factors array
      const tempObj = {};
      userSelectedFactors = [];
      for (let i = 0; i < btnId.length; i += 1) {
        tempObj[`highlightfactor${btnId[i]}`] = true;
        const temp1 = `factor ${btnId[i]}`;
        userSelectedFactors.push(temp1);
      }
      tempObj.selectAllClicked = true;
      tempObj.userSelectedFactors = userSelectedFactors;
      tempObj.showDownloadOutputButtons = false;
      tempObj.showFactorCorrelationsTable = false;
      tempObj.showFactorCharacteristicsTable = false;
      tempObj.showStandardErrorsDifferences = false;
      tempObj.displayFactorVisualizations = false;
      tempObj.shouldDisplayFactorVizOptions = false;

      state.setState(tempObj);

      // clear all
    } else if (factor === "clearAllFacs") {
      const tempObj2 = {};
      for (let i = 0; i < btnId.length; i += 1) {
        tempObj2[`highlightfactor${btnId[i]}`] = false;
      }
      tempObj2.userSelectedFactors = [];
      tempObj2.showFactorCorrelationsTable = false;
      tempObj2.showFactorCharacteristicsTable = false;
      tempObj2.showStandardErrorsDifferences = false;
      tempObj2.showDownloadOutputButtons = false;
      tempObj2.displayFactorVisualizations = false;
      tempObj2.shouldDisplayFactorVizOptions = false;
      tempObj2.outputFactorSelectButtonsDisabled = false;
      // reset cache of factor viz data
      tempObj2.outputForDataViz2 = [];
      state.setState(tempObj2);
    } else {
      // select individual factors
      const selectAllClicked = state.getState("selectAllClicked");
      // select all factors
      if (selectAllClicked) {
        userSelectedFactors = [];

        const tempObj3 = {};
        for (let i = 0; i < btnId.length; i += 1) {
          tempObj3[`highlightfactor${btnId[i]}`] = false;
        }
        tempObj3.userSelectedFactors = userSelectedFactors;
        tempObj3.showFactorCorrelationsTable = false;
        tempObj3.showFactorCharacteristicsTable = false;
        tempObj3.showStandardErrorsDifferences = false;
        tempObj3.selectAllClicked = false;
        tempObj3.displayFactorVisualizations = false;
        tempObj3.shouldDisplayFactorVizOptions = false;

        state.setState(tempObj3);
      }
      if (!includes(userSelectedFactors, factor)) {
        userSelectedFactors.push(factor);
        userSelectedFactors.sort();
        state.setState({
          userSelectedFactors
        });
        const newFactorId = `highlight${factor.replace(" ", "")}`;
        const tempObj4 = {};
        tempObj4[newFactorId] = true;
        tempObj4.showDownloadOutputButtons = false;
        tempObj4.showFactorCorrelationsTable = false;
        tempObj4.showFactorCharacteristicsTable = false;
        tempObj4.showStandardErrorsDifferences = false;
        tempObj4.displayFactorVisualizations = false;
        tempObj4.shouldDisplayFactorVizOptions = false;
        state.setState(tempObj4);
      }
    }
  }

  render() {
    const btnId = state.getState("outputButtonsArray");
    const showOutputFactorSelection = state.getState(
      "showOutputFactorSelection"
    );
    const areDisabled = state.getState("outputFactorSelectButtonsDisabled");

    // if (showOutputFactorSelection) {

    return (
      <Transition
        visible={showOutputFactorSelection}
        animation="fade"
        duration={1000}
      >
        <StyledWrapper>
          <span style={{ marginRight: 5, fontSize: 16 }}>Select Factors:</span>
          {btnId.map(item => (
            <Button
              key={`f${item}`}
              toggle
              className="wrapper1"
              active={state.getState(`highlightfactor${item}`)}
              disabled={areDisabled}
              onClick={this.handleOnclick.bind(this)}
              id={`factor ${item}`}
            >
              {item}
            </Button>
          ))}
          <Button
            id="selectAllFacs"
            className="wrapper1"
            disabled={areDisabled}
            onClick={this.handleOnclick}
          >
            All
          </Button>
          <Button
            id="clearAllFacs"
            className="wrapper1"
            onClick={this.handleOnclick}
          >
            Clear
          </Button>
          <StyledButton1
            id="startOutput"
            className="wrapper1"
            onClick={this.handleSubmit}
          >
            Submit
          </StyledButton1>
        </StyledWrapper>
      </Transition>
    );
  }
}

export default view(FactorSelectionForOutputButtons);

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


const StyledButton1 = styled.button`
  background-color: #d6dbe0;
  height: 38px;
  width: 70px;
  border: 1px solid black;
  text-align: center;
  font-size: 16px;
  font-family: Helvetica, sans-serif;
  font-weight: normal;
  border-radius: 4px;
  margin-right: 3px;
  box-shadow: 0 2px 2px 0 black;
  outline: none;

  &:hover {
    font-weight: 900;
  }

  &:active {
    box-shadow: 0 0 1px 0 black inset;
  }
`;
