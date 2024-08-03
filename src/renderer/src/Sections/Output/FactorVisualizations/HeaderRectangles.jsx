import vizState from '../../GlobalState/vizState';
import { v4 as uuidv4 } from 'uuid';

const styles = {
  fill: 'white',
  stroke: 'black',
  strokeWidth: 1,
  zindex: 99,
};

const heightValue = () => 26;

const widthValue = (props) => {
  const shouldAdjustWidth = props.factorVizOptions.willAdjustCardWidth;
  if (shouldAdjustWidth === true) {
    const cardWidth = props.factorVizOptions.willAdjustCardWidthBy;
    return cardWidth;
  }
  return 110;
};

// eslint-disable-next-line
const renderBaseRectangles = (props) => (coords, index) => {
  const titleHeight = vizState((state) => state.titleHeight);

  const rectangleProps = {
    x: index * widthValue(props),
    y: 0 + titleHeight,
    width: widthValue(props),
    height: heightValue(),
  };

  return <rect {...styles} {...rectangleProps} key={uuidv4()} />;
};

const HeaderRectangles1 = (props) => (
  <g>{props.positionData.uniques.map(renderBaseRectangles(props))}</g>
);

export default HeaderRectangles1;
