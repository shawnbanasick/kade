import rotationState from '../../../GlobalState/rotationState';
import { v4 as uuidv4 } from 'uuid';

const styles = {
  stroke: 'black',
  strokeWidth: 0.5,
  // zindex: 99,
  fontSize: 10,
  cursor: 'default',
};

const showPopUp = (info) => {
  rotationState.setState({ participantDataObject: info });
};

const closePopUp = () => {
  rotationState.setState({ participantDataObject: false });
};

// todo - fix structure for eslint
// eslint-disable-next-line
const renderCircleText = (props) => (coords, index) => {
  const circleProps = {
    x: props.xScale(props.data[index].factor2),
    y: props.yScale(props.data[index].factor1 - 0.01),
    key: props.data[index].num,
    text: props.data[index].num,
    textAnchor: 'middle',
  };
  return (
    <text
      key={uuidv4()}
      onMouseOver={() => showPopUp(props.data[index])}
      onMouseOut={() => closePopUp()}
      {...styles}
      {...circleProps}
    >
      {' '}
      {circleProps.text}
    </text>
  );
};

const CircleTextJudge = (props) => <g>{props.data.map(renderCircleText(props))}</g>;

export default CircleTextJudge;
