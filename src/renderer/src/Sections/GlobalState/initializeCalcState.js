import calcState from '../GlobalState/calcState';

const initializeCalcState = () => {
  const updateAnalysisOutput = calcState((state) => state.updateAnalysisOutput);

  const updateColSizes = calcState((state) => state.updateColSizes);
  const updateCompositeFactorMasterArray = calcState(
    (state) => state.updateCompositeFactorMasterArray
  );
  const updateConsensus05Statements = calcState((state) => state.updateConsensus05Statements);
  const updateConsensus01Statements = calcState((state) => state.updateConsensus01Statements);
  const updateCorrelationTableArrayHolder = calcState(
    (state) => state.updateCorrelationTableArrayHolder
  );

  const updateDistStateListData = calcState((state) => state.updateDistStateListData);
  const updateDistStatementDataVizArray = calcState(
    (state) => state.updateDistStatementDataVizArray
  );

  const updateFactorCharacteristicsArray = calcState(
    (state) => state.updateFactorCharacteristicsArray
  );
  const updateFactorCorrelationsTableData = calcState(
    (state) => state.updateFactorCorrelationsTableData
  );
  const updateFactorScoreRanksArray = calcState((state) => state.updateFactorScoreRanksArray);
  const updateFactorWeightFactorArrayHolder = calcState(
    (state) => state.updateFactorWeightFactorArrayHolder
  );

  const updateFreeDistributionArray = calcState((state) => state.updateFreeDistributionArray);
  const updateFormattedConsensusStatements = calcState(
    (state) => state.updateFormattedConsensusStatements
  );

  const updateMasterDistingStatementNumbersArray01 = calcState(
    (state) => state.updateMasterDistingStatementNumbersArray01
  );
  const updateMasterDistingStatementNumbersArray05 = calcState(
    (state) => state.updateMasterDistingStatementNumbersArray05
  );

  const updateMatchCount = calcState((state) => state.updateMatchCount);
  const updateMaxStatementLength = calcState((state) => state.updateMaxStatementLength);
  const updateMiniCorrelationArrayHolder = calcState(
    (state) => state.updateMiniCorrelationArrayHolder
  );

  const updateOutputData = calcState((state) => state.updateOutputData);

  const updatePosShiftSortArray = calcState((state) => state.updatePosShiftSortArray);

  const updateSheetNames = calcState((state) => state.updateSheetNames);
  const updateSheetNamesHolder1 = calcState((state) => state.updateSheetNamesHolder1);
  const updateSheetNamesHolder2 = calcState((state) => state.updateSheetNamesHolder2);
  const updateSheetNamesHolder3 = calcState((state) => state.updateSheetNamesHolder3);
  const updateSheetNamesXlsx = calcState((state) => state.updateSheetNamesXlsx);

  const updateShouldIncludeTimestamp = calcState((state) => state.updateShouldIncludeTimestamp);

  const updateSigFactorNumbersArray = calcState((state) => state.updateSigFactorNumbersArray);
  const updateSigSortsArray = calcState((state) => state.updateSigSortsArray);

  const updateSortsAsNumbers = calcState((state) => state.updateSortsAsNumbers);
  const updateSortWeights = calcState((state) => state.updateSortWeights);

  const updateStandardErrorDiffSheetArray = calcState(
    (state) => state.updateStandardErrorDiffSheetArray
  );
  const updateStatementRankingArray = calcState((state) => state.updateStatementRankingArray);
  const updateSynFactorArray1Holder = calcState((state) => state.updateSynFactorArray1Holder);
  const updateUserSelectedDistStateSigLevel1 = calcState(
    (state) => state.updateUserSelectedDistStateSigLevel1
  );
  const updateUserSelectedDistStateSigLevel2 = calcState(
    (state) => state.updateUserSelectedDistStateSigLevel2
  );

  updateAnalysisOutput([]);

  updateColSizes([]);
  updateCompositeFactorMasterArray([]);
  updateConsensus05Statements([]);
  updateConsensus01Statements([]);
  updateCorrelationTableArrayHolder([]);

  updateDistStateListData([]);
  updateDistStatementDataVizArray([]);

  updateFactorCharacteristicsArray([]);
  updateFactorCorrelationsTableData([]);
  updateFactorScoreRanksArray([]);
  updateFactorWeightFactorArrayHolder([]);

  updateFreeDistributionArray([]);

  updateFormattedConsensusStatements([]);

  updateMasterDistingStatementNumbersArray01([]);
  updateMasterDistingStatementNumbersArray05([]);

  updateMatchCount([]);
  updateMaxStatementLength(0);
  updateMiniCorrelationArrayHolder([]);

  updateOutputData([]);

  updatePosShiftSortArray([]);

  updateSheetNames([]);
  updateSheetNamesHolder1([]);
  updateSheetNamesHolder2([]);
  updateSheetNamesHolder3([]);
  updateSheetNamesXlsx([]);

  updateShouldIncludeTimestamp(true);

  updateSigFactorNumbersArray([]);
  updateSigSortsArray([]);

  updateSortsAsNumbers([]);
  updateSortWeights([]);

  updateStandardErrorDiffSheetArray([]);

  updateStatementRankingArray([]);
  updateSynFactorArray1Holder([]);

  updateUserSelectedDistStateSigLevel1(2.575);
  updateUserSelectedDistStateSigLevel2(1.96);

  return;
};

export default initializeCalcState;
