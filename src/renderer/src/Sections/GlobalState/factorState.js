import { store } from '@risingstack/react-easy-state';

const factorState = store({
  activeCentroidRevealButton: false,
  activeTraditionalCentroidFactorButton: false,
  activeHorst55CentroidButton: false,
  activeTuckerMacCallumCentroidButton: false,
  activePcaButton: false,

  calculatingPca: false,
  isCentroidLoading: false,

  centroid1FactorsActive: false,
  centroid2FactorsActive: false,
  centroid3FactorsActive: false,
  centroid4FactorsActive: false,
  centroid5FactorsActive: false,
  centroid6FactorsActive: false,
  centroid7FactorsActive: true,
  centroid8FactorsActive: false,
  centroidNumFacSubmitButtonColor: '#d6dbe0',
  cumulEigenPerVar: [],

  didNotConverge: false,

  eigenvalues: [],
  eigensPercentExpVar: [],
  explainedVariance: [],
  extractHorstCentroidsButtonActive: false,
  extractHorstCentroidsButtonDisabled: false,

  factorMatrix: [],

  gridColDefsFactorTable: [],
  gridRowDataFactorTable: [],
  gridColDefsFacTableEigen: [],
  gridRowDataFacTableEigen: [],

  heywoodButtonDisabled: false,
  heywoodParticipantsCommunalityArray: [],

  horstExtractActive: false,
  horstExtractDisabled: false,
  horstAutoStopYesActive: false,
  horstAutoStopNoActive: false,
  horstAutoStopNoDisabled: false,
  horstAutoStopYesDisabled: false,
  horstIterations: 30,
  horstThresholdLevel: 0.0001,

  isCentroidRevealButtonDisabled: false,
  isTraditionalCentroidDisabled: false,
  isHorst55Disabled: false,
  isTuckerMacCallumCentroidDisabled: false,
  isPcaButtonDisabled: false,
  isCentroidFacSelectDisabled: false,
  isCentroidExtractButtonDisabled: false,

  numCentroidFactors: 7,
  numFacsForTableWidth: 0,

  pcaButtonText: 'Principal Components',

  screePlotData: [],
  showCentroidError: false,
  showCentroidSelection: false,
  showCentroidSpinner: false,
  showEigenvaluesTable: false,
  showHeywoodCaseNotifications: false,
  showHorstIterationLimit: false,
  showScreePlot: false,
  showUnrotatedFactorTable: false,
  showUseHorstLimit: false,
  showUseHorstIterationSetup: false,
  showNumberOfCentroidFacToExtract: false,

  useHeywoodAdjustment: false,
  unrotatedFactorMatrixOutput: []
});

export default factorState;
