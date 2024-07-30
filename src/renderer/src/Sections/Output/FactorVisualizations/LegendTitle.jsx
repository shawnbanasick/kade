import i18n from 'i18next';

const styles = {
  fontSize: 22,
  // fill: "white",
  stroke: 'black',
  // width: 50,
  // strokeWidth: 1,
  zindex: 99,
  fontFamily: 'Verdana, sans-serif',
};

const textProps = {
  x: 300,
  y: 20,
  textAnchor: 'left',
};

const legendText = i18n.t('Legend');
// eslint-disable-next-line
export default () => {
  return (
    <g>
      <text {...styles} {...textProps}>
        {legendText}
      </text>
    </g>
  );
};
