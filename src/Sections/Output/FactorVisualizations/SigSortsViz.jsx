import React from "react";

const widthValue = props => {
  let shouldAdjustWidth = props.factorVizOptions.willAdjustCardWidth;
  if (shouldAdjustWidth === true) {
    let newCardWidth = props.factorVizOptions.willAdjustCardWidthBy;
    return newCardWidth;
  }
  return 110;
};

const headerHeight = () => {
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

const styles = {
  fontSize: 12,
  stroke: "black",
  zindex: 9999
};

const renderSigSortsIndicators = props => {
  let shouldUseUnicode = props.shouldUseUnicode;
  let shouldShowZscoreArrows = props.shouldShowZscoreArrows;
  let willAdjustIndicatorSizeBy = props.willAdjustIndicatorSizeBy;

  let width = widthValue(props);
  let height = heightValue(props);
  let headerHeight1 = headerHeight();
  return (coords, index) => {
    let text,
      arrow,
      symbol;
    if (shouldUseUnicode) {
      if (shouldShowZscoreArrows) {
        symbol = props.data[index].sigVisualizationUni;
        arrow = props.data[index].directionSymbolUni;
        text = symbol + arrow;
      } else {
        text = props.data[index].sigVisualizationUni;
      }
    } else {
      if (shouldShowZscoreArrows) {
        symbol = props.data[index].sigVisualization;
        arrow = props.data[index].directionSymbol;
        text = symbol + arrow;
      } else {
        text = props.data[index].sigVisualization;
      }
    }
    // todo - set user selected custom value for dy for symbols
    const sigSymbolProps = {
      x: props.positionData.xPosLoop[index] * width + 10,
      y: props.positionData.yPosLoop[index] * height +
        headerHeight1 +
        22 +
        1.9 * willAdjustIndicatorSizeBy,
      key: props.positionData.numRectsArray[index],
      text: text,
      textAnchor: "left",
      fontSize: willAdjustIndicatorSizeBy
    };
    return (
      <text {...styles} {...sigSymbolProps}>
        { sigSymbolProps.text }
      </text>
      );
  };
};

export default props => {
  return <g>
           { props.data.map(renderSigSortsIndicators(props)) }
         </g>;
};
