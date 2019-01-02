import React from "react";
import { view } from "react-easy-state";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import state from "../../../../store";

class RotationButtons extends React.Component {
  handleOnclick(event) {
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
      state.setState({
        highlightDegreeButton1: true,
        rotateByDegrees: 1
      });
    }

    if (buttonId === "Button5Degrees") {
      state.setState({
        highlightDegreeButton3: true,
        rotateByDegrees: 5
      });
    }

    if (buttonId === "Button10Degrees") {
      state.setState({
        highlightDegreeButton4: true,
        rotateByDegrees: 10
      });
    }

    if (buttonId === "Button90Degrees") {
      state.setState({
        highlightDegreeButton5: true,
        rotateByDegrees: 90
      });
    }
  }

  render() {
    const shouldDisplayDegreeButtonButtons = state.getState(
      "shouldShowJudgeRotDiv"
    );
    if (shouldDisplayDegreeButtonButtons) {
      return (
        <StyledWrapper>
          <Button id={ "Button1Degree" } className="wrapper1" toggle active={ state.getState("highlightDegreeButton1") } onClick={ this.handleOnclick.bind(this) } key={ "f1" }>
            { `${1  }\u00B0` }
          </Button>
          <Button id={ "Button5Degrees" } className="wrapper1" toggle active={ state.getState("highlightDegreeButton3") } onClick={ this.handleOnclick.bind(this) } key={ "f3" }>
            { `${5  }\u00B0` }
          </Button>
          <Button id={ "Button10Degrees" } className="wrapper1" toggle active={ state.getState("highlightDegreeButton4") } onClick={ this.handleOnclick.bind(this) } key={ "f4" }>
            { `${10  }\u00B0` }
          </Button>
          <Button id={ "Button90Degrees" } className="wrapper1" toggle active={ state.getState("highlightDegreeButton5") } onClick={ this.handleOnclick.bind(this) } key={ "f5" }>
            { `${90  }\u00B0` }
          </Button>
        </StyledWrapper>
        );
    }
    return null;
  }
}

export default view(RotationButtons);


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
