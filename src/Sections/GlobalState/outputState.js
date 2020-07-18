import { store } from "react-easy-state";

const outputState = store({
  consensus01Statements: [],
  consensus05Statements: [],

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

  selectAllClicked: false,

  shouldDisplayFactorVizOptions: false,

  showDownloadOutputButtons: false,
  showFactorCharacteristicsTable: false,
  showFactorCorrelationsTable: false,
  showMultipleFactorsFlaggedWarningModal: false,
  showNoLoadingsFlaggedWarningModal: false,
  showTableDataNotSentWarning: true,
  showOutputFactorSelection: false,
  showStandardErrorsDifferences: false,

  sliceValueDistStateSigLevelDrop1: 1.96,

  sortsFlaggedOnTwoFactors: [],

  threshold: 3,
  userSelectedDistStateSigLevel1: 1.96,
  userSelectedDistStateSigLevel2: 2.575,
  userSelectedFactors: [],

  thresholdButtonActive: false,
  qSortValueButtonActive: false,
  statementNumButtonActive: true,
  zScoreButtonActive: false
});

export default outputState;
