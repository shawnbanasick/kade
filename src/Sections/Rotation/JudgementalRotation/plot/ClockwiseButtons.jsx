import React from "react";
import { Button, Icon } from "semantic-ui-react";
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
        <Button
          icon
          id="clockwise"
          onClick={e => this.handleClick(e, baselineData)}
        >
          <Icon name="redo" />
        </Button>
        <Button
          id="counterClockwise"
          icon
          onClick={e => this.handleClick(e, baselineData)}
        >
          <Icon name="undo" />
        </Button>
      </div>
    );
  }
}

export default ClockwiseButtons;
