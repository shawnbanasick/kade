import calcState from "../GlobalState/calcState";

const initializeCalcState = () => {
  calcState.analysisOutput = [];

  calcState.colSizes = [];
  calcState.compositeFactorMasterArray = [];
  calcState.consensus05Statements = [];
  calcState.consensus01Statements = [];
  calcState.correlationTableArrayHolder = [];

  calcState.distStateListData = [];
  calcState.distStatementDataVizArray = [];

  calcState.factorCharacteristicsArray = [];
  calcState.factorCorrelationsTableData = [];
  calcState.factorScoreRanksArray = [];
  calcState.factorWeightFactorArrayHolder = [];

  calcState.freeDistributionArray = [];

  calcState.formattedConsensusStatements = [];

  calcState.masterDistingStatementNumbersArray01 = [];
  calcState.masterDistingStatementNumbersArray05 = [];

  calcState.matchCount = [];
  calcState.maxStatementLength = 0;
  calcState.miniCorrelationArrayHolder = [];

  // calcState.output = [];
  calcState.outputData = [];

  calcState.posShiftSortArray = [];

  calcState.sheetNames = [];
  calcState.sheetNamesHolder1 = [];
  calcState.sheetNamesHolder2 = [];
  calcState.sheetNamesHolder3 = [];
  calcState.sheetNamesXlsx = [];

  calcState.shouldIncludeTimestamp = true;

  calcState.sigFactorNumbersArray = [];
  calcState.sigSortsArray = [];

  calcState.sortsAsNumbers = [];
  calcState.sortWeights = [];

  calcState.standardErrorDiffSheetArray = [];

  calcState.statementRankingArray = [];
  calcState.synFactorArray1Holder = [];

  calcState.userSelectedDistStateSigLevel1 = 2.575;
  calcState.userSelectedDistStateSigLevel2 = 1.96;

  return;
};

export default initializeCalcState;
