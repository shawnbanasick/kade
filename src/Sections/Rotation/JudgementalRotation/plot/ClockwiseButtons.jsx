import React from "react";
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
        <button
          style={{
            fontSize: "25px",
            borderRadius: "4px",
            fontWeight: "bolder",
            marginRight: "10px"
          }}
          id="clockwise"
          onClick={e => this.handleClick(e, baselineData)}
        >
          {"\u21BB"}
        </button>

        <button
          style={{
            fontSize: "25px",
            borderRadius: "4px",
            fontWeight: "bolder"
          }}
          id="counterClockwise"
          onClick={e => this.handleClick(e, baselineData)}
        >
          {"\u21BA"}
        </button>
      </div>
    );
  }
}

export default ClockwiseButtons;
