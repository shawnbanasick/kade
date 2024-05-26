import React from "react";
 
import { Button } from "semantic-ui-react";
import varimaxDispatch from "../varimaxLogic/varimaxDispatch";
import state from "../../../store";

const RotationButtonGroup = () => {
  const onVarimaxClick = (event) => {
    state.setState({
      rotationDegrees: 0
    });
    const userSelectedRotFactors = [];
    const abFactors = [];
    state.setState({
      highlightRotfactor1: false,
      highlightRotfactor2: false,
      highlightRotfactor3: false,
      highlightRotfactor4: false,
      highlightRotfactor5: false,
      highlightRotfactor6: false,
      highlightRotfactor7: false,
      highlightRotfactor8: false,
      userSelectedRotFactors,
      abFactors,
      showScatterPlotTableDiv: false,
      isCalculatingVarimax: true,
      varimaxButtonActive: true
    });
    setTimeout(() => {
      varimaxDispatch();
    }, 50);
  }

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

    // const {active} = true;
    // const shouldDisplay = state.getState("shouldDisplayFacKept");
    const varimaxButtonActive = state.getState("varimaxButtonActive");
    const judgeButtonActive = state.getState("judgeButtonActive");
    let varimaxButtonDisabled = state.getState("varimaxButtonDisabled");
    const varimaxButtonText = state.getState("varimaxButtonText");
    const isCalculatingVarimax = state.getState("isCalculatingVarimax");
    const isDisabled = state.getState("bipolarDisabled");

    if (varimaxButtonDisabled === true || isDisabled === true) {
      varimaxButtonDisabled = true;
    }

    // if (shouldDisplay) {
    return (
      <div>
        <Button
          id="judgementalRotationButton"
          size={"small"}
          toggle
          active={judgeButtonActive}
          disabled={isDisabled}
          onClick={this.onJudgeClick}
        >
          Judgmental Rotation
        </Button>
        <Button
          id="pcaRotationButton"
          size={"small"}
          toggle
          active={varimaxButtonActive}
          loading={isCalculatingVarimax}
          disabled={varimaxButtonDisabled}
          onClick={this.onVarimaxClick}
        >
          {varimaxButtonText}
        </Button>
      </div>
    );
    //   }
    //   return null;
}

 export default(RotationButtonGroup);
