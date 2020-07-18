import React, { Component } from "react";
import rotationState from "../../../GlobalState/rotationState";
import i18n from "i18next";
const clone = require("rfdc")();

const styles = {
  yAxis: {
    position: "absolute",
    color: "red",
    backgroundColor: "red"
  },
  xAxis: {
    position: "absolute",
    color: "black"
  }
};

class AxisTextLables extends Component {
  render() {
    const size = this.props.width - this.props.padding;
    // getState
    const abFactors = clone(rotationState.abFactors);
    const factorA = `${i18n.t("Factor")} ${abFactors[0]}`;
    const factorB = `${i18n.t("Factor")} ${abFactors[1]}`;
    return (
      <g>
        <text
          x={-(this.props.height - this.props.padding) / 2 - 45}
          y={this.props.padding - 20}
          transform={"rotate(-90)"}
        >
          {factorA}
        </text>
        <text x={size / 2 - 10} y={size + 45} style={styles.xAxis}>
          {factorB}
        </text>
      </g>
    );
  }
}

export default AxisTextLables;
