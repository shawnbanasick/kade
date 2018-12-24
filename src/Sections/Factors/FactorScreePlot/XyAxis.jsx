import React from "react";
import AxisLeft from "./AxisLeft";
import AxisBottom from "./AxisBottom";

export default props => {
    const xSettings = {
        translate: `translate(0, ${props.height - props.padding})`,
        scale: props.xScale,
        orient: "bottom"
    };
    const ySettings = {
        translate: `translate(${props.padding}, 0)`,
        scale: props.yScale,
        orient: "left"
    };
    return (
        <g className="xy-axis">
          <AxisBottom {...xSettings} />
          <AxisLeft {...ySettings} />
        </g>
        );
};
