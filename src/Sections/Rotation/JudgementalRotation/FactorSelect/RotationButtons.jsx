import React from "react";
import styled from "styled-components";
import { view, store } from "react-easy-state";
import { Button } from "semantic-ui-react";
import state from "../../../../store";
import RotationDegreeInput from './RotationDegreeInput';

const localStore = store({
  rotationDegreeInput: "",
  buttonColor: "#d6dbe0",
  pressed: false
})

const getRotationDegreeFromUI = (event) => {
  const value = event.target.value;
  // clean input
  if (isNaN(value)) {
    return;
  }
  if (value > 360) {
    localStore.rotationDegreeInput = "";
    return;
  }
  localStore.rotationDegreeInput = +value;
  localStore.buttonColor = "lightgreen";
  localStore.pressed = true;

  // clear all button highlighting
  state.setState({
    highlightDegreeButton1: false,
    highlightDegreeButton2: false,
    highlightDegreeButton3: false,
    highlightDegreeButton4: false,
    highlightDegreeButton5: false,
    rotateByDegrees: +value
  });
}

const handleOnclick = (event) => {
  const buttonId = event.target.id;

  // clear all button highlighting
  state.setState({
    highlightDegreeButton1: false,
    highlightDegreeButton2: false,
    highlightDegreeButton3: false,
    highlightDegreeButton4: false,
    highlightDegreeButton5: false
  });

  if (buttonId === "Button1Degree") {
    localStore.rotationDegreeInput = "";
    localStore.buttonColor = "#d6dbe0";
    localStore.pressed = false;
    state.setState({
      highlightDegreeButton1: true,
      rotateByDegrees: 1
    });
  }

  if (buttonId === "Button5Degrees") {
    localStore.rotationDegreeInput = "";
    localStore.buttonColor = "#d6dbe0";
    localStore.pressed = false;
    state.setState({
      highlightDegreeButton3: true,
      rotateByDegrees: 5
    });
  }

  if (buttonId === "Button10Degrees") {
    localStore.buttonColor = "#d6dbe0";
    localStore.rotationDegreeInput = "";
    localStore.pressed = false;
    state.setState({
      highlightDegreeButton4: true,
      rotateByDegrees: 10
    });
  }

  if (buttonId === "Button90Degrees") {
    localStore.buttonColor = "#d6dbe0";
    localStore.rotationDegreeInput = "";
    localStore.pressed = false;
    state.setState({
      highlightDegreeButton5: true,
      rotateByDegrees: 90
    });
  }
}

class RotationButtons extends React.Component {


  render() {
    const shouldDisplayDegreeButtonButtons = state.getState(
      "shouldShowJudgeRotDiv"
    );
    // const rotationDegreeInputDisplay =  localStore.rotationDegreeInput
    if (shouldDisplayDegreeButtonButtons) {
      return (
        <StyledWrapper>
          <Button id={ "Button1Degree" } className="wrapper1" toggle active={ state.getState("highlightDegreeButton1") } onClick={ handleOnclick } key={ "f1" }>
            { `${1  }\u00B0` }
          </Button>
          <Button id={ "Button5Degrees" } className="wrapper1" toggle active={ state.getState("highlightDegreeButton3") } onClick={ handleOnclick } key={ "f3" }>
            { `${5  }\u00B0` }
          </Button>
          <Button id={ "Button10Degrees" } className="wrapper1" toggle active={ state.getState("highlightDegreeButton4") } onClick={ handleOnclick } key={ "f4" }>
            { `${10  }\u00B0` }
          </Button>
          <Button id={ "Button90Degrees" } className="wrapper1" toggle active={ state.getState("highlightDegreeButton5") } onClick={ handleOnclick } key={ "f5" }>
            { `${90  }\u00B0` }
          </Button>
          <RotationDegreeInput name="rotationDegrees" value={ localStore.rotationDegreeInput } pressed={ localStore.pressed } buttonColor={ localStore.buttonColor } onChangeCallback={ getRotationDegreeFromUI }
          />
        </StyledWrapper>
        );
    }
    return null;
  }
}

export default view(RotationButtons);


const StyledWrapper = styled.div`
  display: flex;
  
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
