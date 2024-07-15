import rotationState from '../../../GlobalState/rotationState';
import { v4 as uuidv4 } from 'uuid';

const styles = {
  // fill: "white",
  stroke: 'black',
  strokeWidth: 0.5,
  // zindex: 99
};

const getFillColor = (data) => {
  if (data.factor1Sig === true) {
    return '#b4dffe'; // "aquamarine"; // "#ffe4b2";
  }
  if (data.factor2Sig === true) {
    return '#ffe4b2';
  }
  return '#d3d3d3';
};

const showPopUp = function (info) {
  rotationState.setState({ participantDataObject: info });
};

const closePopUp = function () {
  rotationState.setState({ participantDataObject: false });
};

// todo - fix structure for eslint
// eslint-disable-next-line
const renderCircles = (props) => (coords, index) => {
  const circleProps = {
    cx: props.xScale(props.data[index].factor2),
    cy: props.yScale(props.data[index].factor1),
    r: 9,
    key: props.data[index].num,
    fill: getFillColor(props.data[index]),
    text: props.data[index].num,
    // on:("mouseover", showPopUp())
  };

  return (
    <circle
      key={uuidv4()}
      onMouseOver={() => showPopUp(props.data[index])}
      onMouseOut={() => closePopUp()}
      {...styles}
      {...circleProps}
    />
  );
};

const dataCirclesJudge = (props) => <g>{props.data.map(renderCircles(props))}</g>;

export default dataCirclesJudge;
