import store from "../../store";
import pushProjectOverviewToOutputArray from "./2_pushProjectOverviewToOutputArray";
import pushStatementsToOutputArray from "./2_pushStatementsToOutputArray";
import pushSortsToOutputArray from "./2_pushSortsToOutputArray";
import pushCorrelationsToOutputArray from "./2_pushCorrelationsToOutputArray";
import pushUnrotatedFactorsTableToOutputArray from "./2_pushUnrotatedFactorsTableToOutputArray";
import pushCumComMaxtrixToOutputArray from "./2_pushCumComMatrixToOutputArray";
import pushRotatedFactorsArrayToOutput from "./2_pushRotatedFactorsArrayToOutput";
import pushFreeDistributionDataToOutput from "./2_pushFreeDistributionDataToOutput";
import pushFactorsToOutput from "./2_pushFactorsToOutput";
import pushFactorScoreComparisonRanksTableToOutput from "./2_pushFactorScoreComparisonRanksTableToOutput";
import pushFactorScoreCorrelationsToOutput from "./2_pushFactorScoreCorrelationsToOutput";
import insertFactorsIntoOutput from "./2_insertFactorsIntoOutput";
import pushFactorPowerSetDiffsToOutput from "./2_pushFactorPowerSetDiffsToOutput";
import pushConsensusStatementsToOutput from "./2_pushConsensusStatementsToOutput";
import pushFactorCharacteristicsToOutput from "./2_pushFactorCharacteristicsToOutput";
import pushStandardErrorsDifferencesToOutput from "./2_pushStandardErrorsDifferencesToOutput";
import pushDistinguishingStatementsToOutput from "./2_pushDistinguishingStatementsToOutput";
import pushCribSheetsToOutput from "./2_pushCribSheetsToOutput";

const outputDispatch = function() {
  // begin output cascade
  let step1 = pushProjectOverviewToOutputArray();
  // returns [sheetNames, output, outputData, sheetNamesXlsx, colSizes]

  // expects sheetNames, output, outputData, sheetNamesXlsx, colSizes
  let step2 = pushStatementsToOutputArray(...step1);
  //    pushSortsToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);

  let step3 = pushSortsToOutputArray(...step2);

  // pushCorrelationArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
  let step4 = pushCorrelationsToOutputArray(...step3);

  // pushUnrotatedFactorsTableToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
  let step5 = pushUnrotatedFactorsTableToOutputArray(...step4);

  // pushCumulativeCommunalitiesMaxtrixToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
  let step6 = pushCumComMaxtrixToOutputArray(...step5);

  // pushRotatedFactorsArrayToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
  let step7 = pushRotatedFactorsArrayToOutput(...step6);

  // pushFreeDistributionDataToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
  let step8 = pushFreeDistributionDataToOutput(...step7);

  // pushFactorsToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
  let step9 = pushFactorsToOutput(...step8);

  // halt processing if factors without flag are selected
  if (step9 === "haltOutputProcessing") {
    return null;
  }

  // pushFactorScoreComparisonRanksTableToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
  let step10 = pushFactorScoreComparisonRanksTableToOutput(...step9);

  // pushFactorScoreCorrelationsToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
  let step11 = pushFactorScoreCorrelationsToOutput(...step10);

  // insertFactorsIntoOutputArray(sheetNames, output, analysisOutput, outputData, sheetNamesXlsx, colSizes);
  let step12 = insertFactorsIntoOutput(...step11);

  // pushFactorPowerSetDiffsToOutputArray(sheetNames, output, analysisOutput, outputData, sheetNamesXlsx, colSizes);
  let step13 = pushFactorPowerSetDiffsToOutput(...step12);

  // pushConsensusStatementsToOutput(sheetNames, output, analysisOutput, outputData, sheetNamesXlsx, colSizes);
  let step14 = pushConsensusStatementsToOutput(...step13);

  // pushFactorCharacteristicsToOutput(sheetNames, output, analysisOutput, sigFactorNumbersArray, outputData, sheetNamesXlsx, colSizes);
  let step15 = pushFactorCharacteristicsToOutput(...step14);

  // pushStandardErrorsDifferencesToOutput(sheetNames, output, stndErrorArray, analysisOutput, sigFactorNumbersArray, outputData, sheetNamesXlsx, colSizes);
  let step16 = pushStandardErrorsDifferencesToOutput(...step15);

  // pushDistinguishingStatementsToOutput(sheetNames, output, sigSortsArray, analysisOutput, stndErrorDiffDataArray, stndErrorDiffDataDistingArray, sigFactorNumbersArray, outputData, sheetNamesXlsx, colSizes);
  let step17 = pushDistinguishingStatementsToOutput(...step16);

  // pushCribSheetsToOutput(sheetNames, output, outputData, sheetNamesXlsx, colSizes);

  let step18 = pushCribSheetsToOutput(...step17);

  store.setState({
    sheetNames: step18[0],
    output: step18[1],
    outputData: step18[2],
    sheetNamesXlsx: step18[3],
    colSizes: step18[4],
    showFactorCorrelationsTable: true,
    showFactorCharacteristicsTable: true,
    showStandardErrorsDifferences: true
  });
};

export default outputDispatch;
