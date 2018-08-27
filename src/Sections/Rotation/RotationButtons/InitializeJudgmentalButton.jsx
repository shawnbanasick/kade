import React, { Component } from "react";
import { view } from "react-easy-state";
import { Button } from "semantic-ui-react";
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
                  <Button id="judgementalRotationButton" size={ "small" } toggle active={ judgeButtonActive } disabled={ isDisabled } onClick={ this.onJudgeClick }>
                    Judgmental Rotation
                  </Button>
                </div>
                );
        }
        return ( <p style={ { fontSize: 22 } }>Select the number of factors to keep for rotation first.</p>)
    }
}

export default view(RotationButtonGroup);
