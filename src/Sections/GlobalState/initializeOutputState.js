import outputState from "../GlobalState/outputState";

const initializeOutputState = () => {
  outputState.displayFactorVisualizations = false;
  outputState.distStateListSortKey = "";
  outputState.distStateLowerValueText = "";
  outputState.distStateUpperValueText = "";
  outputState.factorsWithoutLoading = [];

  outputState.notifyOutputDistStateError = false;

  outputState.outputActiveTabIndex = 0;
  outputState.outputButtonsArray = [];
  outputState.outputFactorSelectButtonsDisabled = false;
  outputState.outputForDataViz = [];
  outputState.outputForDataViz2 = [];

  outputState.selectAllClicked = false;

  outputState.shouldDisplayFactorVizOptions = false;

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

  return;
};

export default initializeOutputState;
