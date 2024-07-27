import evenRound from '../../../Utils/evenRound';
import average from '../../../Utils/average';
import standardDeviation from '../../../Utils/standardDeviation';
import calcState from '../../GlobalState/calcState';
import cloneDeep from 'lodash/cloneDeep';

const combineWeightedSorts = function (weightedSorts) {
  // console.log('weightedSorts', JSON.stringify(weightedSorts));
  // returns ["factor 1", "factor 2", etc... ]
  const sigFactorNumbersArray1 = cloneDeep(calcState.getState().sigFactorNumbersArray);
  // console.log('sigfacnumarray', JSON.stringify(sigFactorNumbersArray1));
  const sigFactorNumbersArray = sigFactorNumbersArray1.sort();
  // console.log('sigFactorNumbersArray', JSON.stringify(sigFactorNumbersArray));
  let tempArray2, summedWeightedSorts;

  summedWeightedSorts = [];
  const sigSortsArray = [];

  // looping through all selected factor names in sig factor array
  for (let i = 0, iLen = sigFactorNumbersArray.length; i < iLen; i++) {
    const tempArray4 = [];
    const tempArray1 = [];
    const factor = sigFactorNumbersArray[i];
    tempArray2 = [];
    const tempObj2 = {};

    // console.log('weightedSorts', JSON.stringify(weightedSorts));
    // loop through all data for all factors and pull data for only for selected factors
    for (let j = 0, jLen = weightedSorts.length; j < jLen; j++) {
      const temp2 = weightedSorts[j][0]; // gives number 1 or 2 or 3 etc...
      // console.log('temp2:', temp2);
      // console.log('factor:', factor);
      if (temp2 === factor) {
        tempArray1.push(weightedSorts[j][2]); // pushes weight for each statement
        tempArray2.push(weightedSorts[j][1]); // pushes flagged sort respondent name
      }
    }

    // pushes factor numbers and representative sorts into array
    tempArray4.push(factor); // array of names of user selected factors
    tempArray4.push(tempArray2); // array of flagged respondent names

    // converts array of factor numbers and rep sorts to object
    tempObj2['Factor Number'] = factor;
    tempObj2.SigSorts = tempArray2;
    sigSortsArray.push(tempObj2);

    // summing weights for statements across flagged sorts for each factor
    const tempArray3 = [];
    for (let k = 0, kLen = tempArray1[0].length; k < kLen; k++) {
      let temp3 = 0;
      for (let m = 0, mLen = tempArray1.length; m < mLen; m++) {
        temp3 = evenRound(temp3 + tempArray1[m][k], 3);
      }
      tempArray3.push(temp3);
    }

    // re-normalize factor loadings after summing across statements
    const tempArray3a = [];
    const sortAverage = average(tempArray3);
    const sortStandardDeviation = standardDeviation(tempArray3);
    for (let r = 0, rLen = tempArray3.length; r < rLen; r++) {
      const zScore = evenRound((tempArray3[r] - sortAverage) / sortStandardDeviation, 3);
      tempArray3a.push(zScore);
    }
    tempArray4.push(tempArray3a);
    summedWeightedSorts.push(tempArray4);
  }
  // console.log('sigSortArray', JSON.stringify(sigSortsArray));
  calcState.setState({ sigSortsArray: sigSortsArray });
  return summedWeightedSorts;
};

export default combineWeightedSorts;
