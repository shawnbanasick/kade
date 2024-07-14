import loadingState from '../Sections/GlobalState/loadingState';

const resetBipolarFactors = () => {
  // reset bipolar
  loadingState.setState({ bipolarDisabled: false });
  loadingState.setState({ bipolarSplitCount: 0 });
  return;
};

export default resetBipolarFactors;
