import { store } from "react-easy-state";

const calcState = store({
  analysisOutput: [],
  colSizes: [],
  compositeFactorMasterArray: [],

  correlationTableArrayHolder: [],

  consensus05Statements: [],
  consensus01Statements: [],

  distStatementDataVizArray: [],
  distStateListData: [],

  factorCharacteristicsArray: [],
  factorCorrelationsTableData: [],
  factorScoreRanksArray: [],
  factorWeightFactorArrayHolder: [],

  freeDistributionArray: [],

  formattedConsensusStatements: [],

  masterDistingStatementNumbersArray01: [],
  masterDistingStatementNumbersArray05: [],

  matchCount: [],
  maxStatementLength: 0,
  miniCorrelationArrayHolder: [],

  output: [],
  outputData: [],

  posShiftSortArray: [],

  sheetNames: [],
  sheetNamesHolder1: [],
  sheetNamesHolder2: [],
  sheetNamesHolder3: [],
  sheetNamesXlsx: [],

  shouldIncludeTimestamp: true,

  sigFactorNumbersArray: [],
  sigSortsArray: [],

  sortsAsNumbers: [],
  sortWeights: [],

  standardErrorDiffSheetArray: [],

  statementRankingArray: [],
  synFactorArray1Holder: [],

  userSelectedDistStateSigLevel1: 2.575,
  userSelectedDistStateSigLevel2: 1.96
});

export default calcState;
