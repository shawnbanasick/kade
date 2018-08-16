import store from "../../store";
import React, { Component } from "react";
import { Button, Transition } from "semantic-ui-react";
import { easyComp } from "react-easy-state";
import { default as varimaxDispatch } from "../varimaxLogic/varimaxDispatch";

class RotationButtonGroup extends Component {
    state = {};

    onVarimaxClick(event) {
        store.setState({
            rotationDegrees: 0
        });
        let userSelectedRotFactors = [];
        let abFactors = [];
        store.setState({
            highlightRotfactor1: false,
            highlightRotfactor2: false,
            highlightRotfactor3: false,
            highlightRotfactor4: false,
            highlightRotfactor5: false,
            highlightRotfactor6: false,
            highlightRotfactor7: false,
            highlightRotfactor8: false,
            userSelectedRotFactors: userSelectedRotFactors,
            abFactors: abFactors,
            showScatterPlotTableDiv: false,
            isCalculatingVarimax: true,
            varimaxButtonActive: true
        });
        setTimeout(() => {
            varimaxDispatch();
        }, 50);
    }

    onJudgeClick(event) {
        let shouldShowDiv = store.getState("shouldShowJudgeRotDiv");
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
        let shouldDisplay = store.getState("shouldDisplayFacKept");
        let varimaxButtonActive = store.getState("varimaxButtonActive");
        let judgeButtonActive = store.getState("judgeButtonActive");
        let varimaxButtonDisabled = store.getState("varimaxButtonDisabled");
        let varimaxButtonText = store.getState("varimaxButtonText");
        let isCalculatingVarimax = store.getState("isCalculatingVarimax");
        let isDisabled = store.getState("bipolarDisabled");

        if (varimaxButtonDisabled === true || isDisabled === true) {
            varimaxButtonDisabled = true;
        }

        // if (shouldDisplay) {
        return (
            <Transition visible={ shouldDisplay } animation="fade" duration={ 1000 }>
              <div>
                <Button id="judgementalRotationButton" size={ "big" } toggle active={ judgeButtonActive } disabled={ isDisabled } onClick={ this.onJudgeClick }>
                  Judgmental Rotation
                </Button>
                <Button id="pcaRotationButton" size={ "big" } toggle active={ varimaxButtonActive } loading={ isCalculatingVarimax } disabled={ varimaxButtonDisabled } onClick={ this.onVarimaxClick }>
                  { varimaxButtonText }
                </Button>
              </div>
            </Transition>
            );
    //   }
    //   return null;
    }
}

export default easyComp(RotationButtonGroup);
