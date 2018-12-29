import React from "react";
import * as d3 from "d3";

export default class AxisLeft extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const tickSize = -(this.props.width - this.props.padding * 2);

    const node = this.refs.axis;
    const axis = d3
      .axisLeft()
      .ticks(2)
      .tickSize(tickSize)
      .scale(this.props.scale);
    d3.select(node).call(axis);
  }

  render() {
    return <g className="axis" ref="axis" transform={this.props.translate} />;
  }
}
