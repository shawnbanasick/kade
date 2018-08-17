import React from "react";
// import store from "../../store";

const styles = {
  fontSize: 28,
  // fill: "white",
  stroke: "black",
  // width: 50,
  // strokeWidth: 1,
  zindex: 99,
  fontFamily: "Verdana, sans-serif"
};

const textProps = {
  x: 0,
  y: 20,
  textAnchor: "left"
};

export default props => {
  return (
    <g>
      <text {...styles} {...textProps}>
        {props.name}
      </text>
    </g>
  );
};
