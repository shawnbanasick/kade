import { store } from '@risingstack/react-easy-state';

//   distStateListSortKey: "",

const outputState = store({
  displayFactorVisualizations: false,
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

  showDocxOptions: false,
  downloadDocxButtonActive: false,
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

  thresholdButtonActive: false,
  qSortValueButtonActive: false,
  statementNumButtonActive: true,
  zScoreButtonActive: false,
  distStateListSortKey: 'statementNum',

  threshold: 3,
  userSelectedFactors: [],

  // DOCX options
  willIncludeThreshold: false,
  correlationThreshold: 40,
  useClipped: true,
  useClippedButtonActive: true,
  useTables: false,
  useTablesButtonActive: false,
  useZebra: true,
  willIncludeToc: false,
  willUseHyperlinks: false,
  willIncludeDataFiles: false,

  // DOCX sections
  willIncludeOverview: true,
  willIncludeStatements: true,
  willIncludeQsorts: true,
  willIncludeCorrMatrix: true,
  willIncludeUnrotFacMatrix: true,
  willIncludeCumulComm: true,
  willIncludeFacLoadings: true,
  willIncludeFacLoadingsTable: true,
  willIncludeFreeDist: true,
  willIncludeFacScoreRanks: true,
  willIncludeFacScoreCorr: true,
  willIncludeFactors: true,
  willIncludeFacDiffs: true,
  willIncludeConDis: true,
  willIncludeFacChar: true,
  willIncludeDist: true,
  willIncludeConsensus: true,
  willIncludeRelRanks: true,

  partNumArray: [
    '1 - 15',
    '16 - 30',
    '31 - 45',
    '46 - 60',
    '61 - 75',
    '76 - 90',
    '91 - 105',
    '106 - 120',
    '121 - 135',
    '136 - 150',
    '151 - 165',
    '166 - 180',
    '181 - 195',
    '196 - 210',
    '211 - 225',
    '226 - 240',
    '241 - 255',
    '256 - 270',
    '271 - 285',
    '286 - 300',
    '301 - 315',
    '316 - 330',
    '331 - 345',
    '346 - 360',
    '361 - 375',
    '376 - 390',
    '391 - 405',
    '406 - 420',
    '421 - 435',
    '436 - 450',
    '451 - 465',
    '466 - 480',
    '481 - 495',
    '496 - 510'
  ]
});

export default outputState;
