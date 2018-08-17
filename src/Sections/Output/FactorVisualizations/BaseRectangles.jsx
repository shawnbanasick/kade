import React from "react";
import store from "../../../store";
// import { view } from "react-easy-state";

const styles = {
  // fill: "white",
  stroke: "black",
  strokeWidth: 0.5,
  zindex: 99
};

const widthValue = props => {
  const shouldAdjustWidth = props.factorVizOptions.willAdjustCardWidth;
  if (shouldAdjustWidth === true) {
    const cardWidth = props.factorVizOptions.willAdjustCardWidthBy;
    return cardWidth;
  }
  return 110;
};

const headerHeight = userValues => 26;

const heightValue = props => {
  const shouldAdjustHeight = props.factorVizOptions.willAdjustCardHeight;
  if (shouldAdjustHeight === true) {
    const cardHeight = props.factorVizOptions.willAdjustCardHeightBy;
    return cardHeight;
  }
  return 110;
};

const titleHeight = store.getState("titleHeight");

const renderBaseRectangles = props => (coords, index) => {
    const factorVizOptions = store.getState("factorVizOptions");
    const shouldUseColor = factorVizOptions.willDisplayConsensusStates;

    const newFillColor = factorVizOptions.consensusIndicator;

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
      y:
        props.positionData.yPosLoop[index] * heightValue(props) +
        headerHeight() +
        titleHeight,
      width: widthValue(props),
      height: heightValue(props),
      key: props.positionData.numRectsArray[index],
      fill: fillColor
    };
    return <rect {...styles} {...rectangleProps} />;
  };

export default props => (
    <g>{props.positionData.numRectsArray.map(renderBaseRectangles(props))}</g>
  );
