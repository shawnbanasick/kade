import evenRound from '../../../Utils/evenRound';
import calcState from '../../GlobalState/calcState';
import outputState from '../../GlobalState/outputState';
import i18n from 'i18next';
import cloneDeep from 'lodash/cloneDeep';

const pushStandardErrorsDifferencesToOutput = function (
  stndErrorArray,
  analysisOutput,
  sigFactorNumbersArray,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  let chartText1 = i18n.t('Standard Errors for Diffs');
  if (chartText1.length > 30) {
    chartText1 = i18n.t('Standard Errors for Diffs short');
  }

  const chartText2 = i18n.t('Standard Errors for Differences in Factor Z scores');

  // State
  const sigSortsArray = cloneDeep(calcState.getState().sigSortsArray);
  const userSelectedFactors = cloneDeep(outputState.getState().userSelectedFactors);
  const spacer = ['', ''];

  // console.log('stndErrorArray', JSON.stringify(stndErrorArray, null, 2));
  // console.log('analysisOutput', JSON.stringify(analysisOutput, null, 2));
  // console.log('sigFactorNumbersArray', JSON.stringify(sigFactorNumbersArray, null, 2));
  // // console.log('outputData', JSON.stringify(outputData, null, 2));
  // console.log('sheetNamesXlsx', JSON.stringify(sheetNamesXlsx, null, 2));
  // console.log('colSizes', JSON.stringify(colSizes, null, 2));

  // console.log('chartText1', JSON.stringify(chartText1, null, 2));
  // console.log('chartText2', JSON.stringify(chartText2, null, 2));

  console.log('sigSortsArray', JSON.stringify(sigSortsArray, null, 2));
  console.log('userSelectedFactors', JSON.stringify(userSelectedFactors, null, 2));
  console.log('spacer', JSON.stringify(spacer, null, 2));

  sheetNamesXlsx.push(chartText1);

  // set factor sheet col widths
  const columns = [
    {
      wch: 8,
    },
  ];
  for (let tt = 0, ttLen = userSelectedFactors.length; tt < ttLen; tt++) {
    columns.push({
      wch: 8,
    });
  }
  colSizes.push(columns);

  const standardErrorDiffSheetArray = [];

  // translate user selected factors
  const translatedFactorNames = [];
  userSelectedFactors.forEach((item) => {
    const number = item.slice(7);
    translatedFactorNames.push(`${i18n.t('Factor')} ${number}`);
  });

  // line 1
  const line1Array = [''];
  const line1Arrayb = line1Array.concat(translatedFactorNames);
  standardErrorDiffSheetArray.push(line1Arrayb);

  // var stndErrorDiffArray = [];
  const stndErrorDiffDataArray = [];
  const stndErrorDiffDataDistingArray = [];

  let stndError1, stndError2, stndError3;

  // lines 2 to end
  for (let j = 0; j < sigSortsArray.length; j++) {
    const tempArray1 = [];

    // tempArray1.push(sigSortsArray[j]["Factor Number"]);
    const factorNum = sigSortsArray[j]['Factor Number'].slice(6);
    tempArray1.push(`${i18n.t('Factor')} ${factorNum}`);

    for (let k = 0; k < sigSortsArray.length; k++) {
      const stndErrorDiffDataArrayTemp1 = [];
      const tempArray2 = [];
      stndErrorDiffDataArrayTemp1.push(`${i18n.t('Factor')} ${sigSortsArray[j]['Factor Number']}`);
      tempArray2.push(sigSortsArray[j]['Factor Number']);
      stndErrorDiffDataArrayTemp1.push(`${i18n.t('Factor')} ${sigSortsArray[k]['Factor Number']}`);
      tempArray2.push(sigSortsArray[k]['Factor Number']);
      stndError1 = stndErrorArray[j];
      stndError2 = stndErrorArray[k];
      stndError3 = evenRound(Math.sqrt(stndError1 * stndError1 + stndError2 * stndError2), 3);
      stndErrorDiffDataArrayTemp1.push(stndError3);
      tempArray2.push(stndError3);
      tempArray1.push(stndError3);
      stndErrorDiffDataArray.push(stndErrorDiffDataArrayTemp1);
      stndErrorDiffDataDistingArray.push(tempArray2);
    }
    standardErrorDiffSheetArray.push(tempArray1);
  }
  standardErrorDiffSheetArray.unshift(['stndErr', ''], spacer, [chartText2], spacer);
  outputData.push(standardErrorDiffSheetArray);

  calcState.setState({ standardErrorDiffSheetArray: standardErrorDiffSheetArray });

  console.log('dispatch - 16 - pushStandardErrorsDifferences complete');

  return [
    sigSortsArray,
    analysisOutput,
    stndErrorDiffDataArray,
    stndErrorDiffDataDistingArray,
    sigFactorNumbersArray,
    outputData,
    sheetNamesXlsx,
    colSizes,
  ];
};

export default pushStandardErrorsDifferencesToOutput;
