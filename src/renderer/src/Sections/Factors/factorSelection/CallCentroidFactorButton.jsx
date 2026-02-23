import state from '../../../store';
import centroidDispatch from '../centroidLogic/centroidDispatch';
import GeneralButton from '../../../Utils/GeneralButton';

const Spinner = () => (
  <div className="inline-block ml-[57px] w-[25px] h-[25px] border-[6px] border-lightgray rounded-full border-t-[rgba(32,178,170,0.3)] animate-spin" />
);

const CallCentroidFactorButton = () => {
  const showCentroidSpinner = state.getState('showCentroidSpinner');

  const handleClick = () => {
    const numFactors = state.getState('numCentroidFactors');

    if (isNaN(numFactors)) {
      state.setState({
        showCentroidError: true,
        errorMessage: 'Select the number of factors to extract first',
      });
    } else {
      state.setState({ isCentroidLoading: true });
      setTimeout(() => {
        centroidDispatch(numFactors);
        state.setState({
          numFacsForTableWidth: numFactors,
          showUnrotatedFactorTable: true,
          showEigenvaluesTable: true,
          showScreePlot: true,
          activeCentroidRevealButton: true,
          isPcaButtonDisabled: true,
          disabledCentroidFactorButton: true,
          showKeepFacForRotButton: true,
          showCentroidSpinner: true,
          showCentroidError: false,
          isFactorsButtonGreen: true,
        });
      }, 10);
    }
  };

  return (
    <GeneralButton className="bg-primary-button" onClick={() => handleClick()}>
      {showCentroidSpinner ? <Spinner /> : <p>Centroid Factors</p>}
    </GeneralButton>
  );
};

export default CallCentroidFactorButton;
