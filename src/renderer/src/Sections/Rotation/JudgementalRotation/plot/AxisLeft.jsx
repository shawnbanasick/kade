import React from 'react';
import * as d3 from 'd3';

export default class AxisLeft extends React.Component {
  constructor(props) {
    super(props);
    this.axisRef = React.createRef();
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const tickSize = -(this.props.width - this.props.padding * 2);

    const node = this.axisRef.current;
    const axis = d3.axisLeft().ticks(2).tickSize(tickSize).scale(this.props.scale);
    d3.select(node).call(axis).style('font-size', '15px');
  }

  render() {
    return <g className="axis" ref={this.axisRef} transform={this.props.translate} />;
  }
}
