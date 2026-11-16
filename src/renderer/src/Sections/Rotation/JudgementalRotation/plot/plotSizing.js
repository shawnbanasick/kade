// plotSizing.js
const BASE_SIZE = 600; // plot size at which r = 9 and fontSize = 10 look right

export const getPlotScale = (props) => {
  const plotSize = Math.min(props.width, props.height) - props.padding * 2;
  const k = Math.max(0.6, Math.min(1.6, plotSize / (BASE_SIZE - 60))); // clamp to avoid extremes
  return {
    radius: Math.round(9 * k * 10) / 10,
    fontSize: Math.round(10 * k * 10) / 10,
    strokeWidth: Math.round(0.5 * k * 100) / 100,
    labelDy: Math.round(3 * k * 10) / 10,
  };
};
