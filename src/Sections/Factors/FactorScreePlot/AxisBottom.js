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
        var node = this.refs.axis;
        var axis = d3
            .axisBottom()
            .ticks(8)
            .scale(this.props.scale);
        d3.select(node).call(axis);
    }

    render() {
        return <g className="axis" ref="axis" transform={ this.props.translate } />;
    }
}
