import React from "react";
import state from "../../../store";

function getXCoords(props) {
  let totalWidth = props.positionData.instances.length * 110;
  if (props.factorVizOptions.willAdjustCardWidth === true) {
    totalWidth =
      props.positionData.instances.length *
      props.factorVizOptions.willAdjustCardWidthBy;
  }
  const halfWidth = totalWidth / 2;
  const xCoord = halfWidth;
  return xCoord;
}

function getYValue(props) {
  // console.log(`props ${  JSON.stringify(props)}`);

  const maxColumnHeight = state.getState("maxColumnHeight");
  const defaultHeight = maxColumnHeight * 110 + 100;

  const shouldAdjustHeight = props.factorVizOptions.willAdjustCardHeight;
  if (shouldAdjustHeight === true) {
    const cardHeight = props.factorVizOptions.willAdjustCardHeightBy;
    const yValue = maxColumnHeight * cardHeight + 100;
    return yValue;
  }
  return defaultHeight;
}

class LegendText extends React.Component {
  constructor() {
    super();
    // Bind the method to the component context
    this.renderLegendRectangleText = this.renderLegendRectangleText.bind(this);
  }

  renderLegendRectangleText(props) {
    // console.log(`props: ${  JSON.stringify(props)}`);

    const displayColor = props.factorVizOptions.consensusIndicator;
    const distinguishingIndicator05 =
      props.factorVizOptions.distinguishingIndicator05;
    const distinguishingIndicator01 =
      props.factorVizOptions.distinguishingIndicator01;

    const xLocation = getXCoords(props);
    const yLocation = getYValue(props) + 5;

    const showDistinguishingAs = props.factorVizOptions.showDistinguishingAs;

    const shouldDisplayConsensus =
      props.factorVizOptions.willDisplayConsensusStates;
    const willIndicateDistinguishing =
      props.factorVizOptions.willIndicateDistinguishing;
    let willDisplayDistingCompareSymbols =
      props.factorVizOptions.willDisplayDistingCompareSymbols;
    // hide the comparison symbols if distinguishing is not displayed
    if (willIndicateDistinguishing === false) {
      willDisplayDistingCompareSymbols = false;
      // state.setState("willDisplayDistingCompareSymbols");
    }
    let consensusYLocation = 170;
    if (willIndicateDistinguishing === false) {
      consensusYLocation -= 55;
    }
    if (willDisplayDistingCompareSymbols === false) {
      consensusYLocation -= 60;
    }

    // let symbol05 = "*";
    // let symbol01 = "**";
    // let arrowLeft = "\u003C\u003C";
    // let arrowRight = "\u003E\u003E";
    // if (useUnicode) {
    // symbol05 = "\u25CE";
    const symbol05 = "\u2733\u0020\u0020";
    // symbol01 = "\u25C9";
    const symbol01 = "\u2733\u2733";
    const arrowLeft = "\u25C4\u0020";
    const arrowRight = "\u25BA\u0020";
    // }
    const additionalXLocationValue = 260;

    const titleStyles = {
      x: xLocation,
      y: yLocation + 30,
      fontSize: 26,
      fontWeight: "bold",
      textAnchor: "middle",
      fontFamily: "Arial, sans-serif"
    };

    const astrick05Style = {
      x: xLocation - additionalXLocationValue + 12,
      y: yLocation + 65,
      fontSize: 16,
      fontFamily: "Arial, sans-serif"
    };

    const astrick01Style = {
      x: xLocation - additionalXLocationValue,
      y: yLocation + 95,
      fontSize: 16,
      fontFamily: "Arial, sans-serif"
    };

    const sigSymbolTextStyle1 = {
      x: xLocation - additionalXLocationValue + 30,
      y: yLocation + 65,
      fontSize: 16,
      fontFamily: "Arial, sans-serif"
    };

    const sigSymbolTextStyle2 = {
      x: xLocation - additionalXLocationValue + 30,
      y: yLocation + 95,
      fontSize: 16,
      fontFamily: "Arial, sans-serif"
    };

    const zScoreTextHigherStyle3 = {
      x: xLocation - additionalXLocationValue + 30,
      y: yLocation + 125,
      fontSize: 16,
      fontFamily: "Arial, sans-serif"
    };

    const arrowLeftStyle4 = {
      x: xLocation - additionalXLocationValue + 9,
      y: yLocation + 155,
      fontSize: 16,
      fontFamily: "Arial, sans-serif"
    };

    const zScoreTextLowerStyle5 = {
      x: xLocation - additionalXLocationValue + 30,
      y: yLocation + 155,
      fontSize: 16,
      fontFamily: "Arial, sans-serif"
    };

    const arrowRightStyle6 = {
      x: xLocation - additionalXLocationValue + 9,
      y: yLocation + 125,
      fontSize: 16,
      fontFamily: "Arial, sans-serif"
    };

    const consensusRectStyles = {
      x: xLocation - additionalXLocationValue + 9,
      y: yLocation + consensusYLocation,
      width: 15,
      height: 15,
      fill: displayColor,
      stroke: "black",
      strokeWidth: 1
    };

    const distingRectStyles01 = {
      x: xLocation - additionalXLocationValue + 9,
      y: yLocation + 81,
      width: 15,
      height: 15,
      fill: distinguishingIndicator01,
      stroke: "black",
      strokeWidth: 1
    };

    const distingRectStyles05 = {
      x: xLocation - additionalXLocationValue + 9,
      y: yLocation + 51,
      width: 15,
      height: 15,
      fill: distinguishingIndicator05,
      stroke: "black",
      strokeWidth: 1
    };

    const consensusStatementStyle = {
      x: xLocation - additionalXLocationValue + 30,
      y: yLocation + 14 + consensusYLocation,
      fontSize: 16,
      fontFamily: "Arial, sans-serif"
    };

    if (showDistinguishingAs === "symbol") {
      return (
        <g>
          <text {...titleStyles}>Legend </text>
          {willIndicateDistinguishing && (
            <g>
              <text {...astrick05Style}>{symbol05}</text>
              <text {...sigSymbolTextStyle1}>
                Distinguishing statement at P{"\u003C"} 0.05
              </text>
              <text {...astrick01Style}>{symbol01}</text>
              <text {...sigSymbolTextStyle2}>
                Distinguishing statement at P{"\u003C"} 0.01
              </text>
            </g>
          )}
          {willDisplayDistingCompareSymbols && (
            <g>
              <text {...arrowRightStyle6}>{arrowRight}</text>
              <text {...zScoreTextHigherStyle3}>
                z-Score for the statement is higher than in all other factors
              </text>
              <text {...arrowLeftStyle4}>{arrowLeft}</text>
              <text {...zScoreTextLowerStyle5}>
                z-Score for the statement is lower than in all other factors
              </text>
            </g>
          )}
          {shouldDisplayConsensus && <rect {...consensusRectStyles} />}
          {shouldDisplayConsensus && (
            <text {...consensusStatementStyle}>Consensus statement</text>
          )}
        </g>
      );
    }
    return (
      <g>
        <text {...titleStyles}>Legend </text>
        {willIndicateDistinguishing && (
          <g>
            <rect {...distingRectStyles05} />
            <text {...sigSymbolTextStyle1}>
              Distinguishing statement at P{"\u003C"} 0.05
            </text>
            <rect {...distingRectStyles01} />
            <text {...sigSymbolTextStyle2}>
              Distinguishing statement at P{"\u003C"} 0.01
            </text>
          </g>
        )}
        {willDisplayDistingCompareSymbols && (
          <g>
            <text {...arrowRightStyle6}>{arrowRight}</text>
            <text {...zScoreTextHigherStyle3}>
              z-Score for the statement is higher than in all other factors
            </text>
            <text {...arrowLeftStyle4}>{arrowLeft}</text>
            <text {...zScoreTextLowerStyle5}>
              z-Score for the statement is lower than in all other factors
            </text>
          </g>
        )}
        {shouldDisplayConsensus && <rect {...consensusRectStyles} />}
        {shouldDisplayConsensus && (
          <text {...consensusStatementStyle}>Consensus statement</text>
        )}
      </g>
    );
  }

  render() {
    return <g>{this.renderLegendRectangleText(this.props)}</g>;
  }
}

export default LegendText;
