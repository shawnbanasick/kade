import { Component } from 'react';
import rotationState from '../../../GlobalState/rotationState';
import i18n from 'i18next';

const textStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: 14,
};

class AxisTextLables extends Component {
  render() {
    const { width, height, padding } = this.props;
    const abFactors = rotationState.getState().abFactors;

    const factorA = `${i18n.t('Factor')} ${abFactors[0]}`;
    const factorB = `${i18n.t('Factor')} ${abFactors[1]}`;

    // centre of the plot area (the area between the padding on each side)
    const cx = width / 2;
    const cy = height / 2;

    return (
      <g>
        {/* y title: rotated about its own centre point */}
        <text
          x={0}
          y={0}
          textAnchor="middle"
          transform={`translate(${padding - 20}, ${cy}) rotate(-90)`}
          {...textStyle}
        >
          {factorA}
        </text>
        {/* x title */}
        <text x={cx} y={height - padding + 45} textAnchor="middle" {...textStyle}>
          {factorB}
        </text>
      </g>
    );
  }
}

export default AxisTextLables;
