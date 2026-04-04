import React from 'react';
import * as d3 from 'd3';

const LINE_STYLES = {
  means: {
    strokeDasharray: '6,4', // dashed
    strokeWidth: 1,
    markerSymbol: '◆',
    markerSize: 14,
  },
  p95: {
    strokeDasharray: '2,3', // dotted
    strokeWidth: 1,
    markerSymbol: '▲',
    markerSize: 14,
  },
};

const ParallelRefLine = ({ xScale, yScale, data, label, show, variant = 'means' }) => {
  if (!show || !data || data.length === 0) return null;

  const style = LINE_STYLES[variant];

  const lineGenerator = d3
    .line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));

  const pathData = lineGenerator(data);
  const last = data[data.length - 1];

  return (
    <g className="reference-line">
      {/* 1. Line path drawn first (bottom layer) */}
      <path
        d={pathData}
        fill="none"
        stroke="black"
        strokeWidth={style.strokeWidth}
        strokeDasharray={style.strokeDasharray}
      />

      {/* 2. White knockout — erases line behind each symbol */}
      {data.map((d, i) => (
        <text
          key={`bg-${i}`}
          x={xScale(d[0])}
          y={yScale(d[1])}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={style.markerSize}
          fill="white"
          stroke="black"
        >
          {style.markerSymbol}
        </text>
      ))}

      {/* 3. Outlined symbol on top */}
      {data.map((d, i) => (
        <text
          key={`sym-${i}`}
          x={xScale(d[0])}
          y={yScale(d[1])}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={style.markerSize}
          fill="none"
          stroke="black"
          strokeWidth={0.5}
        >
          {style.markerSymbol}
        </text>
      ))}

      {/* 4. Label at the last point */}
      <text
        x={xScale(last[0]) + 12}
        y={yScale(last[1]) + 4}
        fill="currentColor"
        fontSize={11}
        fontWeight="600"
        fontFamily="Arial"
      >
        {label}
      </text>
    </g>
  );
};

export default ParallelRefLine;
