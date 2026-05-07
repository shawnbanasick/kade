import rotationState from '../../../GlobalState/rotationState';

// todo - basically, just to trigger component update - see if delete possible
const data = () => {
  // getState
  const newRotationVectors = rotationState.getState().d3RotChartData;
  console.log('data function - newRotationVectors:', JSON.stringify(newRotationVectors));
  rotationState.setState({ newRotationVectors: newRotationVectors });
};

export default data;
