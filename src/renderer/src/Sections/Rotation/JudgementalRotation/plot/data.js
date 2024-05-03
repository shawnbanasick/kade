import getRotationState from "../../../GlobalState/getRotationState";
import rotationState from "../../../GlobalState/rotationState";

// todo - basically, just to trigger component update - see if delete possible
const data = () => {
  // getState
  const newRotationVectors = getRotationState("d3RotChartData");
  rotationState.newRotationVectors = newRotationVectors;
};

export default data;
