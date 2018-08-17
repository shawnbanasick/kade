import React from "react";
import store from "../../store";

const getXCoords = props => {
  let totalWidth = props.positionData.instances.length * 110;
  if (props.factorVizOptions.willAdjustCardWidth === true) {
    totalWidth =
      props.positionData.instances.length *
      props.factorVizOptions.willAdjustCardWidthBy;
  }
  let halfWidth = totalWidth / 2;
  let xCoord = halfWidth;
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

class LegendText extends React.Component {
  constructor() {
    super();
    // Bind the method to the component context
    this.renderLegendRectangleText = this.renderLegendRectangleText.bind(this);
  }

  renderLegendRectangleText = props => {
    let displayColor = props.factorVizOptions.consensusIndicator;
    let xLocation = getXCoords(props);
    let yLocation = yValue(props) + 5;
    let useUnicode = props.factorVizOptions.willUseDistingUnicode;
    let shouldDisplayConsensus =
      props.factorVizOptions.willDisplayConsensusStates;
    let willIndicateDistinguishing =
      props.factorVizOptions.willIndicateDistinguishing;
    let willDisplayDistingCompareSymbols =
      props.factorVizOptions.willDisplayDistingCompareSymbols;
    if (willIndicateDistinguishing === false) {
      willDisplayDistingCompareSymbols = false;
      store.setState("willDisplayDistingCompareSymbols");
    }
    let consensusYLocation = 170;
    if (willIndicateDistinguishing === false) {
      consensusYLocation = consensusYLocation - 55;
    }
    if (willDisplayDistingCompareSymbols === false) {
      consensusYLocation = consensusYLocation - 60;
    }

    let symbol05 = "*";
    let symbol01 = "**";
    let arrowLeft = "\u003C\u003C";
    let arrowRight = "\u003E\u003E";
    if (useUnicode) {
      //symbol05 = "\u25CE";
      symbol05 = "\u2733";
      // symbol01 = "\u25C9";
      symbol01 = "\u2733\u2733";
      arrowLeft = "\u25C4";
      arrowRight = "\u25BA";
    }
    let additionalXLocationValue = 260;

    let titleStyles = {
      x: xLocation,
      y: yLocation + 30,
      fontSize: 26,
      fontWeight: "bold",
      textAnchor: "middle",
      fontFamily: "Verdana, sans-serif"
    };

    let sigSymbolStyle1 = {
      x: xLocation - additionalXLocationValue,
      y: yLocation + 65,
      fontSize: 16,
      fontFamily: "Verdana, sans-serif"
    };

    let sigSymbolStyle2 = {
      x: xLocation - additionalXLocationValue,
      y: yLocation + 95,
      fontSize: 16,
      fontFamily: "Verdana, sans-serif"
    };

    let sigSymbolStyle3 = {
      x: xLocation - additionalXLocationValue,
      y: yLocation + 125,
      fontSize: 16,
      fontFamily: "Verdana, sans-serif"
    };

    let sigSymbolStyle4 = {
      x: xLocation - additionalXLocationValue,
      y: yLocation + 155,
      fontSize: 20,
      fontFamily: "Verdana, sans-serif"
    };

    let sigSymbolStyle5 = {
      x: xLocation - additionalXLocationValue + 20,
      y: yLocation + 155,
      fontSize: 16,
      fontFamily: "Verdana, sans-serif"
    };

    let sigSymbolStyle6 = {
      x: xLocation - additionalXLocationValue,
      y: yLocation + 155,
      fontSize: 16,
      fontFamily: "Verdana, sans-serif"
    };

    let consensusRectStyles = {
      x: xLocation - additionalXLocationValue,
      y: yLocation + consensusYLocation,
      width: 15,
      height: 15,
      fill: `rgba(${displayColor.r}, ${displayColor.g}, ${displayColor.b}, ${
        displayColor.a
      })`,
      stroke: "black",
      strokeWidth: 1
    };

    let consensusStatementStyle = {
      x: xLocation - additionalXLocationValue + 20,
      y: yLocation + 14 + consensusYLocation,
      fontSize: 16,
      fontFamily: "Verdana, sans-serif"
    };

    if (useUnicode === true) {
      return (
        <g>
          <text {...titleStyles}>Legend </text>
          {willIndicateDistinguishing && (
            <g>
              <text {...sigSymbolStyle1}>
                {symbol05} Distinguishing statement at P
                {"\u003C"} 0.05
              </text>
              <text {...sigSymbolStyle2}>
                {symbol01} Distinguishing statement at P
                {"\u003C"} 0.01
              </text>
            </g>
          )}
          {willDisplayDistingCompareSymbols && (
            <g>
              <text {...sigSymbolStyle3}>
                {arrowRight} z-Score for the statement is higher than in all the
                other factors
              </text>
              <text {...sigSymbolStyle4}>{arrowLeft}</text>
              <text {...sigSymbolStyle5}>
                z-Score for the statement is lower than in all the other factors
              </text>
            </g>
          )}

          {shouldDisplayConsensus && <rect {...consensusRectStyles} />}
          {shouldDisplayConsensus && (
            <text {...consensusStatementStyle}>Consensus statement</text>
          )}
        </g>
      );
    } else {
      return (
        <g>
          <text {...titleStyles}>Legend </text>
          {willIndicateDistinguishing && (
            <g>
              <text {...sigSymbolStyle1}>
                {symbol05} {"  "}Distinguishing statement at P
                {"\u003C"} 0.05
              </text>
              <text {...sigSymbolStyle2}>
                {symbol01} Distinguishing statement at P
                {"\u003C"} 0.01
              </text>
              <text {...sigSymbolStyle3}>
                {arrowRight} z-Score for the statement is higher than in all the
                other factors
              </text>
              <text {...sigSymbolStyle6}>
                {arrowLeft} z-Score for the statement is lower than in all the
                other factors
              </text>{" "}
            </g>
          )}
          {shouldDisplayConsensus && <rect {...consensusRectStyles} />}
          {shouldDisplayConsensus && (
            <text {...consensusStatementStyle}>Consensus statement</text>
          )}
        </g>
      );
    }
  };

  render() {
    return <g>{this.renderLegendRectangleText(this.props)}</g>;
  }
}

export default LegendText;