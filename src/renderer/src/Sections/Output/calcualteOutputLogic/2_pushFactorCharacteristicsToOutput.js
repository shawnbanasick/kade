import evenRound from '../../../Utils/evenRound';
import calcState from '../../GlobalState/calcState';
import outputState from '../../GlobalState/outputState';
import i18n from 'i18next';

const pushFactorCharacteristicsToOutput = function (
  analysisOutput,
  sigFactorNumbersArray,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  // MS Excel has max char. length of 30, so shorten if necessary
  let chartText1 = i18n.t('Factor Characteristics');
  if (chartText1.length > 30) {
    chartText1 = i18n.t('Factor Characteristics short');
  }

  const chartText3 = i18n.t('No of Defining Variables');
  const chartText4 = i18n.t('Avg Rel Coef');
  const chartText5 = i18n.t('Composite Reliability');
  const chartText6 = i18n.t('S E of Factor Zscores');

  const userSelectedFactors = outputState.getState().userSelectedFactors;
  const sigSortsArray = calcState.getState().sigSortsArray;

  const spacer = ['', ''];

  sheetNamesXlsx.push(chartText1);

  // set factor sheet col widths
  const columns = [
    {
      wch: 20,
    },
  ];
  for (let tt = 0, ttLen = userSelectedFactors.length; tt < ttLen; tt++) {
    columns.push({
      wch: 8,
    });
  }
  colSizes.push(columns);

  // translate user selected factors
  const translatedFactorNames = [];
  userSelectedFactors.forEach((item) => {
    const number = item.slice(7);
    translatedFactorNames.push(`${i18n.t('Factor')} ${number}`);
  });

  const factorCharacteristicsSheetArray = [];

  // line 1 - factor labels
  const line1Array = [''];
  const line1Arrayb = line1Array.concat(translatedFactorNames);
  factorCharacteristicsSheetArray.push(line1Arrayb);

  // line 2 - No. of Defining Variables
  const line2Array = [chartText3];
  for (let j = 0; j < sigSortsArray.length; j++) {
    line2Array.push(sigSortsArray[j].SigSorts.length);
  }
  factorCharacteristicsSheetArray.push(line2Array);

  // line 3 - Avg. Rel. Coef.
  // todo - !important - change this for unrestrained unforced sort patterns?
  const line3Array = [chartText4];
  for (let k = 0; k < sigSortsArray.length; k++) {
    line3Array.push(0.8);
  }
  factorCharacteristicsSheetArray.push(line3Array);

  // line 4 - Composite Reliability
  const line4Array = [chartText5];
  let nSorts, compositeRel;
  const composRelArray = [];
  for (let m = 0; m < sigSortsArray.length; m++) {
    nSorts = sigSortsArray[m].SigSorts.length;
    compositeRel = evenRound((nSorts * 0.8) / (1 + (nSorts - 1) * 0.8), 3);
    composRelArray.push(compositeRel);
    line4Array.push(compositeRel);
  }
  factorCharacteristicsSheetArray.push(line4Array);

  // line 5 - S.E. of Factor Z-scores
  const line5Array = [chartText6];
  const stndErrorArray = [];
  for (let p = 0; p < sigSortsArray.length; p++) {
    const stndError = evenRound(Math.sqrt(Math.abs(1.0 - composRelArray[p])), 3);
    stndErrorArray.push(stndError);
    line5Array.push(stndError);
  }
  factorCharacteristicsSheetArray.push(line5Array);
  factorCharacteristicsSheetArray.unshift(['facChar', ''], spacer, [chartText1], spacer);

  outputData.push(factorCharacteristicsSheetArray);

  calcState.setState({ factorCharacteristicsArray: factorCharacteristicsSheetArray });

  console.log('dispatch - 15 - pushFactorCharacteristics complete');

  return [
    stndErrorArray,
    analysisOutput,
    sigFactorNumbersArray,
    outputData,
    sheetNamesXlsx,
    colSizes,
  ];
};

export default pushFactorCharacteristicsToOutput;
