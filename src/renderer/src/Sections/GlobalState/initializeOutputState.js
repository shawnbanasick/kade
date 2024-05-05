import outputState from '../GlobalState/outputState';

const initializeOutputState = () => {
  const updateDisplayFactorVisualizations = outputState(
    (state) => state.updateDisplayFactorVisualizations
  );
  const updateDistStateLowerValueText = outputState((state) => state.updateDistStateLowerValueText);
  const updateDistStateUpperValueText = outputState((state) => state.updateDistStateUpperValueText);
  const updateFactorsWithoutLoading = outputState((state) => state.updateFactorsWithoutLoading);

  const updateNotifyOutputDistStateError = outputState(
    (state) => state.updateNotifyOutputDistStateError
  );

  const updateOutputActiveTabIndex = outputState((state) => state.updateOutputActiveTabIndex);
  const updateOutputButtonsArray = outputState((state) => state.updateOutputButtonsArray);
  const updateOutputFactorSelectButtonsDisabled = outputState(
    (state) => state.updateOutputFactorSelectButtonsDisabled
  );
  const updateOutputForDataViz = outputState((state) => state.updateOutputForDataViz);
  const updateOutputForDataViz2 = outputState((state) => state.updateOutputForDataViz2);

  const updateSelectAllClicked = outputState((state) => state.updateSelectAllClicked);

  const updateShouldDisplayFactorVizOptions = outputState(
    (state) => state.updateShouldDisplayFactorVizOptions
  );

  const updateShowDocxOptions = outputState((state) => state.updateShowDocxOptions);
  const updateDownloadDocxButtonActive = outputState(
    (state) => state.updateDownloadDocxButtonActive
  );
  const updateShowDownloadOutputButtons = outputState(
    (state) => state.updateShowDownloadOutputButtons
  );

  const updateShowFactorCharacteristicsTable = outputState(
    (state) => state.updateShowFactorCharacteristicsTable
  );
  const updateShowFactorCorrelationsTable = outputState(
    (state) => state.updateShowFactorCorrelationsTable
  );
  const updateShowMultipleFactorsFlaggedWarningModal = outputState(
    (state) => state.updateShowMultipleFactorsFlaggedWarningModal
  );
  const updateShowNoLoadingsFlaggedWarningModal = outputState(
    (state) => state.updateShowNoLoadingsFlaggedWarningModal
  );
  const updateShowTableDataNotSentWarning = outputState(
    (state) => state.updateShowTableDataNotSentWarning
  );
  const updateShowOutputFactorSelection = outputState(
    (state) => state.updateShowOutputFactorSelection
  );
  const updateShowStandardErrorsDifferences = outputState(
    (state) => state.updateShowStandardErrorsDifferences
  );

  const updateSliceValueDistStateSigLevelDrop1 = outputState(
    (state) => state.updateSliceValueDistStateSigLevelDrop1
  );
  const updateSortsFlaggedOnTwoFactors = outputState(
    (state) => state.updateSortsFlaggedOnTwoFactors
  );

  const updateThresholdButtonActive = outputState((state) => state.updateThresholdButtonActive);
  const updateQSortValueButtonActive = outputState((state) => state.updateQSortValueButtonActive);
  const updateStatementNumButtonActive = outputState(
    (state) => state.updateStatementNumButtonActive
  );
  const updateZScoreButtonActive = outputState((state) => state.updateZScoreButtonActive);
  const updateDistStateListSortKey = outputState((state) => state.updateDistStateListSortKey);

  const updateThreshold = outputState((state) => state.updateThreshold);
  const updateUserSelectedFactors = outputState((state) => state.updateUserSelectedFactors);

  const updateWillIncludeThreshold = outputState((state) => state.updateWillIncludeThreshold);
  const updateCorrelationThreshold = outputState((state) => state.updateCorrelationThreshold);
  const updateUseClipped = outputState((state) => state.updateUseClipped);
  const updateUseClippedButtonActive = outputState((state) => state.updateUseClippedButtonActive);
  const updateUseTables = outputState((state) => state.updateUseTables);
  const updateUseTablesButtonActive = outputState((state) => state.updateUseTablesButtonActive);
  const updateUseZebra = outputState((state) => state.updateUseZebra);
  const updateWillIncludeToc = outputState((state) => state.updateWillIncludeToc);
  const updateWillUseHyperlinks = outputState((state) => state.updateWillUseHyperlinks);
  const updateWillIncludeDataFiles = outputState((state) => state.updateWillIncludeDataFiles);

  const updateWillIncludeOverview = outputState((state) => state.updateWillIncludeOverview);
  const updateWillIncludeStatements = outputState((state) => state.updateWillIncludeStatements);
  const updateWillIncludeQsorts = outputState((state) => state.updateWillIncludeQsorts);
  const updateWillIncludeCorrMatrix = outputState((state) => state.updateWillIncludeCorrMatrix);
  const updateWillIncludeUnrotFacMatrix = outputState(
    (state) => state.updateWillIncludeUnrotFacMatrix
  );
  const updateWillIncludeCumulComm = outputState((state) => state.updateWillIncludeCumulComm);
  const updateWillIncludeFacLoadings = outputState((state) => state.updateWillIncludeFacLoadings);
  const updateWillIncludeFacLoadingsTable = outputState(
    (state) => state.updateWillIncludeFacLoadingsTable
  );
  const updateWillIncludeFreeDist = outputState((state) => state.updateWillIncludeFreeDist);
  const updateWillIncludeFacScoreRanks = outputState(
    (state) => state.updateWillIncludeFacScoreRanks
  );
  const updateWillIncludeFacScoreCorr = outputState((state) => state.updateWillIncludeFacScoreCorr);
  const updateWillIncludeFactors = outputState((state) => state.updateWillIncludeFactors);
  const updateWillIncludeFacDiffs = outputState((state) => state.updateWillIncludeFacDiffs);
  const updateWillIncludeConDis = outputState((state) => state.updateWillIncludeConDis);
  const updateWillIncludeFacChar = outputState((state) => state.updateWillIncludeFacChar);
  const updateWillIncludeDist = outputState((state) => state.updateWillIncludeDist);
  const updateWillIncludeConsensus = outputState((state) => state.updateWillIncludeConsensus);
  const updateWillIncludeRelRanks = outputState((state) => state.updateWillIncludeRelRanks);

  updateDisplayFactorVisualizations(false);
  updateDistStateListSortKey('');
  updateDistStateLowerValueText(`p<0.05`);
  updateDistStateUpperValueText(`p<0.01`);
  updateFactorsWithoutLoading([]);

  updateNotifyOutputDistStateError(false);

  updateOutputActiveTabIndex(0);
  updateOutputButtonsArray([]);
  updateOutputFactorSelectButtonsDisabled(false);
  updateOutputForDataViz([]);
  updateOutputForDataViz2([]);

  updateQSortValueButtonActive(false);

  updateSelectAllClicked(false);

  updateShouldDisplayFactorVizOptions(false);

  updateShowDocxOptions(false);
  updateDownloadDocxButtonActive(false);
  updateShowDownloadOutputButtons(false);

  updateShowFactorCharacteristicsTable(false);
  updateShowFactorCorrelationsTable(false);
  updateShowMultipleFactorsFlaggedWarningModal(false);
  updateShowNoLoadingsFlaggedWarningModal(false);
  updateShowTableDataNotSentWarning(true);
  updateShowOutputFactorSelection(false);
  updateShowStandardErrorsDifferences(false);

  updateSliceValueDistStateSigLevelDrop1(1.96);
  updateSortsFlaggedOnTwoFactors([]);

  updateThresholdButtonActive(false);
  updateQSortValueButtonActive(false);
  updateStatementNumButtonActive(true);
  updateZScoreButtonActive(false);
  updateDistStateListSortKey('statementNum');

  updateThreshold(3);
  updateUserSelectedFactors([]);

  updateWillIncludeThreshold(false);
  updateCorrelationThreshold(40);
  updateUseClipped(true);
  updateUseClippedButtonActive(true);
  updateUseTables(false);
  updateUseTablesButtonActive(false);
  updateUseZebra(true);
  updateWillIncludeToc(false);
  updateWillUseHyperlinks(false);
  updateWillIncludeDataFiles(false);

  updateWillIncludeOverview(true);
  updateWillIncludeStatements(true);
  updateWillIncludeQsorts(true);
  updateWillIncludeCorrMatrix(true);
  updateWillIncludeUnrotFacMatrix(true);
  updateWillIncludeCumulComm(true);
  updateWillIncludeFacLoadings(true);
  updateWillIncludeFacLoadingsTable(true);
  updateWillIncludeFreeDist(true);
  updateWillIncludeFacScoreRanks(true);
  updateWillIncludeFacScoreCorr(true);
  updateWillIncludeFactors(true);
  updateWillIncludeFacDiffs(true);
  updateWillIncludeConDis(true);
  updateWillIncludeFacChar(true);
  updateWillIncludeDist(true);
  updateWillIncludeConsensus(true);
  updateWillIncludeRelRanks(true);

  return;
};

export default initializeOutputState;
