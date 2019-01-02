import React, { Component } from "react";
import { view } from "react-easy-state";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import state from "../../../store";

class RotationButtonGroup extends Component {
  onJudgeClick(event) {
    const shouldShowDiv = state.getState("shouldShowJudgeRotDiv");
    if (shouldShowDiv === false) {
      state.setState({
        shouldShowJudgeRotDiv: true,
        judgeButtonActive: true
      });
    } else {
      state.setState({
        shouldShowJudgeRotDiv: false,
        judgeButtonActive: false
      });
    }
  }

  render() {
    // const {active} = true;
    const shouldDisplay = state.getState("shouldDisplayFacKept");
    const judgeButtonActive = state.getState("judgeButtonActive");
    let varimaxButtonDisabled = state.getState("varimaxButtonDisabled");
    const isDisabled = state.getState("bipolarDisabled");
    const shouldShowJudgeRotDiv = state.getState("shouldShowJudgeRotDiv");

    // todo - fix this hack for button visiblility
    let showInitializeButton;
    if (shouldShowJudgeRotDiv) {
      showInitializeButton = false;
    } else {
      showInitializeButton = true;
    }

    if (varimaxButtonDisabled === true || isDisabled === true) {
      varimaxButtonDisabled = true;
    }

    if (shouldDisplay) {
      if (showInitializeButton) {
        return (
          <div>
            <StyledWrapper>
              <Button
                id="judgementalRotationButton"
                className="wrapper1"
                size={"small"}
                toggle
                active={judgeButtonActive}
                disabled={isDisabled}
                onClick={this.onJudgeClick}
              >
                Initialize Judgmental Rotation
              </Button>
            </StyledWrapper>
          </div>
        );
      } 
        return null;
      
    }
    return (
      <p style={{ fontSize: 22 }}>
        Select the number of factors to keep for rotation first.
      </p>
    );
  }
}

export default view(RotationButtonGroup);

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
      /* margin-top: 3px; */
    }
  }
`;
