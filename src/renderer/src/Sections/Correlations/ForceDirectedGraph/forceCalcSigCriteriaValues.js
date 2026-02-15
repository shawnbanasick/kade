import pullAt from 'lodash/pullAt';
import evenRound from '../../../Utils/evenRound';
import cloneDeep from 'lodash/cloneDeep';

const getAutoflagBoolean = (
  addFlag,
  sigLevel2,
  testValue,
  othersValue,
  requireMajorityCommonVariance = true
) => {
  // getState

  if (addFlag === 'flag') {
    // if is the common variance only case
    if (isNaN(sigLevel2)) {
      if (testValue > othersValue) {
        return true;
      }
      return false;
    }

    // all other flag cases

    const sigLevel = evenRound(sigLevel2 * sigLevel2, 5);

    // requireMajorityCommonVariance = true
    if (requireMajorityCommonVariance) {
      if (testValue > othersValue && testValue > sigLevel) {
        return true;
      }
      return false;
    }

    // requireMajorityCommonVariance = false
    if (testValue > sigLevel) {
      return true;
    }
    return false;
  } // end the add flags case

  // default return - the no autoflag case => all false
  return false;
};

const calculatefSigCriterionValues = function (addFlag, fSigCriterionArray, significanceLevel) {
  // getState
  const sigLevel2 = significanceLevel;
  const arrayLength = fSigCriterionArray.length;
  const arrayLength2 = fSigCriterionArray[0].length;
  let temp1, testValue, others2, array;
  let i, j, tempArray, othersValue;
  const fSigCriterionResults = [];

  for (i = 0; i < arrayLength; i++) {
    temp1 = fSigCriterionArray[i];
    tempArray = [];
    for (j = 0; j < arrayLength2; j++) {
      array = cloneDeep(temp1);
      // adjust for single factor extraction case
      if (arrayLength2 > 1) {
        testValue = pullAt(array, j);
        others2 = array.reduce((a, b) => a + b);
        othersValue = evenRound(others2, 5);
      } else {
        testValue = array;
        othersValue = 0;
      }

      const significant = getAutoflagBoolean(addFlag, sigLevel2, testValue[0], othersValue);

      tempArray.push(significant);
    }
    fSigCriterionResults.push(tempArray);
  }

  // should be display style -  for example - Lipset - 7 cols, 9 rows
  //   rotationState.setState({ fSigCriterionResults: fSigCriterionResults });
  return fSigCriterionResults;
};

export default calculatefSigCriterionValues;
