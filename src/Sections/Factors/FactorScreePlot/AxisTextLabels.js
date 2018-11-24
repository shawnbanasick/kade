import React, { Component } from "react";
// import "./axisTextLabels.css";

class AxisTextLables extends Component {
  render() {
    return (
      <g>
        <text id="yAxisTitle" fontFamily="arial" x={ -210 } y={ -7 } transform={ "rotate(270 90,50)" }>
          Eigenvalues
        </text>
        <text id="xAxisTitle" fontFamily="arial" x={ 300 } y={ 590 }>
          Factor Number
        </text>
      </g>
      );
  }
}

export default AxisTextLables;
