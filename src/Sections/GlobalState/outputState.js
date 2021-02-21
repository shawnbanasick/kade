import { store } from "react-easy-state";

const outputState = store({
  displayFactorVisualizations: false,
  distStateListSortKey: "",
  distStateLowerValueText: `p<0.05`,
  distStateUpperValueText: `p<0.01`,

  factorsWithoutLoading: [],

  notifyOutputDistStateError: false,

  outputActiveTabIndex: 0,
  outputButtonsArray: [],
  outputFactorSelectButtonsDisabled: false,
  outputForDataViz: [],
  outputForDataViz2: [],

  qSortValueButtonActive: false,

  selectAllClicked: false,

  shouldDisplayFactorVizOptions: false,

  showDownloadOutputButtons: false,
  showFactorCharacteristicsTable: false,
  showFactorCorrelationsTable: false,
  showMultipleFactorsFlaggedWarningModal: false,
  showNoLoadingsFlaggedWarningModal: false,
  showOutputFactorSelection: false,
  showStandardErrorsDifferences: false,
  showTableDataNotSentWarning: true,

  sliceValueDistStateSigLevelDrop1: 1.96,
  sortsFlaggedOnTwoFactors: [],
  statementNumButtonActive: true,

  threshold: 3,
  thresholdButtonActive: false,

  userSelectedFactors: [],

  zScoreButtonActive: false
});

export default outputState;
