import React from "react";
import store from "../../store";
//import { easyComp } from "react-easy-state";

const styles = {
    fill: "white",
    stroke: "black",
    strokeWidth: 1,
    zindex: 99
};

const heightValue = () => {
    return 26;
};

const titleHeight = store.getState("titleHeight");

const widthValue = props => {
    let shouldAdjustWidth = props.factorVizOptions.willAdjustCardWidth;
    if (shouldAdjustWidth === true) {
        let cardWidth = props.factorVizOptions.willAdjustCardWidthBy;
        return cardWidth;
    }
    return 110;
};

const renderBaseRectangles = props => {
    return (coords, index) => {
        const rectangleProps = {
            x: index * widthValue(props),
            y: 0 + titleHeight,
            width: widthValue(props),
            height: heightValue(),
            key: props.positionData.numRectsArray[index]
        };
        return <rect {...styles} {...rectangleProps} />;
    };
};

export default props => {
    return <g>
             { props.positionData.uniques.map(renderBaseRectangles(props)) }
           </g>;
};
