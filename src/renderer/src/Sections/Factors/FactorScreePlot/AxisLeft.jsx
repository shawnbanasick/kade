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
    const node = this.axis;
    const axis = d3
      .axisLeft()
      .ticks(5)
      .scale(this.props.scale);
    d3.select(node).call(axis);
  }

  render() {
    return (
      <g
        className="axis"
        ref={c => {
          this.axis = c;
        }}
        transform={this.props.translate}
      />
    );
  }
}
