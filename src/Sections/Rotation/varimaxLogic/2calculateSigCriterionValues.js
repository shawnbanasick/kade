import store from "../../store";
import pullAt from 'lodash/pullAt';
import cloneDeep from "lodash/cloneDeep";
import evenRound from "../../Utils/evenRound";
import calculateFactorLoadingSignificanceLevel from "./3_calculateFactorLoadingSignificanceLevel";

const getAutoflagBoolean = (addFlag, sigLevel2, testValue, othersValue) => {
  let requireMajorityCommonVariance = store.getState(
    "requireMajorityCommonVariance"
  );

  if (addFlag === "flag") {
    // if is the common variance only case
    if (isNaN(sigLevel2)) {
      if (testValue > othersValue) {
        return true;
      }
      return false;
    }

    // all other flag cases

    let sigLevel = evenRound(sigLevel2 * sigLevel2, 5);

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

const calculatefSigCriterionValues = function(addFlag) {
  let fSigCriterionArray = store.getState("fSigCriterion");
  let totalStatements = store.getState("numStatements");
  let sigLevel2 = calculateFactorLoadingSignificanceLevel(totalStatements);
  let arrayLength = fSigCriterionArray.length;
  let arrayLength2 = fSigCriterionArray[0].length;
  let temp1,
    testValue,
    others2,
    array;
  let i,
    j,
    tempArray;
  let fSigCriterionResults = [];

  for (i = 0; i < arrayLength; i++) {
    temp1 = fSigCriterionArray[i];
    tempArray = [];
    for (j = 0; j < arrayLength2; j++) {
      array = cloneDeep(temp1);
      testValue = pullAt(array, j);
      others2 = array.reduce(function(a, b) {
        return a + b;
      });
      let othersValue = evenRound(others2, 5);

      let significant = getAutoflagBoolean(
        addFlag,
        sigLevel2,
        testValue[0],
        othersValue
      );

      tempArray.push(significant);
    }
    fSigCriterionResults.push(tempArray);
  }

  // should be display style -  for example - Lipset - 7 cols, 9 rows
  store.setState({
    fSigCriterionResults: fSigCriterionResults
  });
};

export default calculatefSigCriterionValues;
