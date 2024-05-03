import outputState from "../GlobalState/outputState";

const initializeOutputState = () => {
  outputState.displayFactorVisualizations = false;
  outputState.distStateListSortKey = "";
  outputState.distStateLowerValueText = `p<0.05`;
  outputState.distStateUpperValueText = `p<0.01`;
  outputState.factorsWithoutLoading = [];

  outputState.notifyOutputDistStateError = false;

  outputState.outputActiveTabIndex = 0;
  outputState.outputButtonsArray = [];
  outputState.outputFactorSelectButtonsDisabled = false;
  outputState.outputForDataViz = [];
  outputState.outputForDataViz2 = [];

  outputState.qSortValueButtonActive = false;

  outputState.selectAllClicked = false;

  outputState.shouldDisplayFactorVizOptions = false;

  outputState.showDocxOptions = false;
  outputState.downloadDocxButtonActive = false;
  outputState.showDownloadOutputButtons = false;

  outputState.showFactorCharacteristicsTable = false;
  outputState.showFactorCorrelationsTable = false;
  outputState.showMultipleFactorsFlaggedWarningModal = false;
  outputState.showNoLoadingsFlaggedWarningModal = false;
  outputState.showTableDataNotSentWarning = true;
  outputState.showOutputFactorSelection = false;
  outputState.showStandardErrorsDifferences = false;

  outputState.sliceValueDistStateSigLevelDrop1 = 1.96;
  outputState.sortsFlaggedOnTwoFactors = [];

  outputState.thresholdButtonActive = false;
  outputState.qSortValueButtonActive = false;
  outputState.statementNumButtonActive = true;
  outputState.zScoreButtonActive = false;
  outputState.distStateListSortKey = "statementNum";

  outputState.threshold = 3;
  outputState.userSelectedFactors = [];

  // DOCX options
  outputState.willIncludeThreshold = false;
  outputState.correlationThreshold = 40;
  outputState.useClipped = true;
  outputState.useClippedButtonActive = true;
  outputState.useTables = false;
  outputState.useTablesButtonActive = false;
  outputState.useZebra = true;
  outputState.willIncludeToc = false;
  outputState.willUseHyperlinks = false;
  outputState.willIncludeDataFiles = false;

  // DOCX sections
  outputState.willIncludeOverview = true;
  outputState.willIncludeStatements = true;
  outputState.willIncludeQsorts = true;
  outputState.willIncludeCorrMatrix = true;
  outputState.willIncludeUnrotFacMatrix = true;
  outputState.willIncludeCumulComm = true;
  outputState.willIncludeFacLoadings = true;
  outputState.willIncludeFacLoadingsTable = true;
  outputState.willIncludeFreeDist = true;
  outputState.willIncludeFacScoreRanks = true;
  outputState.willIncludeFacScoreCorr = true;
  outputState.willIncludeFactors = true;
  outputState.willIncludeFacDiffs = true;
  outputState.willIncludeConDis = true;
  outputState.willIncludeFacChar = true;
  outputState.willIncludeDist = true;
  outputState.willIncludeConsensus = true;
  outputState.willIncludeRelRanks = true;

  return;
};

export default initializeOutputState;
