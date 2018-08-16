import React from "react";
import { Button } from "semantic-ui-react";
import calculateRotatedFactors from "../rotationLogic/calculateRotatedFactors";
import store from "../../../store";

class ClockwiseButtons extends React.Component {
    handleClick(event, baselineData) {
        let direction = event.target.id;
        event.stopPropagation();
        // get current setting of rotation degrees
        let rotateByDegrees = store.getState("rotateByDegrees");
        // call rotation 
        calculateRotatedFactors(direction, rotateByDegrees, baselineData);
    }

    render() {
        let baselineData = this.props.baselineData;
        return (
            <div>
              <Button id="clockwise" onClick={ e => this.handleClick(e, baselineData) }>
                Clockwise
              </Button>
              <Button id="counterClockwise" onClick={ e => this.handleClick(e, baselineData) }>
                Counter-Clockwise
              </Button>
            </div>
            );
    }
}

export default ClockwiseButtons;

