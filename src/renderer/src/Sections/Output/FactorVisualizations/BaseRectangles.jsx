import React from "react";
import getVizState from "../../GlobalState/getVizState";

const styles = {
  // fill: "white",
  stroke: "black",
  strokeWidth: 0.5,
  zindex: 99
  // backgroundColor: "#FFFF"
};

const widthValue = props => {
  const shouldAdjustWidth = props.factorVizOptions.willAdjustCardWidth;
  if (shouldAdjustWidth === true) {
    const cardWidth = props.factorVizOptions.willAdjustCardWidthBy;
    return cardWidth;
  }
  return 110;
};

// const headerHeight = userValues => 26;
const headerHeight = () => 26;

const heightValue = props => {
  const shouldAdjustHeight = props.factorVizOptions.willAdjustCardHeight;
  if (shouldAdjustHeight === true) {
    let cardHeight = props.factorVizOptions.willAdjustCardHeightBy;
    if (isNaN(cardHeight || cardHeight < 60)) {
      cardHeight = 60;
    }
    return cardHeight;
  }
  return 110;
};
// getState
const titleHeight = getVizState("titleHeight");

const renderBaseRectangles = props => (coords, index) => {
  const factorVizOptions = getVizState("factorVizOptions");
  const shouldUseColor = factorVizOptions.willDisplayConsensusStates;
  const willIndicateDistinguishing =
    factorVizOptions.willIndicateDistinguishing;
  const showDistinguishingAs = factorVizOptions.showDistinguishingAs;
  const newFillColorConsensus = factorVizOptions.consensusIndicator;
  const newFillColorDistinguishing01 =
    factorVizOptions.distinguishingIndicator01;
  const newFillColorDistinguishing05 =
    factorVizOptions.distinguishingIndicator05;

  // set default color
  let fillColor = "white";
  // check if show distinguishing checked and color selected
  if (
    willIndicateDistinguishing === true &&
    showDistinguishingAs === "distinguishingColor"
  ) {
    if (props.data[index].isDistinguishing01 === true) {
      fillColor = newFillColorDistinguishing01;
    }
    if (props.data[index].isDistinguishing05 === true) {
      fillColor = newFillColorDistinguishing05;
    }
  }

  if (shouldUseColor === true) {
    if (props.data[index].isConsensus01State) {
      fillColor = newFillColorConsensus;
    }
    if (props.data[index].isConsensus05State) {
      fillColor = newFillColorConsensus;
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
