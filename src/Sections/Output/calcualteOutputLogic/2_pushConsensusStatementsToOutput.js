import state from "../../../store";
import evenRound from "../../../Utils/evenRound";
import variance from "../../../Utils/variance";

const pushConsensusStatementsToOutput = function(
  sheetNames,
  output,
  analysisOutput,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  // let chartText1 = "Z-Score Variance";
  const chartText2 = "Consensus-Disagreement";
  const chartText3 = "Statement Number";
  const chartText4 = "Statement";
  const chartText5 = "Z-Score variance";
  const chartText6 = "Factor Q-sort Values for Statements sorted by Consensus vs. Disagreement";

  const sigFactorNumbersArray = state.getState("sigFactorNumbersArray");
  const userSelectedFactors = state.getState("userSelectedFactors");
  const maxStatementLength = state.getState("maxStatementLength");
  const spacer = ["", ""];

  sigFactorNumbersArray.sort();

  const tableHeader = [chartText3, chartText4];
  const tableHeader2 = tableHeader.concat(userSelectedFactors);
  tableHeader2.push(chartText5);

  sheetNamesXlsx.push(chartText2);

  // set factor sheet cols
  const columns = [
    {
      wch: 8
    },
    {
      wch: maxStatementLength
    }
  ];
  for (let tt = 0, ttLen = userSelectedFactors.length; tt < ttLen; tt++) {
    columns.push({
      wch: 8
    });
  }
  columns.push({
    wch: 15
  });
  colSizes.push(columns);

  const consensusDisagreeArray = [];
  // let zScoreArrayForStatements = [];
  for (let i = 0; i < analysisOutput[0].length; i++) {
    const tempArray1a = [];
    tempArray1a.push(
      analysisOutput[0][i].statement,
      analysisOutput[0][i].sortStatement
    );
    const tempArray = [];
    for (let j = 0; j < analysisOutput.length; j++) {
      // let temp1 = sigFactorNumbersArray[j];
      tempArray1a.push(analysisOutput[j][i].sortValue);
      tempArray.push(analysisOutput[j][i].zScore);
    }
    const zScoreVariance = evenRound(variance(tempArray), 3);
    tempArray1a.push(zScoreVariance);
    consensusDisagreeArray.push(tempArray1a);
  }

  const locator = userSelectedFactors.length + 2;
  consensusDisagreeArray.sort((a, b) => {
    if (a[locator] === b[locator]) {
      return 0;
    }
    return a[locator] < b[locator] ? -1 : 1;

  });
  consensusDisagreeArray.unshift(spacer, [chartText6], spacer, tableHeader2);
  outputData.push(consensusDisagreeArray);

  return [
    sheetNames,
    output,
    analysisOutput,
    sigFactorNumbersArray,
    outputData,
    sheetNamesXlsx,
    colSizes
  ];
};

export default pushConsensusStatementsToOutput;
