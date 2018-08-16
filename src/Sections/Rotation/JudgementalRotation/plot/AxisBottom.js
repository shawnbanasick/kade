import React from "react";
//import d3 from 'd3';
import * as d3 from "d3";

export default class AxisBottom extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    let tickSize = -(this.props.height - this.props.padding * 2);
    // console.log('X tickSize: ' + JSON.stringify(tickSize));

    var node = this.refs.axis;
    var axis = d3
      .axisBottom()
      .ticks(2)
      .tickSize(tickSize)
      .scale(this.props.scale);
    d3.select(node).call(axis);
  }

  render() {
    // console.log('bottom axis props: ' + JSON.stringify(this.props));

    return <g className="axis" ref="axis" transform={this.props.translate} />;
  }
}
