import rotationState from '../../../GlobalState/rotationState';
import { getPlotScale } from './plotSizing';

const getFillColor = (data) => {
  if (data.factor1Sig === true) return '#b4dffe';
  if (data.factor2Sig === true) return '#ffe4b2';
  return '#d3d3d3';
};

const showPopUp = (info) => rotationState.setState({ participantDataObject: info });
const closePopUp = () => rotationState.setState({ participantDataObject: false });

const DataCircles = (props) => {
  const { radius, strokeWidth } = getPlotScale(props);

  return (
    <g>
      {props.data.map((d) => (
        <circle
          key={d.num}
          cx={props.xScale(d.factor2)}
          cy={props.yScale(d.factor1)}
          r={radius}
          fill={getFillColor(d)}
          stroke="black"
          strokeWidth={strokeWidth}
          onMouseOver={() => showPopUp(d)}
          onMouseOut={closePopUp}
        />
      ))}
    </g>
  );
};

export default DataCircles;
