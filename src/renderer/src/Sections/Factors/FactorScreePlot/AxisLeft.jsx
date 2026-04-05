import React from 'react';
import * as d3 from 'd3';

export default class AxisLeft extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    console.log('yTickValues received:', this.props);

    const node = this.axis;
    const axis = d3
      .axisLeft()
      .scale(this.props.scale)
      // use explicit integer tick values
      .tickValues(this.props.yTickValues)
      .tickFormat(d3.format('d'));
    d3.select(node).call(axis);
  }

  render() {
    return (
      <g
        className="axis"
        ref={(c) => {
          this.axis = c;
        }}
        transform={this.props.translate}
      />
    );
  }
}
