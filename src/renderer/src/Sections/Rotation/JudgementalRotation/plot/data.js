import rotationState from '../../../GlobalState/rotationState';

// todo - basically, just to trigger component update - see if delete possible
const data = () => {
  // getState
  const newRotationVectors = rotationState.getState().d3RotChartData;
  rotationState.setState({ newRotationVectors: newRotationVectors });
};

export default data;
