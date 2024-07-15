import { v4 as uuidv4 } from 'uuid';

const styles = {
  fill: 'white',
  stroke: 'black',
  strokeWidth: 1.5,
};

// todo - fix structure for eslint
// eslint-disable-next-line
const renderCircles = (props) => (coords, index) => {
  const circleProps = {
    cx: props.xScale(coords[0]),
    cy: props.yScale(coords[1]),
    r: 3.5,
  };
  return <circle key={uuidv4()} {...styles} {...circleProps} />;
};

const dataCirclesScree = (props) => <g>{props.data.map(renderCircles(props))}</g>;

export default dataCirclesScree;
