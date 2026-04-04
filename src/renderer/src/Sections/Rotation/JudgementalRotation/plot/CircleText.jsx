import rotationState from '../../../GlobalState/rotationState';

const styles = {
  stroke: 'black',
  strokeWidth: 0.5,
  fontSize: 10,
  cursor: 'default',
};

const showPopUp = (info) => rotationState.setState({ participantDataObject: info });
const closePopUp = () => rotationState.setState({ participantDataObject: false });

const renderCircleText = (props) => (coords, index) => {
  const circleProps = {
    x: props.xScale(props.data[index].factor2),
    y: props.yScale(props.data[index].factor1 - 0.01),
    // key removed from here
    text: props.data[index].num,
    textAnchor: 'middle',
  };

  return (
    <text
      key={props.data[index].num} // key passed directly, not via spread
      onMouseOver={() => showPopUp(props.data[index])}
      onMouseOut={() => closePopUp()}
      {...styles}
      {...circleProps}
    >
      {circleProps.text}
    </text>
  );
};

const CircleTextJudge = (props) => <g>{props.data.map(renderCircleText(props))}</g>;

export default CircleTextJudge;
