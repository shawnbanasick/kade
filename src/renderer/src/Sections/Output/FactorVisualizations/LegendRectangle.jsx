import React from "react";
import getVizState from "../../GlobalState/getVizState";

const styles = {
  fill: "white",
  stroke: "black",
  strokeWidth: 0.5,
  zindex: 99
};

const getHeight = props => {
  let legendBoxHeight = 50;
  // get state from props
  const shouldDisplayConsensus =
    props.factorVizOptions.willDisplayConsensusStates;
  const willIndicateDistinguishing =
    props.factorVizOptions.willIndicateDistinguishing;
  const willDisplayDistingCompareSymbols =
    props.factorVizOptions.willDisplayDistingCompareSymbols;

  // make adjustments to box size
  if (willIndicateDistinguishing === true) {
    legendBoxHeight += 100;
  }
  if (willDisplayDistingCompareSymbols === true) {
    legendBoxHeight += 50;
  }
  if (shouldDisplayConsensus === true) {
    legendBoxHeight += 10;
  }
  if (willIndicateDistinguishing === false && shouldDisplayConsensus === true) {
    legendBoxHeight += 40;
  }
  return legendBoxHeight;
};

const getXCoords = props => {
  let totalWidth = props.positionData.instances.length * 110;
  if (props.factorVizOptions.willAdjustCardWidth === true) {
    totalWidth =
      props.positionData.instances.length *
      props.factorVizOptions.willAdjustCardWidthBy;
  }
  const halfWidth = totalWidth / 2;
  const xCoord = halfWidth - 300;
  return xCoord;
};

let yValue = props => {
  const maxColumnHeight = getVizState("maxColumnHeight");
  const defaultHeight = maxColumnHeight * 110 + 100;

  const shouldAdjustHeight = props.factorVizOptions.willAdjustCardHeight;
  if (shouldAdjustHeight === true) {
    const cardHeight = +props.factorVizOptions.willAdjustCardHeightBy;
    const newYvalue = maxColumnHeight * cardHeight + 100;
    return newYvalue;
  }
  return defaultHeight;
};

class LegendRectangle extends React.Component {
  constructor() {
    super();
    // Bind the method to the component context
    this.renderLegendRectangle = this.renderLegendRectangle.bind(this);
  }

  renderLegendRectangle(props) {
    const legendProps = {
      x: getXCoords(props),
      y: yValue(props),
      width: 600,
      height: getHeight(props)
    };
    return <rect {...styles} {...legendProps} />;
  }

  render() {
    return <g>{this.renderLegendRectangle(this.props)}</g>;
  }
}

export default LegendRectangle;
