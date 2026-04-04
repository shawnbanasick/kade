import rotationState from '../../../GlobalState/rotationState';

const styles = {
  stroke: 'black',
  strokeWidth: 0.5,
};

const getFillColor = (data) => {
  if (data.factor1Sig === true) return '#b4dffe';
  if (data.factor2Sig === true) return '#ffe4b2';
  return '#d3d3d3';
};

const showPopUp = (info) => rotationState.setState({ participantDataObject: info });
const closePopUp = () => rotationState.setState({ participantDataObject: false });

const renderCircles = (props) => (coords, index) => {
  const circleProps = {
    cx: props.xScale(props.data[index].factor2),
    cy: props.yScale(props.data[index].factor1),
    r: 9,
    fill: getFillColor(props.data[index]),
    text: props.data[index].num,
    // key removed from here
  };

  return (
    <circle
      key={props.data[index].num} // key passed directly, not via spread
      onMouseOver={() => showPopUp(props.data[index])}
      onMouseOut={() => closePopUp()}
      {...styles}
      {...circleProps}
    />
  );
};

const dataCirclesJudge = (props) => <g>{props.data.map(renderCircles(props))}</g>;

export default dataCirclesJudge;
