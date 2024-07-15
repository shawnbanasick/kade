import rotationState from '../Sections/GlobalState/rotationState';

const resetVarimax = () => {
  // reset varimax
  rotationState.setState({ varimaxButtonDisabled: false });
  rotationState.setState({ varimaxButtonText: 'Varimax Rotation' });
  rotationState.setState({ varimaxButtonActive: false });
  rotationState.setState({ showVarimaxHeywoodWarning: false });
  rotationState.setState({ variContinueButtonActive: false });
  rotationState.setState({ variContinueButtonDisabled: false });
  rotationState.setState({ variAdjustButtonActive: false });
  rotationState.setState({ variAdjustButtonDisabled: false });
  rotationState.setState({ variPqmAdjustButtonActive: false });
  rotationState.setState({ variPqmAdjustButtonDisabled: false });
  return;
};

export default resetVarimax;
