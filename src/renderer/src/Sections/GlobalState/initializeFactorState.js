import factorState from "../GlobalState/factorState";

const initializeFactorState = () => {
  factorState.activeCentroidRevealButton = false;
  factorState.activeTraditionalCentroidFactorButton = false;
  factorState.activeHorst55CentroidButton = false;
  factorState.activeTuckerMacCallumCentroidButton = false;
  factorState.activePcaButton = false;

  factorState.calculatingPca = false;
  factorState.isCentroidLoading = false;

  factorState.centroid1FactorsActive = false;
  factorState.centroid2FactorsActive = false;
  factorState.centroid3FactorsActive = false;
  factorState.centroid4FactorsActive = false;
  factorState.centroid5FactorsActive = false;
  factorState.centroid6FactorsActive = false;
  factorState.centroid7FactorsActive = true;
  factorState.centroid8FactorsActive = false;
  factorState.centroidNumFacSubmitButtonColor = "#d6dbe0";
  factorState.cumulEigenPerVar = [];

  factorState.didNotConverge = false;

  factorState.eigenvalues = [];
  factorState.eigensPercentExpVar = [];
  factorState.explainedVariance = [];
  factorState.extractHorstCentroidsButtonActive = false;
  factorState.extractHorstCentroidsButtonDisabled = false;

  factorState.factorMatrix = [];

  factorState.gridColDefsFactorTable = [];
  factorState.gridRowDataFactorTable = [];
  factorState.gridColDefsFacTableEigen = [];
  factorState.gridRowDataFacTableEigen = [];

  factorState.heywoodButtonDisabled = false;
  factorState.heywoodParticipantsCommunalityArray = [];

  factorState.horstExtractActive = false;
  factorState.horstExtractDisabled = false;
  factorState.horstAutoStopYesActive = false;
  factorState.horstAutoStopNoActive = false;
  factorState.horstAutoStopNoDisabled = false;
  factorState.horstAutoStopYesDisabled = false;
  factorState.horstIterations = 30;
  factorState.horstThresholdLevel = 0.0001;

  factorState.isCentroidRevealButtonDisabled = false;
  factorState.isTraditionalCentroidDisabled = false;
  factorState.isHorst55Disabled = false;
  factorState.isTuckerMacCallumCentroidDisabled = false;
  factorState.isPcaButtonDisabled = false;
  factorState.isCentroidFacSelectDisabled = false;
  factorState.isCentroidExtractButtonDisabled = false;

  factorState.numCentroidFactors = 7;
  factorState.numFacsForTableWidth = 0;

  factorState.pcaButtonText = "Principal Components";

  factorState.screePlotData = [];
  factorState.showCentroidError = false;
  factorState.showCentroidSelection = false;
  factorState.showCentroidSpinner = false;
  factorState.showEigenvaluesTable = false;
  factorState.showHeywoodCaseNotifications = false;
  factorState.showScreePlot = false;
  factorState.showUnrotatedFactorTable = false;
  factorState.showUseHorstLimit = false;
  factorState.showHorstIterationLimit = false;
  factorState.showUseHorstIterationSetup = false;
  factorState.showNumberOfCentroidFacToExtract = false;

  factorState.useHeywoodAdjustment = false;
  factorState.unrotatedFactorMatrixOutput = [];

  return;
};

export default initializeFactorState;
