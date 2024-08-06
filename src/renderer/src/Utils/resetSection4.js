import rotationState from '../Sections/GlobalState/rotationState';

const resetSection4 = () => {
  // hide section 4
  rotationState.setState({
    shouldDisplayFacKept: false,
    showKeepFacForRotButton: false,
    varimaxButtonDisabled: false,
    varimaxButtonText: 'Varimax Rotation',
    varimaxButtonActive: false,
    rotationTabActiveIndex: 0,
    isFacSelectDisabled: false,
    numFactorsKeptForRot: undefined,
  });

  return;
};

export default resetSection4;
