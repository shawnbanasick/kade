import vizState from '../../GlobalState/vizState';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line
const renderBaseRectangles = (props) => (coords, index) => {
  // getState
  const factorVizOptions = vizState((state) => state.factorVizOptions);
  const titleHeight = vizState((state) => state.titleHeight);

  const shouldUseColor = factorVizOptions.willDisplayConsensusStates;
  const willIndicateDistinguishing = factorVizOptions.willIndicateDistinguishing;
  const showDistinguishingAs = factorVizOptions.showDistinguishingAs;
  const newFillColorConsensus = factorVizOptions.consensusIndicator;
  const newFillColorDistinguishing01 = factorVizOptions.distinguishingIndicator01;
  const newFillColorDistinguishing05 = factorVizOptions.distinguishingIndicator05;

  const styles = {
    // fill: "white",
    stroke: 'black',
    strokeWidth: 0.5,
    zindex: 99,
    // backgroundColor: "#FFFF"
  };

  const widthValue = () => {
    const shouldAdjustWidth = factorVizOptions.willAdjustCardWidth;
    if (shouldAdjustWidth === true) {
      const cardWidth = factorVizOptions.willAdjustCardWidthBy;
      return cardWidth;
    }
    return 110;
  };

  // const headerHeight = userValues => 26;
  const headerHeight = () => 26;

  const heightValue = () => {
    const shouldAdjustHeight = factorVizOptions.willAdjustCardHeight;
    if (shouldAdjustHeight === true) {
      let cardHeight = factorVizOptions.willAdjustCardHeightBy;
      if (isNaN(cardHeight || cardHeight < 60)) {
        cardHeight = 60;
      }
      return cardHeight;
    }
    return 110;
  };

  // set default color
  let fillColor = 'white';
  // check if show distinguishing checked and color selected
  if (willIndicateDistinguishing === true && showDistinguishingAs === 'distinguishingColor') {
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
    y: props.positionData.yPosLoop[index] * heightValue(props) + headerHeight() + titleHeight,
    width: widthValue(props),
    height: heightValue(props),
    fill: fillColor,
  };
  return <rect {...styles} {...rectangleProps} key={uuidv4()} />;
};
// eslint-disable-next-line
export default (props) => (
  <g>{props.positionData.numRectsArray.map(renderBaseRectangles(props))}</g>
);
