import * as d3 from 'd3';

import XYAxis from './XyAxis';
import CircleText from './CircleText';
import DataCircles from './DataCircles';
import AxisTextLabels from './AxisTextLabels';

export const LEFT_EXTRA = 30; // extra px on the left for the y axis title; raise if still clipped

const styles = {
  container: {
    textAlign: 'center',
    width: 'auto',
    height: 'auto',
    paddingLeft: 5,
    // border: "2px solid red"
  },
  svg: {
    position: 'relative',
  },
  XYAxis: {
    marginBottom: 20,
  },
};

// Returns a function that "scales" X coordinates from the data to fit the chart
const xScale = (props) =>
  d3
    .scaleLinear()
    .domain([-1, 1])
    .range([props.padding, props.width - props.padding]);

// Returns a function that "scales" Y coordinates from the data to fit the chart
const yScale = (props) =>
  d3
    .scaleLinear()
    .domain([-1, 1])
    .range([props.height - props.padding, props.padding]);

const ScatterPlot = (props) => {
  const scales = {
    xScale: xScale(props),
    yScale: yScale(props),
  };

  return (
    <div style={styles.container}>
      <svg
        id="rotationScatterPlot"
        ref={props.svgRef}
        style={styles.svg}
        width={props.width - 5 + LEFT_EXTRA}
        height={props.height + 20}
      >
        <g transform={`translate(${LEFT_EXTRA}, 0)`}>
          <XYAxis {...props} {...scales} {...styles.XYAxis} />
          <AxisTextLabels {...props} />
          <g>
            <DataCircles {...props} {...scales} />
            <CircleText {...props} {...scales} />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default ScatterPlot;
