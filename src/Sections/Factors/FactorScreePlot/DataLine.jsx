/* eslint no-shadow: ["error", { "allow": ["data"] }] */
import React from "react";
import { line as d3Line } from "d3";

const Line = props => {
  const data = props.data;
  const xScale = props.xScale;
  const yScale = props.yScale;

  const line = d3Line()
    .x(data => xScale(data[0]))
    .y(data => yScale(data[1]));

  return <path d={line(data)} stroke={"black"} fill={"none"} />;
};

export default Line;
