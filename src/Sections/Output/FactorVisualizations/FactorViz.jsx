import React from "react";
import LegendText from "./LegendText";
import SigSortsViz from "./SigSortsViz";
import RectangleText from "./RectangleText";
import BaseRectangles from "./BaseRectangles";
import LegendRectangle from "./LegendRectangle";
import FactorTitleText from "./FactorTitleText";
import HeaderRectangles from "./HeaderRectangles";
import HeaderColNumbers from "./HeaderColNumbers";
import DownloadFactorVizButtons from "./DownloadFactorVizButtons";
import ErrorBoundary from "./ErrorBoundary";

const getStyles = props => {
  // set dynamic height and width according to user prefs
  let positionData = props.positionData;
  let willAdjustCardWidth = props.factorVizOptions.willAdjustCardWidth;
  let willAdjustCardHeight = props.factorVizOptions.willAdjustCardHeight;
  let maxNumCards = Math.max(...positionData.instances);
  let containerHeight;
  if (willAdjustCardHeight === true) {
    let newHeight = props.factorVizOptions.willAdjustCardHeightBy;
    containerHeight = 385 + newHeight * maxNumCards;
  } else {
    containerHeight = 145 * maxNumCards + 250;
  }
  let shouldDisplayLegend = props.factorVizOptions.willIncludeLegend;
  if (shouldDisplayLegend === false) {
    containerHeight = containerHeight - 250;
  }

  let containerWidth;
  if (willAdjustCardWidth === true) {
    let newWidth = props.factorVizOptions.willAdjustCardWidthBy;
    containerWidth = 20 + newWidth * positionData.uniques.length;
  } else {
    containerWidth = 125 * positionData.uniques.length;
  }

  let container = {
    margin: "0 auto",
    textAlign: "center",
    width: containerWidth,
    height: containerHeight,
    marginBottom: 250
  };
  return container;
};

let FactorViz = props => {
  let shouldDisplaySig = props.factorVizOptions.willIndicateDistinguishing;
  let shouldDisplayLegend = props.factorVizOptions.willIncludeLegend;
  let margin = { top: 10, left: 10, bottom: 10, right: 10 };
  return (
    <ErrorBoundary>
      <div style={getStyles(props)}>
        <svg
          className="vizImage"
          id={"image" + props.id}
          // style={styles.svg}

          //width={props.width}
          width={getStyles(props).width - margin.left - margin.right}
          // height={props.height}
          height={getStyles(props).height - margin.top - margin.bottom}
        >
          <g transform={"translate(" + margin.left + "," + margin.top + ")"}>
            <FactorTitleText {...props} />
            <HeaderRectangles {...props} />
            <HeaderColNumbers {...props} />
            <BaseRectangles {...props} />
            <RectangleText {...props} />
            {shouldDisplaySig && <SigSortsViz {...props} />}
            {shouldDisplayLegend && <LegendRectangle {...props} />}
            {shouldDisplayLegend && <LegendText {...props} />}
          </g>
        </svg>
        <DownloadFactorVizButtons {...props} />
      </div>
    </ErrorBoundary>
  );
};

export default FactorViz;
