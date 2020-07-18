import rotationState from "../../../GlobalState/rotationState";
const clone = require("rfdc")();

// todo - basically, just to trigger component update - see if delete possible
const data = () => {
  // getState
  const newRotationVectors = clone(rotationState.d3RotChartData);
  rotationState.newRotationVectors = newRotationVectors;
};

export default data;
