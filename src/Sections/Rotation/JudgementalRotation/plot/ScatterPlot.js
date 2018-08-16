import React from "react";
import DataCircles from "./DataCircles";
import XYAxis from "./XyAxis";
import { default as AxisTextLabels } from "./AxisTextLabels";
import * as d3 from "d3";
import CircleText from "./CircleText";
// import AutoScale from "react-auto-scale";

const styles = {
  container: {
    margin: "0 auto",
    textAlign: "center",
    width: "100%",
    height: "90%"
  },
  svg: {
    position: "relative"
  },
  XYAxis: {
    marginBottom: 40
  }
};

// Returns a function that "scales" X coordinates from the data to fit the chart
const xScale = props => {
  return d3
    .scaleLinear()
    .domain([-1, 1])
    .range([props.padding, props.width - props.padding]);
};

// Returns a function that "scales" Y coordinates from the data to fit the chart
const yScale = props => {
  return d3
    .scaleLinear()
    .domain([-1, 1])
    .range([props.height - props.padding, props.padding]);
};

let ScatterPlot = props => {
  const scales = {
    xScale: xScale(props),
    yScale: yScale(props)
  };
  return (
    <div style={styles.container}>
      <svg
        id="screePlot"
        style={styles.svg}
        width={props.width}
        height={props.height}
      >
        <XYAxis {...props} {...scales} {...styles.XYAxis} />
        <AxisTextLabels {...props} />
        <g>
          <DataCircles {...props} {...scales} />
          <CircleText {...props} {...scales} />
        </g>
      </svg>
    </div>
  );
};

export default ScatterPlot;
