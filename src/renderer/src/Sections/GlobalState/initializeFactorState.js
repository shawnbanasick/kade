import factorState from '../GlobalState/factorState';

const initializeFactorState = () => {
  const updateActiveCentroidRevealButton = factorState(
    (state) => state.updateActiveCentroidRevealButton
  );
  const updateActiveTraditionalCentroidFactorButton = factorState(
    (state) => state.updateActiveTraditionalCentroidFactorButton
  );
  const updateActiveHorst55CentroidButton = factorState(
    (state) => state.updateActiveHorst55CentroidButton
  );
  const updateActiveTuckerMacCallumCentroidButton = factorState(
    (state) => state.updateActiveTuckerMacCallumCentroidButton
  );
  const updateActivePcaButton = factorState((state) => state.updateActivePcaButton);

  const updateCalculatingPca = factorState((state) => state.updateCalculatingPca);
  const updateIsCentroidLoading = factorState((state) => state.updateIsCentroidLoading);

  const updateCentroid1FactorsActive = factorState((state) => state.updateCentroid1FactorsActive);
  const updateCentroid2FactorsActive = factorState((state) => state.updateCentroid2FactorsActive);
  const updateCentroid3FactorsActive = factorState((state) => state.updateCentroid3FactorsActive);
  const updateCentroid4FactorsActive = factorState((state) => state.updateCentroid4FactorsActive);
  const updateCentroid5FactorsActive = factorState((state) => state.updateCentroid5FactorsActive);
  const updateCentroid6FactorsActive = factorState((state) => state.updateCentroid6FactorsActive);
  const updateCentroid7FactorsActive = factorState((state) => state.updateCentroid7FactorsActive);
  const updateCentroid8FactorsActive = factorState((state) => state.updateCentroid8FactorsActive);
  const updateCentroidNumFacSubmitButtonColor = factorState(
    (state) => state.updateCentroidNumFacSubmitButtonColor
  );
  const updateCumulEigenPerVar = factorState((state) => state.updateCumulEigenPerVar);

  const updateDidNotConverge = factorState((state) => state.updateDidNotConverge);

  const updateEigenvalues = factorState((state) => state.updateEigenvalues);
  const updateEigensPercentExpVar = factorState((state) => state.updateEigensPercentExpVar);
  const updateExplainedVariance = factorState((state) => state.updateExplainedVariance);
  const updateExtractHorstCentroidsButtonActive = factorState(
    (state) => state.updateExtractHorstCentroidsButtonActive
  );
  const updateExtractHorstCentroidsButtonDisabled = factorState(
    (state) => state.updateExtractHorstCentroidsButtonDisabled
  );

  const updateFactorMatrix = factorState((state) => state.updateFactorMatrix);

  const updateGridColDefsFactorTable = factorState((state) => state.updateGridColDefsFactorTable);
  const updateGridRowDataFactorTable = factorState((state) => state.updateGridRowDataFactorTable);
  const updateGridColDefsFacTableEigen = factorState(
    (state) => state.updateGridColDefsFacTableEigen
  );
  const updateGridRowDataFacTableEigen = factorState(
    (state) => state.updateGridRowDataFacTableEigen
  );

  const updateHeywoodButtonDisabled = factorState((state) => state.updateHeywoodButtonDisabled);
  const updateHeywoodParticipantsCommunalityArray = factorState(
    (state) => state.updateHeywoodParticipantsCommunalityArray
  );

  const updateHorstExtractActive = factorState((state) => state.updateHorstExtractActive);
  const updateHorstExtractDisabled = factorState((state) => state.updateHorstExtractDisabled);
  const updateHorstAutoStopYesActive = factorState((state) => state.updateHorstAutoStopYesActive);
  const updateHorstAutoStopNoActive = factorState((state) => state.updateHorstAutoStopNoActive);
  const updateHorstAutoStopNoDisabled = factorState((state) => state.updateHorstAutoStopNoDisabled);
  const updateHorstAutoStopYesDisabled = factorState(
    (state) => state.updateHorstAutoStopYesDisabled
  );
  const updateHorstIterations = factorState((state) => state.updateHorstIterations);
  const updateHorstThresholdLevel = factorState((state) => state.updateHorstThresholdLevel);

  const updateIsCentroidRevealButtonDisabled = factorState(
    (state) => state.updateIsCentroidRevealButtonDisabled
  );
  const updateIsTraditionalCentroidDisabled = factorState(
    (state) => state.updateIsTraditionalCentroidDisabled
  );
  const updateIsHorst55Disabled = factorState((state) => state.updateIsHorst55Disabled);
  const updateIsTuckerMacCallumCentroidDisabled = factorState(
    (state) => state.updateIsTuckerMacCallumCentroidDisabled
  );
  const updateIsPcaButtonDisabled = factorState((state) => state.updateIsPcaButtonDisabled);
  const updateIsCentroidFacSelectDisabled = factorState(
    (state) => state.updateIsCentroidFacSelectDisabled
  );
  const updateIsCentroidExtractButtonDisabled = factorState(
    (state) => state.updateIsCentroidExtractButtonDisabled
  );

  const updateNumCentroidFactors = factorState((state) => state.updateNumCentroidFactors);
  const updateNumFacsForTableWidth = factorState((state) => state.updateNumFacsForTableWidth);

  const updatePcaButtonText = factorState((state) => state.updatePcaButtonText);

  const updateScreePlotData = factorState((state) => state.updateScreePlotData);
  const updateShowCentroidError = factorState((state) => state.updateShowCentroidError);
  const updateShowCentroidSelection = factorState((state) => state.updateShowCentroidSelection);
  const updateShowCentroidSpinner = factorState((state) => state.updateShowCentroidSpinner);
  const updateShowEigenvaluesTable = factorState((state) => state.updateShowEigenvaluesTable);
  const updateShowHeywoodCaseNotifications = factorState(
    (state) => state.updateShowHeywoodCaseNotifications
  );
  const updateShowHorstIterationLimit = factorState((state) => state.updateHorstIterationLimit);
  const updateShowScreePlot = factorState((state) => state.updateShowScreePlot);
  const updateUnrotatedFactorTable = factorState((state) => state.updateUnrotatedFactorTable);
  const updateShowUseHorstLimit = factorState((state) => state.updateShowUseHorstLimit);
  const updateHorstIterationSetup = factorState((state) => state.updateHorstIterationSetup);
  const updateNumberOfCentroidFacToExtract = factorState(
    (state) => state.updateNumberOfCentroidFacToExtract
  );

  const updateUseHeywoodAdjustment = factorState((state) => state.updateUseHeywoodAdjustment);
  const updateUnrotatedFactorMatrixOutput = factorState(
    (state) => state.updateUnrotatedFactorMatrixOutput
  );

  updateActiveCentroidRevealButton(false);
  updateActiveTraditionalCentroidFactorButton(false);
  updateActiveHorst55CentroidButton(false);
  updateActiveTuckerMacCallumCentroidButton(false);
  updateActivePcaButton(false);

  updateCalculatingPca(false);
  updateIsCentroidLoading(false);

  updateCentroid1FactorsActive(false);
  updateCentroid2FactorsActive(false);
  updateCentroid3FactorsActive(false);
  updateCentroid4FactorsActive(false);
  updateCentroid5FactorsActive(false);
  updateCentroid6FactorsActive(false);
  updateCentroid7FactorsActive(true);
  updateCentroid8FactorsActive(false);
  updateCentroidNumFacSubmitButtonColor('#d6dbe0');
  updateCumulEigenPerVar([]);

  updateDidNotConverge(false);

  updateEigenvalues([]);
  updateEigensPercentExpVar([]);
  updateExplainedVariance([]);
  updateExtractHorstCentroidsButtonActive(false);
  updateExtractHorstCentroidsButtonDisabled(false);

  updateFactorMatrix([]);

  updateGridColDefsFactorTable([]);
  updateGridRowDataFactorTable([]);
  updateGridColDefsFacTableEigen([]);
  updateGridRowDataFacTableEigen([]);

  updateHeywoodButtonDisabled(false);
  updateHeywoodParticipantsCommunalityArray([]);

  updateHorstExtractActive(false);
  updateHorstExtractDisabled(false);
  updateHorstAutoStopYesActive(false);
  updateHorstAutoStopNoActive(false);
  updateHorstAutoStopNoDisabled(false);
  updateHorstAutoStopYesDisabled(false);
  updateHorstIterations(30);
  updateHorstThresholdLevel(0.0001);

  updateIsCentroidRevealButtonDisabled(false);
  updateIsTraditionalCentroidDisabled(false);
  updateIsHorst55Disabled(false);
  updateIsTuckerMacCallumCentroidDisabled(false);
  updateIsPcaButtonDisabled(false);
  updateIsCentroidFacSelectDisabled(false);
  updateIsCentroidExtractButtonDisabled(false);

  updateNumCentroidFactors(7);
  updateNumFacsForTableWidth(0);

  updatePcaButtonText('Principal Components');

  updateScreePlotData([]);
  updateShowCentroidError(false);
  updateShowCentroidSelection(false);
  updateShowCentroidSpinner(false);
  updateShowEigenvaluesTable(false);
  updateShowHeywoodCaseNotifications(false);
  updateShowHorstIterationLimit(false);
  updateShowScreePlot(false);
  updateUnrotatedFactorTable(false);
  updateShowUseHorstLimit(false);
  updateHorstIterationSetup(false);
  updateNumberOfCentroidFacToExtract(false);

  updateUseHeywoodAdjustment(false);
  updateUnrotatedFactorMatrixOutput([]);

  return;
};

export default initializeFactorState;
