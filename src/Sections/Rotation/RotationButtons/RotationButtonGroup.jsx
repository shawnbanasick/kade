import React, { Component } from "react";
import { view } from "react-easy-state";
import { Button, Transition } from "semantic-ui-react";
import varimaxDispatch from "../varimaxLogic/varimaxDispatch";
import store from "../../../store";

class RotationButtonGroup extends Component {
  onVarimaxClick(event) {
    store.setState({
      rotationDegrees: 0
    });
    const userSelectedRotFactors = [];
    const abFactors = [];
    store.setState({
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
    const varimaxButtonActive = store.getState("varimaxButtonActive");
    const judgeButtonActive = store.getState("judgeButtonActive");
    let varimaxButtonDisabled = store.getState("varimaxButtonDisabled");
    const varimaxButtonText = store.getState("varimaxButtonText");
    const isCalculatingVarimax = store.getState("isCalculatingVarimax");
    const isDisabled = store.getState("bipolarDisabled");

    if (varimaxButtonDisabled === true || isDisabled === true) {
      varimaxButtonDisabled = true;
    }

    // if (shouldDisplay) {
    return (
      <Transition visible={shouldDisplay} animation="fade" duration={1000}>
        <div>
          <Button
            id="judgementalRotationButton"
            size={"big"}
            toggle
            active={judgeButtonActive}
            disabled={isDisabled}
            onClick={this.onJudgeClick}
          >
            Judgmental Rotation
          </Button>
          <Button
            id="pcaRotationButton"
            size={"big"}
            toggle
            active={varimaxButtonActive}
            loading={isCalculatingVarimax}
            disabled={varimaxButtonDisabled}
            onClick={this.onVarimaxClick}
          >
            {varimaxButtonText}
          </Button>
        </div>
      </Transition>
    );
    //   }
    //   return null;
  }
}

export default view(RotationButtonGroup);
