import rotationState from '../Sections/GlobalState/rotationState';

const resetManualRotation = () => {
  // reset manual rotation
  rotationState.setState({ shouldShowJudgeRotDiv: false });
  rotationState.setState({ judgeButtonActive: false });
  rotationState.setState({ showScatterPlotTableDiv: false });
  rotationState.setState({ abFactors: [] });
  rotationState.setState({ highlightRotfactor1: false });
  rotationState.setState({ highlightRotfactor2: false });
  rotationState.setState({ highlightRotfactor3: false });
  rotationState.setState({ highlightRotfactor4: false });
  rotationState.setState({ highlightRotfactor5: false });
  rotationState.setState({ highlightRotfactor6: false });
  rotationState.setState({ highlightRotfactor7: false });
  rotationState.setState({ highlightRotfactor8: false });
  rotationState.setState({ userSelectedRotFactors: [] });
  return;
};

export default resetManualRotation;
