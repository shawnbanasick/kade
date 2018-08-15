import * as d3 from "d3";
import React from "react";
import XYAxis from "./XyAxis";
import DataCircles from "./DataCircles";
import { default as Line } from "./DataLine";
import { default as AxisTextLabels } from "./AxisTextLabels";

const styles = {
  container: {
    // margin: "0 auto",
    textAlign: "center",
    width: "80%",
    height: "80%"
  },
  svg: {
    position: "relative"
  },
  XYAxis: {
    marginBottom: 40
  }
};

// Returns the largest X coordinate from the data set
// const xMax = data => d3.max(data, d => d[0]);
const xMax = 8;

// Returns the higest Y coordinate from the data set
// const yMax = data => d3.max(data, d => d[1]);
const yMax = data => {
  let maxValue = d3.max(data, d => d[1]);
  if (maxValue < 10 && maxValue > 5) {
    maxValue = 10;
  } else if (maxValue < 5) {
    maxValue = 5;
  }
  return maxValue;
};

// Returns a function that "scales" X coordinates from the data to fit the chart
const xScale = props => {
  return d3
    .scaleLinear()
    .domain([0, xMax])
    .range([props.padding, props.width - props.padding * 2]);
};

// Returns a function that "scales" Y coordinates from the data to fit the chart
const yScale = props => {
  return d3
    .scaleLinear()
    .domain([0, yMax(props.data)])
    .range([props.height - props.padding, props.padding]);
};

let ScatterPlot = props => {
  // console.log("scree props: " + JSON.stringify(props));

  const scales = {
    xScale: xScale(props),
    yScale: yScale(props)
  };
  return (
    <div style={ styles.container }>
      <svg xmlns="http://www.w3.org/2000/svg" id="screePlot" style={ styles.svg } width={ props.width + 20 } height={ props.height }>
        <XYAxis {...props} {...scales} {...styles.XYAxis} />
        <AxisTextLabels />
        <Line {...props} {...scales} />
        <DataCircles {...props} {...scales} />
      </svg>
    </div>
    );
};

export default ScatterPlot;
