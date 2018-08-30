import React, { Component } from "react";
import { view } from "react-easy-state";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import store from "../../../store";

class RotationButtonGroup extends Component {
  onJudgeClick(event) {
    const shouldShowDiv = store.getState("shouldShowJudgeRotDiv");
    if (shouldShowDiv === false) {
      store.setState({
        shouldShowJudgeRotDiv: true,
        judgeButtonActive: true
      });
    } else {
      store.setState({
        shouldShowJudgeRotDiv: false,
        judgeButtonActive: false
      });
    }
  }

  render() {
    // const {active} = true;
    const shouldDisplay = store.getState("shouldDisplayFacKept");
    const judgeButtonActive = store.getState("judgeButtonActive");
    let varimaxButtonDisabled = store.getState("varimaxButtonDisabled");
    const isDisabled = store.getState("bipolarDisabled");

    if (varimaxButtonDisabled === true || isDisabled === true) {
      varimaxButtonDisabled = true;
    }

    if (shouldDisplay) {
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
              Judgmental Rotation
            </Button>
          </StyledWrapper>
        </div>
      );
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
      margin-top: 3px;
    }
  }
`;
