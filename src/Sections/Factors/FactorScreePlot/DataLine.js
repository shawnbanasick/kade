import React, { Component } from "react";
import { line as d3_line } from "d3";

// let styles = {
//     fill: "none",
//     stroke: "black",
//     strokeWidth: 2
// };

export default class Line extends Component {
    render() {
        let data = this.props.data;
        let xScale = this.props.xScale;
        let yScale = this.props.yScale;

        let line = d3_line()
            .x(function(data) {
                return xScale(data[0]);
            })
            .y(function(data) {
                return yScale(data[1]);
            });

        return <path d={ line(data) } stroke={ "black" } fill={ "none" } />;
    }
}
