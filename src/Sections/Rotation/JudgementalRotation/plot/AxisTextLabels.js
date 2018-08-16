import store from "../../../store";
import React, { Component } from "react";

const styles = {
    yAxis: {
        position: "absolute",
        color: "red",
        backgroundColor: "red"
    // border: "solid 2px red"
    // textAnchor: "center",
    // transform: "rotate(90deg)",
    // transformOrigin: "left top 0"
    // top: "40%",
    // left: "10%",
    },
    xAxis: {
        position: "absolute",
        color: "black"
    }
};

class AxisTextLables extends Component {
    render() {
        // console.log('textLabels props: ' + JSON.stringify(this.props));
        let size = this.props.width - this.props.padding;
        let abFactors = store.getState("abFactors");
        let factorA = "Factor " + abFactors[0];
        let factorB = "Factor " + abFactors[1];
        return (
            <g>
              <text x={ -(this.props.height - this.props.padding) / 2 - 45 } y={ this.props.padding - 20 } transform={ "rotate(-90)" }>
                { factorA }
              </text>
              <text x={ size / 2 - 10 } y={ size + 40 } style={ styles.xAxis }>
                { factorB }
              </text>
            </g>
            );
    }
}

export default AxisTextLables;
