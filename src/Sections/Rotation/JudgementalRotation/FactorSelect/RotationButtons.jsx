import React from "react";
import { easyComp } from "react-easy-state";
import store from "../../../store";
import { Button } from "semantic-ui-react";

class RotationButtons extends React.Component {
    handleOnclick(event) {
        let buttonId = event.target.id;

        // clear all button highlighting
        store.setState({
            highlightDegreeButton1: false,
            highlightDegreeButton2: false,
            highlightDegreeButton3: false,
            highlightDegreeButton4: false,
            highlightDegreeButton5: false
        });

        if (buttonId === "Button1Degree") {
            store.setState({
                highlightDegreeButton1: true,
                rotateByDegrees: 1
            });
        }

        if (buttonId === "Button5Degrees") {
            store.setState({
                highlightDegreeButton3: true,
                rotateByDegrees: 5
            });
        }

        if (buttonId === "Button10Degrees") {
            store.setState({
                highlightDegreeButton4: true,
                rotateByDegrees: 10
            });
        }

        if (buttonId === "Button90Degrees") {
            store.setState({
                highlightDegreeButton5: true,
                rotateByDegrees: 90
            });
        }
    }

    render() {
        let shouldDisplayDegreeButtonButtons = store.getState(
            "shouldShowJudgeRotDiv"
        );
        if (shouldDisplayDegreeButtonButtons) {
            return (
                <div>
                  <Button id={ "Button1Degree" } toggle active={ store.getState("highlightDegreeButton1") } onClick={ this.handleOnclick.bind(this) } key={ "f1" }>
                    { 1 + "\u00B0" }
                  </Button>
                  <Button id={ "Button5Degrees" } toggle active={ store.getState("highlightDegreeButton3") } onClick={ this.handleOnclick.bind(this) } key={ "f3" }>
                    { 5 + "\u00B0" }
                  </Button>
                  <Button id={ "Button10Degrees" } toggle active={ store.getState("highlightDegreeButton4") } onClick={ this.handleOnclick.bind(this) } key={ "f4" }>
                    { 10 + "\u00B0" }
                  </Button>
                  <Button id={ "Button90Degrees" } toggle active={ store.getState("highlightDegreeButton5") } onClick={ this.handleOnclick.bind(this) } key={ "f5" }>
                    { 90 + "\u00B0" }
                  </Button>
                </div>
                );
        }
        return null;
    }
}

export default easyComp(RotationButtons);
