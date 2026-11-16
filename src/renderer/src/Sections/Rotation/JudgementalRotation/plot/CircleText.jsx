import rotationState from '../../../GlobalState/rotationState';
import { getPlotScale } from './plotSizing';

const showPopUp = (info) => rotationState.setState({ participantDataObject: info });
const closePopUp = () => rotationState.setState({ participantDataObject: false });

const CircleText = (props) => {
  const { fontSize, labelDy } = getPlotScale(props);

  return (
    <g>
      {props.data.map((d) => (
        <text
          key={d.num}
          x={props.xScale(d.factor2)}
          y={props.yScale(d.factor1)}
          dy={labelDy}
          textAnchor="middle"
          fontSize={fontSize}
          fontFamily="Arial, sans-serif"
          cursor="default"
          onMouseOver={() => showPopUp(d)}
          onMouseOut={closePopUp}
        >
          {d.num}
        </text>
      ))}
    </g>
  );
};

export default CircleText;
