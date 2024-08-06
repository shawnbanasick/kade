import factorState from '../Sections/GlobalState/factorState';

const resetSection3 = () => {
  factorState.setState({
    showUnrotatedFactorTable: false,
    showEigenvaluesTable: false,
    showScreePlot: false,
    didNotConverge: false,
    activePcaButton: false,
    activeCentroidRevealButton: false,
    activeTraditionalCentroiFactorButton: false,
    activeHorst55CentroidButton: false,
    activeTuckerMacCallumCentroidButton: false,
    centroid1FactorsActive: false,
    centroid2FactorsActive: false,
    centroid3FactorsActive: false,
    centroid4FactorsActive: false,
    centroid5FactorsActive: false,
    centroid6FactorsActive: false,
    centroid7FactorsActive: false,
    centroid8FactorsActive: false,
    isPcaButtonDisabled: false,
    isCentroidRevealButtonDisabled: false,
    isTraditionalCentroidDisabled: false,
    isHorst55Disabled: false,
    isTuckerMacCallumCentroidDisabled: false,
    isCentroidFacSelectDisabled: false,
    isCentroidExtractButtonDisabled: false,
    numCentroidFactors: 7,
    showCentroidSelection: false,
    showUseHorstLimit: false,
    showHeywoodCaseNotifications: false,
    heywoodButtonDisabled: false,
    heywoodAdjustButtonActive: false,
    heywoodContinueButtonActive: false,
    horstAutoStopYesActive: false,
    horstAutoStopNoDisabled: false,
    horstAutoStopNoActive: false,
    horstAutoStopYesDisabled: false,
    showUseHorstIterationSetup: false,
    showHorstIterationLimit: false,
    showNumberOfCentroidFacToExtract: false,
    horstExtractActive: false,
    horstExtractDisabled: false,
  });
  return;
};

export default resetSection3;
