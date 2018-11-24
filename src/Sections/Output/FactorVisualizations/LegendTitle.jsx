import React from "react";
// import store from "../../store";

const styles = {
    fontSize: 22,
    // fill: "white",
    stroke: "black",
    // width: 50,
    // strokeWidth: 1,
    zindex: 99,
    fontFamily: "Verdana, sans-serif"
};

const textProps = {
    x: 300,
    y: 20,
    textAnchor: "left"
};

export default () => {
    return (
        <g>
          <text {...styles} {...textProps}>
            Legend
          </text>
        </g>
        );
};
