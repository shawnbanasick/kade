import styled from 'styled-components';
import LegendText from './LegendText';
import SigSortsViz from './SigSortsViz';
import RectangleText from './RectangleText';
import BaseRectangles from './BaseRectangles';
import LegendRectangle from './LegendRectangle';
import FactorTitleText from './FactorTitleText';
import HeaderRectangles from './HeaderRectangles';
import HeaderColNumbers from './HeaderColNumbers';
// import DownloadFactorVizButtons from './DownloadFactorVizButtons';

const getStyles = (props) => {
  // DYNAMIC height and width from prefs to set CONTAINER size
  // getState
  const positionData = props.positionData;
  const willAdjustCardWidth = props.factorVizOptions.willAdjustCardWidth;
  const willAdjustCardHeight = props.factorVizOptions.willAdjustCardHeight;
  const maxNumCards = Math.max(...positionData.instances);

  // set basic dimensions - HEIGHT
  let containerHeight;
  if (willAdjustCardHeight === true) {
    const newHeight = props.factorVizOptions.willAdjustCardHeightBy;
    containerHeight = 385 + newHeight * maxNumCards;
  } else {
    containerHeight = 145 * maxNumCards + 250;
  }

  // set basic dimensions - WIDTH
  let containerWidth;
  if (willAdjustCardWidth === true) {
    const newWidth = props.factorVizOptions.willAdjustCardWidthBy;
    containerWidth = 40 + newWidth * positionData.uniques.length;
  } else {
    containerWidth = 125 * positionData.uniques.length;
  }

  // make legend adjustment for container size?
  console.log(JSON.stringify(props.factorVizOptions, null, 2));
  const shouldDisplayLegend = props.factorVizOptions.willIncludeLegend;
  if (shouldDisplayLegend === false) {
    containerHeight -= 250;
  }

  const container = {
    margin: '0 auto',
    textAlign: 'center',
    width: containerWidth,
    height: containerHeight,
    marginBottom: 250,
  };

  return container;
};

const FactorViz = (props) => {
  console.log(JSON.stringify(props.factorVizOptions, null, 2));
  const willIndicateDistinguishing = props.factorVizOptions.willIndicateDistinguishing;
  const showDistinguishingAs = props.factorVizOptions.showDistinguishingAs;

  let shouldDisplaySig = false;
  if (willIndicateDistinguishing && showDistinguishingAs === 'symbol') {
    shouldDisplaySig = true;
  }

  let shouldDisplayLegend = props.factorVizOptions.willIncludeLegend;

  const margin = { top: 10, left: 10, bottom: 10, right: 10 };
  return (
    <VizContainer style={getStyles(props)}>
      <svg
        className="vizImage"
        id={`image${props.id}`}
        width={getStyles(props).width - margin.left - margin.right}
        height={getStyles(props).height - margin.top - margin.bottom}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
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
      {/* <DownloadFactorVizButtons {...props} /> */}
    </VizContainer>
  );
};

export default FactorViz;

const VizContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
