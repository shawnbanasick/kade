import React from "react";
import AxisLeft from "./AxisLeft";
import AxisBottom from "./AxisBottom";

export default props => {
  // console.log('hoc props: ' + JSON.stringify(props));

  const xSettings = {
    translate: `translate(0, ${props.height - props.padding})`,
    scale: props.xScale,
    orient: "bottom",
    height: props.height,
    width: props.width,
    padding: props.padding
  };
  const ySettings = {
    translate: `translate(${props.padding}, 0)`,
    scale: props.yScale,
    orient: "left",
    height: props.height,
    width: props.width,
    padding: props.padding
  };
  return (
    <g className="xy-axis">
      <AxisBottom {...xSettings} />
      <AxisLeft {...ySettings} />
    </g>
  );
};
