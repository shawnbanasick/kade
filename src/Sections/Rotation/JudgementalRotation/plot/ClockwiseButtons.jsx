import React from "react";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
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
      <div onClick={e => this.handleClick(e, baselineData)}>
        <button
          style={{
            fontSize: "25px",
            borderRadius: "4px",
            fontWeight: "bolder",
            marginRight: "10px"
          }}
          id="clockwise"
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
        >
          {"\u21BA"}
        </button>
      </div>
    );
  }
}

export default ClockwiseButtons;
