/* eslint no-shadow: ["error", { "allow": ["data"] }] */
import React from 'react';
import { line as d3Line } from 'd3';

const Line = (props) => {
  const { data, xScale, yScale, showMeans, showP95 } = props;

  const line = d3Line()
    .x((data) => xScale(data[0]))
    .y((data) => yScale(data[1]));

  const showLabel = showMeans || showP95;
  const last = data[data.length - 1];

  return (
    <g className="eigenvalue-line">
      <path d={line(data)} stroke={'black'} fill={'none'} />
      {showLabel && (
        <text
          x={xScale(last[0]) + 12}
          y={yScale(last[1]) + 4}
          fill="currentColor"
          fontSize={11}
          fontWeight="600"
          fontFamily="Arial"
        >
          Actual Eigenvalue
        </text>
      )}
    </g>
  );
};

export default Line;
