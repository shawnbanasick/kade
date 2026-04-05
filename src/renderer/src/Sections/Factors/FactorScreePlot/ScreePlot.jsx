import * as d3 from 'd3';
import React from 'react';
import Line from './DataLine';
import XYAxis from './XyAxis';
import DataCircles from './DataCircles';
import AxisTextLabels from './AxisTextLabels';
import ParallelRefLine from './ParallelRefLine';

const styles = {
  container: {
    textAlign: 'center',
    width: '80%',
    height: '82%',
    display: 'flex',
    alignItems: 'left',
  },
  svg: {
    position: 'relative',
  },
  XYAxis: {
    marginBottom: 40,
  },
};

// Returns the largest X coordinate from the data set
const xMax = (props) => {
  let maxValue = props.numFacs;
  if (maxValue < 3) {
    maxValue = 3;
  } else if (maxValue > 8) {
    maxValue = 8;
  }
  return maxValue;
};

// Returns the higest Y coordinate from the data set
const yMax = (data) => {
  const maxValue2 = Math.ceil(d3.max(data, (d) => d[1]));
  const maxValue = maxValue2;
  return maxValue;
};

// Returns a function that "scales" X coordinates from the data to fit the chart
const xScale = (props) =>
  d3
    .scaleLinear()
    .domain([0, xMax(props)])
    .range([props.padding, props.width - props.padding * 2]);

// Returns a function that "scales" Y coordinates from the data to fit the chart
const yScale = (props) =>
  d3
    .scaleLinear()
    .domain([0, yMax(props.data)])
    .range([props.height - props.padding, props.padding]);

const ScreePlot = (props) => {
  const { showMeans = false, showP95 = false, means, p95 } = props;

  const yMax_ = yMax(props.data);
  // Generate an array of every integer from 0 to yMax
  const yTickValues = Array.from({ length: yMax_ + 1 }, (_, i) => i);
  console.log('yticValues', yTickValues);

  const scales = {
    xScale: xScale(props),
    yScale: yScale(props),
  };

  const refLineProps = { ...scales, width: props.width, padding: props.padding };

  return (
    <div style={styles.container} className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="screePlot"
        style={styles.svg}
        width={props.width + 20}
        height={props.height}
      >
        <XYAxis {...props} {...scales} yTickValues={yTickValues} {...styles.XYAxis} />
        <AxisTextLabels />
        <Line {...props} {...scales} />
        <DataCircles {...props} {...scales} />
        <ParallelRefLine
          {...refLineProps}
          data={means}
          label="PA Mean"
          show={showMeans}
          variant="means"
        />
        <ParallelRefLine
          {...refLineProps}
          data={p95}
          label="PA 95th Percentile"
          show={showP95}
          variant="p95"
        />
      </svg>
    </div>
  );
};

export default ScreePlot;
