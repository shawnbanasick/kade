/* eslint no-shadow: ["error", { "allow": ["data"] }] */
import React, { Component } from "react";
import { line as d3Line } from "d3";

export default class Line extends Component {
  render() {
    const data = this.props.data;
    const xScale = this.props.xScale;
    const yScale = this.props.yScale;

    const line = d3Line()
      .x(data => xScale(data[0]))
      .y(data => yScale(data[1]));

    return <path d={line(data)} stroke={"black"} fill={"none"} />;
  }
}
