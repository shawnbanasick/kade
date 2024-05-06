import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const factorState = create(
  immer((set, get) => ({
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
    unrotatedFactorMatrixOutput: [],

    updateActiveCentroidRevealButton: (inputValue) =>
      set({ activeCentroidRevealButton: inputValue }),
    updateActiveTraditionalCentroidFactorButton: (inputValue) =>
      set({ activeTraditionalCentroidFactorButton: inputValue }),
    updateActiveHorst55CentroidButton: (inputValue) =>
      set({ activeHorst55CentroidButton: inputValue }),
    updateActiveTuckerMacCallumCentroidButton: (inputValue) =>
      set({ activeTuckerMacCallumCentroidButton: inputValue }),
    updateActivePcaButton: (inputValue) => set({ activePcaButton: inputValue }),
    updateCalculatingPca: (inputValue) => set({ calculatingPca: inputValue }),
    updateIsCentroidLoading: (inputValue) => set({ isCentroidLoading: inputValue }),
    updateCentroid1FactorsActive: (inputValue) => set({ centroid1FactorsActive: inputValue }),
    updateCentroid2FactorsActive: (inputValue) => set({ centroid2FactorsActive: inputValue }),
    updateCentroid3FactorsActive: (inputValue) => set({ centroid3FactorsActive: inputValue }),
    updateCentroid4FactorsActive: (inputValue) => set({ centroid4FactorsActive: inputValue }),
    updateCentroid5FactorsActive: (inputValue) => set({ centroid5FactorsActive: inputValue }),
    updateCentroid6FactorsActive: (inputValue) => set({ centroid6FactorsActive: inputValue }),
    updateCentroid7FactorsActive: (inputValue) => set({ centroid7FactorsActive: inputValue }),
    updateCentroid8FactorsActive: (inputValue) => set({ centroid8FactorsActive: inputValue }),
    updateCentroidNumFacSubmitButtonColor: (inputValue) =>
      set({ centroidNumFacSubmitButtonColor: inputValue }),
    updateCumulEigenPerVar: (inputValue) => set({ cumulEigenPerVar: inputValue }),
    updateDidNotConverge: (inputValue) => set({ didNotConverge: inputValue }),
    updateEigenvalues: (inputValue) => set({ eigenvalues: inputValue }),
    updateEigensPercentExpVar: (inputValue) => set({ eigensPercentExpVar: inputValue }),
    updateExplainedVariance: (inputValue) => set({ explainedVariance: inputValue }),
    updateExtractHorstCentroidsButtonActive: (inputValue) =>
      set({ extractHorstCentroidsButtonActive: inputValue }),
    updateExtractHorstCentroidsButtonDisabled: (inputValue) =>
      set({ extractHorstCentroidsButtonDisabled: inputValue }),
    updateFactorMatrix: (inputValue) => set({ factorMatrix: inputValue }),
    updateGridColDefsFactorTable: (inputValue) => set({ gridColDefsFactorTable: inputValue }),
    updateGridRowDataFactorTable: (inputValue) => set({ gridRowDataFactorTable: inputValue }),
    updateGridColDefsFacTableEigen: (inputValue) => set({ gridColDefsFacTableEigen: inputValue }),
    updateGridRowDataFacTableEigen: (inputValue) => set({ gridRowDataFacTableEigen: inputValue }),
    updateHeywoodButtonDisabled: (inputValue) => set({ heywoodButtonDisabled: inputValue }),
    updateHeywoodParticipantsCommunalityArray: (inputValue) =>
      set({ heywoodParticipantsCommunalityArray: inputValue }),
    updateHorstExtractActive: (inputValue) => set({ horstExtractActive: inputValue }),
    updateHorstExtractDisabled: (inputValue) => set({ horstExtractDisabled: inputValue }),
    updateHorstAutoStopYesActive: (inputValue) => set({ horstAutoStopYesActive: inputValue }),
    updateHorstAutoStopNoActive: (inputValue) => set({ horstAutoStopNoActive: inputValue }),
    updateHorstAutoStopNoDisabled: (inputValue) => set({ horstAutoStopNoDisabled: inputValue }),
    updateHorstAutoStopYesDisabled: (inputValue) => set({ horstAutoStopYesDisabled: inputValue }),
    updateHorstIterations: (inputValue) => set({ horstIterations: inputValue }),
    updateHorstThresholdLevel: (inputValue) => set({ horstThresholdLevel: inputValue }),
    updateIsCentroidRevealButtonDisabled: (inputValue) =>
      set({ isCentroidRevealButtonDisabled: inputValue }),
    updateIsTraditionalCentroidDisabled: (inputValue) =>
      set({ isTraditionalCentroidDisabled: inputValue }),
    updateIsHorst55Disabled: (inputValue) => set({ isHorst55Disabled: inputValue }),
    updateIsTuckerMacCallumCentroidDisabled: (inputValue) =>
      set({ isTuckerMacCallumCentroidDisabled: inputValue }),
    updateIsPcaButtonDisabled: (inputValue) => set({ isPcaButtonDisabled: inputValue }),
    updateIsCentroidFacSelectDisabled: (inputValue) =>
      set({ isCentroidFacSelectDisabled: inputValue }),
    updateIsCentroidExtractButtonDisabled: (inputValue) =>
      set({ isCentroidExtractButtonDisabled: inputValue }),
    updateNumCentroidFactors: (inputValue) => set({ numCentroidFactors: inputValue }),
    updateNumFacsForTableWidth: (inputValue) => set({ numFacsForTableWidth: inputValue }),
    updatePcaButtonText: (inputValue) => set({ pcaButtonText: inputValue }),
    updateScreePlotData: (inputValue) => set({ screePlotData: inputValue }),
    updateShowCentroidError: (inputValue) => set({ showCentroidError: inputValue }),
    updateShowCentroidSelection: (inputValue) => set({ showCentroidSelection: inputValue }),
    updateShowCentroidSpinner: (inputValue) => set({ showCentroidSpinner: inputValue }),
    updateShowEigenvaluesTable: (inputValue) => set({ showEigenvaluesTable: inputValue }),
    updateShowHeywoodCaseNotifications: (inputValue) =>
      set({ showHeywoodCaseNotifications: inputValue }),
    updateShowHorstIterationLimit: (inputValue) => set({ showHorstIterationLimit: inputValue }),
    updateShowScreePlot: (inputValue) => set({ showScreePlot: inputValue }),
    updateShowUnrotatedFactorTable: (inputValue) => set({ showUnrotatedFactorTable: inputValue }),
    updateShowUseHorstLimit: (inputValue) => set({ showUseHorstLimit: inputValue }),
    updateShowUseHorstIterationSetup: (inputValue) =>
      set({ showUseHorstIterationSetup: inputValue }),
    updateShowNumberOfCentroidFacToExtract: (inputValue) =>
      set({ showNumberOfCentroidFacToExtract: inputValue }),
    updateUseHeywoodAdjustment: (inputValue) => set({ useHeywoodAdjustment: inputValue }),
    updateUnrotatedFactorMatrixOutput: (inputValue) =>
      set({ unrotatedFactorMatrixOutput: inputValue }),
  }))
);

export default factorState;
