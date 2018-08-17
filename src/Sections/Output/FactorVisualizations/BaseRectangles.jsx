import React from "react";
import store from "../../store";
//import { easyComp } from "react-easy-state";

const styles = {
    // fill: "white",
    stroke: "black",
    strokeWidth: 0.5,
    zindex: 99
};

const widthValue = props => {
    let shouldAdjustWidth = props.factorVizOptions.willAdjustCardWidth;
    if (shouldAdjustWidth === true) {
        let cardWidth = props.factorVizOptions.willAdjustCardWidthBy;
        return cardWidth;
    }
    return 110;
};

const headerHeight = userValues => {
    return 26;
};

const heightValue = props => {
    let shouldAdjustHeight = props.factorVizOptions.willAdjustCardHeight;
    if (shouldAdjustHeight === true) {
        let cardHeight = props.factorVizOptions.willAdjustCardHeightBy;
        return cardHeight;
    }
    return 110;
};

const titleHeight = store.getState("titleHeight");

const renderBaseRectangles = props => {
    return (coords, index) => {
        let factorVizOptions = store.getState("factorVizOptions");
        let shouldUseColor = factorVizOptions.willDisplayConsensusStates;

        let newFillColor = factorVizOptions.consensusIndicator;

        let fillColor = "white";
        if (shouldUseColor === true) {
            if (props.data[index].isConsensus01State) {
                fillColor = `rgba(${newFillColor.r}, ${newFillColor.g}, ${
          newFillColor.b
        }, ${newFillColor.a})`;
            }
            if (props.data[index].isConsensus05State) {
                fillColor = `rgba(${newFillColor.r}, ${newFillColor.g}, ${
          newFillColor.b
        }, ${newFillColor.a})`;
            }
        }

        const rectangleProps = {
            x: props.positionData.xPosLoop[index] * widthValue(props),
            y: props.positionData.yPosLoop[index] * heightValue(props) +
                headerHeight() +
                titleHeight,
            width: widthValue(props),
            height: heightValue(props),
            key: props.positionData.numRectsArray[index],
            fill: fillColor
        };
        return <rect {...styles} {...rectangleProps} />;
    };
};

export default props => {
    return (
        <g>
          { props.positionData.numRectsArray.map(renderBaseRectangles(props)) }
        </g>
        );
};
