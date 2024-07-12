const styles = {
  fontSize: 28,
  fill: 'black',
  stroke: 'none',
  // width: 50,
  // strokeWidth: 1,
  zindex: 99,
  fontFamily: 'Verdana, sans-serif',
};

const textProps = {
  x: 0,
  y: 20,
  textAnchor: 'left',
};

const FactorTitleText = (props) => {
  return (
    <g>
      <text {...styles} {...textProps}>
        {props.name}
      </text>
    </g>
  );
};

export default FactorTitleText;
