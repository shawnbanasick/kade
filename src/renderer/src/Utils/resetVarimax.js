import rotationState from '../Sections/GlobalState/rotationState';

const resetVarimax = () => {
  // reset varimax
  rotationState.setState({ varimaxButtonDisabled: false });
  rotationState.setState({ varimaxButtonText: 'Varimax Rotation' });
  rotationState.setState({ varimaxButtonActive: false });
  return;
};

export default resetVarimax;
