import React from "react";
import store from "../../store";
//import { easyComp } from "react-easy-state";

const styles = {
  fill: "white",
  stroke: "black",
  strokeWidth: 0.5,
  zindex: 99
};

const getHeight = props => {
  let legendBoxHeight = 50;
  // get state from props
  let shouldDisplayConsensus = props.factorVizOptions.willDisplayConsensusStates;
  let willIndicateDistinguishing = props.factorVizOptions.willIndicateDistinguishing;
  let willDisplayDistingCompareSymbols = props.factorVizOptions.willDisplayDistingCompareSymbols;

  // make adjustments to box size
  if (willIndicateDistinguishing === true) {
    legendBoxHeight = legendBoxHeight + 100;
  }
  if (willDisplayDistingCompareSymbols === true) {
    legendBoxHeight = legendBoxHeight + 50;
  }
  if (shouldDisplayConsensus === true) {
    legendBoxHeight = legendBoxHeight + 10;
  }
  if (willIndicateDistinguishing === false && shouldDisplayConsensus === true) {
    legendBoxHeight = legendBoxHeight + 40;
  }
  return legendBoxHeight;
};

const getXCoords = props => {
  let totalWidth = props.positionData.instances.length * 110;
  if (props.factorVizOptions.willAdjustCardWidth === true) {
    totalWidth = props.positionData.instances.length *
    props.factorVizOptions.willAdjustCardWidthBy;
  }
  let halfWidth = totalWidth / 2;
  let xCoord = halfWidth - 300;
  return xCoord;
};

const yValue = props => {
  let maxColumnHeight = store.getState("maxColumnHeight");
  let defaultHeight = maxColumnHeight * 110 + 100;

  let shouldAdjustHeight = props.factorVizOptions.willAdjustCardHeight;
  if (shouldAdjustHeight === true) {
    let cardHeight = props.factorVizOptions.willAdjustCardHeightBy;
    let yValue = maxColumnHeight * cardHeight + 100;
    return yValue;
  }
  return defaultHeight;
};

class LegendRectangle extends React.Component {
  constructor() {
    super();
    // Bind the method to the component context
    this.renderLegendRectangle = this.renderLegendRectangle.bind(this);
  }

  renderLegendRectangle = props => {
    const legendProps = {
      x: getXCoords(props),
      y: yValue(props),
      width: 600,
      height: getHeight(props)
    };
    return <rect {...styles} {...legendProps} />;
  };

  render() {
    return <g>
             { this.renderLegendRectangle(this.props) }
           </g>;
  }
}

export default LegendRectangle;
