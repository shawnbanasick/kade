import evenRound from '../../../Utils/evenRound';
import variance from '../../../Utils/variance';
import i18n from 'i18next';
import outputState from '../../GlobalState/outputState';
import calcState from '../../GlobalState/calcState';

const pushConsensusStatementsToOutput = function (
  analysisOutput,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  // let chartText1 = "Z-Score Variance";
  const chartText2 = i18n.t('Consensus-Disagreement');
  const chartText3 = i18n.t('Nm');
  const chartText4 = i18n.t('Statement');
  const chartText5 = i18n.t('Ranking var.');
  const chartText6 = i18n.t(
    'Factor Qsort Values for Statements sorted by Consensus vs Disagreement'
  );

  const sigFactorNumbersArray = calcState.getState().sigFactorNumbersArray;
  const userSelectedFactors = outputState.getState().userSelectedFactors;
  const maxStatementLength = calcState.getState().maxStatementLength;
  const spacer = ['', ''];

  // add translations to user selected factors
  const translatedFactorNames = [];
  userSelectedFactors.forEach((item) => {
    const number = item.slice(7);
    translatedFactorNames.push(`${i18n.t('Factor')} ${number}`);
  });

  sigFactorNumbersArray.sort();

  const tableHeader = [chartText3, chartText4];
  const tableHeader2 = tableHeader.concat(translatedFactorNames);
  tableHeader2.push(chartText5);

  sheetNamesXlsx.push(chartText2);

  // set factor sheet cols
  const columns = [
    {
      wch: 8,
    },
    {
      wch: maxStatementLength,
    },
  ];
  for (let tt = 0, ttLen = userSelectedFactors.length; tt < ttLen; tt++) {
    columns.push({
      wch: 8,
    });
  }
  columns.push({
    wch: 15,
  });
  colSizes.push(columns);

  const consensusDisagreeArray = [];
  for (let i = 0; i < analysisOutput[0].length; i++) {
    const tempArray1a = [];
    tempArray1a.push(analysisOutput[0][i].statement, analysisOutput[0][i].sortStatement);
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
  consensusDisagreeArray.unshift(['con-dis', ''], spacer, [chartText6], spacer, tableHeader2);
  outputData.push(consensusDisagreeArray);

  console.log('dispatch - 14 - pushConsensusStatements complete');

  return [analysisOutput, sigFactorNumbersArray, outputData, sheetNamesXlsx, colSizes];
};

export default pushConsensusStatementsToOutput;
