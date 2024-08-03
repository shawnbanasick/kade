import React from 'react';
import vizState from '../../GlobalState/vizState';

const styles = {
  fill: 'white',
  stroke: 'black',
  strokeWidth: 0.5,
  zindex: 99,
};

const LegendRectangle = (props) => {
  const factorVizOptions = vizState((state) => state.factorVizOptions);

  const getHeight = () => {
    let legendBoxHeight = 50;
    // get state from props
    const shouldDisplayConsensus = factorVizOptions.willDisplayConsensusStates;
    const willIndicateDistinguishing = factorVizOptions.willIndicateDistinguishing;
    const willDisplayDistingCompareSymbols = factorVizOptions.willDisplayDistingCompareSymbols;

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

  const getXCoords = (props) => {
    let totalWidth = props.positionData.instances.length * 110;
    if (factorVizOptions.willAdjustCardWidth === true) {
      totalWidth = props.positionData.instances.length * factorVizOptions.willAdjustCardWidthBy;
    }
    const halfWidth = totalWidth / 2;
    const xCoord = halfWidth - 300;
    return xCoord;
  };

  let yValue = () => {
    const maxColumnHeight = vizState.getState().maxColumnHeight;
    const defaultHeight = maxColumnHeight * 110 + 100;

    const shouldAdjustHeight = factorVizOptions.willAdjustCardHeight;
    if (shouldAdjustHeight === true) {
      const cardHeight = +factorVizOptions.willAdjustCardHeightBy;
      const newYvalue = maxColumnHeight * cardHeight + 100;
      return newYvalue;
    }
    return defaultHeight;
  };

  const renderLegendRectangle = (props) => {
    const legendProps = {
      x: getXCoords(props),
      y: yValue(props),
      width: 600,
      height: getHeight(props),
    };
    return <rect {...styles} {...legendProps} />;
  };

  return <g>{renderLegendRectangle(props)}</g>;
};

export default LegendRectangle;
