import { create } from 'zustand';

const calcState = create((set) => ({
  analysisOutput: [],

  colSizes: [],
  compositeFactorMasterArray: [],
  consensus05Statements: [],
  consensus01Statements: [],
  correlationTableArrayHolder: [],

  distStateListData: [],
  distStatementDataVizArray: [],

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

  // output: [],
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
  userSelectedDistStateSigLevel2: 1.96,

  updateAnalysisOutput: (inputValue) => set({ analysisOutput: inputValue }),
  updateColSizes: (inputValue) => set({ colSizes: inputValue }),
  updateCompositeFactorMasterArray: (inputValue) => set({ compositeFactorMasterArray: inputValue }),
  updateConsensus05Statements: (inputValue) => set({ consensus05Statements: inputValue }),
  updateConsensus01Statements: (inputValue) => set({ consensus01Statements: inputValue }),
  updateCorrelationTableArrayHolder: (inputValue) =>
    set({ correlationTableArrayHolder: inputValue }),
  updateDistStateListData: (inputValue) => set({ distStateListData: inputValue }),
  updateDistStatementDataVizArray: (inputValue) => set({ distStatementDataVizArray: inputValue }),
  updateFactorCharacteristicsArray: (inputValue) => set({ factorCharacteristicsArray: inputValue }),
  updateFactorCorrelationsTableData: (inputValue) =>
    set({ factorCorrelationsTableData: inputValue }),
  updateFactorScoreRanksArray: (inputValue) => set({ factorScoreRanksArray: inputValue }),
  updateFactorWeightFactorArrayHolder: (inputValue) =>
    set({ factorWeightFactorArrayHolder: inputValue }),
  updateFreeDistributionArray: (inputValue) => set({ freeDistributionArray: inputValue }),
  updateFormattedConsensusStatements: (inputValue) =>
    set({ formattedConsensusStatements: inputValue }),
  updateMasterDistingStatementNumbersArray01: (inputValue) =>
    set({ masterDistingStatementNumbersArray01: inputValue }),
  updateMasterDistingStatementNumbersArray05: (inputValue) =>
    set({ masterDistingStatementNumbersArray05: inputValue }),
  updateMatchCount: (inputValue) => set({ matchCount: inputValue }),
  updateMaxStatementLength: (inputValue) => set({ maxStatementLength: inputValue }),
  updateMiniCorrelationArrayHolder: (inputValue) => set({ miniCorrelationArrayHolder: inputValue }),
  updateOutputData: (inputValue) => set({ outputData: inputValue }),
  updatePosShiftSortArray: (inputValue) => set({ posShiftSortArray: inputValue }),
  updateSheetNames: (inputValue) => set({ sheetNames: inputValue }),
  updateSheetNamesHolder1: (inputValue) => set({ sheetNamesHolder1: inputValue }),
  updateSheetNamesHolder2: (inputValue) => set({ sheetNamesHolder2: inputValue }),
  updateSheetNamesHolder3: (inputValue) => set({ sheetNamesHolder3: inputValue }),
  updateSheetNamesXlsx: (inputValue) => set({ sheetNamesXlsx: inputValue }),
  updateShouldIncludeTimestamp: (inputValue) => set({ shouldIncludeTimestamp: inputValue }),
  updateSigFactorNumbersArray: (inputValue) => set({ sigFactorNumbersArray: inputValue }),
  updateSigSortsArray: (inputValue) => set({ sigSortsArray: inputValue }),
  updateSortsAsNumbers: (inputValue) => set({ sortsAsNumbers: inputValue }),
  updateSortWeights: (inputValue) => set({ sortWeights: inputValue }),
  updateStandardErrorDiffSheetArray: (inputValue) =>
    set({ standardErrorDiffSheetArray: inputValue }),
  updateStatementRankingArray: (inputValue) => set({ statementRankingArray: inputValue }),
  updateSynFactorArray1Holder: (inputValue) => set({ synFactorArray1Holder: inputValue }),
  updateUserSelectedDistStateSigLevel1: (inputValue) =>
    set({ userSelectedDistStateSigLevel1: inputValue }),
  updateUserSelectedDistStateSigLevel2: (inputValue) =>
    set({ userSelectedDistStateSigLevel2: inputValue }),
}));

export default calcState;
