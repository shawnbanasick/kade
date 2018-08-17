import React from "react";
import { Button } from "semantic-ui-react";
import calculateRotatedFactors from "../rotationLogic/calculateRotatedFactors";
import store from "../../../../store";

class ClockwiseButtons extends React.Component {
  handleClick(event, baselineData) {
    const direction = event.target.id;
    event.stopPropagation();
    // get current setting of rotation degrees
    const rotateByDegrees = store.getState("rotateByDegrees");
    // call rotation
    calculateRotatedFactors(direction, rotateByDegrees, baselineData);
  }

  render() {
    const baselineData = this.props.baselineData;
    return (
      <div>
        <Button id="clockwise" onClick={e => this.handleClick(e, baselineData)}>
          Clockwise
        </Button>
        <Button
          id="counterClockwise"
          onClick={e => this.handleClick(e, baselineData)}
        >
          Counter-Clockwise
        </Button>
      </div>
    );
  }
}

export default ClockwiseButtons;
