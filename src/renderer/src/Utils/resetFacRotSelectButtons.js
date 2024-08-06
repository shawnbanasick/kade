import rotationState from '../Sections/GlobalState/rotationState';

const resetFacRotSelectButtons = () => {
  // reset factor rotation select buttons
  rotationState.setState({
    factor1Active: false,
    factor2Active: false,
    factor3Active: false,
    factor4Active: false,
    factor5Active: false,
    factor6Active: false,
    factor7Active: false,
    factor8Active: false,
  });
  return;
};

export default resetFacRotSelectButtons;
