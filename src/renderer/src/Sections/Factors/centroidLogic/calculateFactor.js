import map from 'lodash/map';
import max from 'lodash/max';
import reduce from 'lodash/reduce';
import evenRound from '../../../Utils/evenRound';

// removing reflectedArray allows re-format on save and causes bug- why?
const calculateFactor = (reflectedArray, columnTotals) => {
  let totalsSums;
  let totalsSumsSqrt;
  let factorLoad1;
  let factorLoad1Sqrd;
  let diffDiagonalEstimateandFactorLoad;
  const colTotalsAndMeanSum = [];

  for (let i = 0, iLen = columnTotals.length; i < iLen; i += 1) {
    // 0.5 as used in PQMethod
    colTotalsAndMeanSum.push(evenRound(columnTotals[i] + 0.5, 8));
  }

  totalsSums = reduce(colTotalsAndMeanSum, (sum, num) => sum + num);
  totalsSumsSqrt = evenRound(Math.sqrt(totalsSums), 8);

  factorLoad1 = map(colTotalsAndMeanSum, (num) => evenRound(num / totalsSumsSqrt, 8));

  factorLoad1Sqrd = map(factorLoad1, (num) => evenRound(num * num, 8));

  diffDiagonalEstimateandFactorLoad = [];
  for (let j = 0, jLen = factorLoad1Sqrd.length; j < jLen; j += 1) {
    diffDiagonalEstimateandFactorLoad.push(Math.abs(evenRound(factorLoad1Sqrd[j] - 0.5, 8)));
  }

  let maxDiff = max(diffDiagonalEstimateandFactorLoad);

  function totalSumsFunction(newDiagonalEstimate) {
    totalsSums = reduce(newDiagonalEstimate, (sum, num) => evenRound(sum + num, 8));
    return totalsSums;
  }

  function factorLoad1Function(newDiagonalEstimate) {
    factorLoad1 = map(newDiagonalEstimate, (num) => evenRound(num / totalsSumsSqrt, 8));
    return factorLoad1;
  }

  function factorLoad1SqrdFunction() {
    factorLoad1Sqrd = map(factorLoad1, (num) => evenRound(num * num, 8));
    return factorLoad1Sqrd;
  }

  if (maxDiff > 0.001) {
    do {
      const previousFactorLoadEstimate = factorLoad1Sqrd;

      const newDiagonalEstimate = [];
      for (let k = 0, kLen = columnTotals.length; k < kLen; k += 1) {
        newDiagonalEstimate.push(evenRound(columnTotals[k] + previousFactorLoadEstimate[k], 8));
      }

      totalsSums = totalSumsFunction(newDiagonalEstimate);
      totalsSumsSqrt = evenRound(Math.sqrt(totalsSums), 8);
      factorLoad1 = factorLoad1Function(newDiagonalEstimate);
      factorLoad1Sqrd = factorLoad1SqrdFunction(factorLoad1);

      diffDiagonalEstimateandFactorLoad = [];
      for (let m = 0, mLen = previousFactorLoadEstimate.length; m < mLen; m += 1) {
        diffDiagonalEstimateandFactorLoad.push(
          Math.abs(evenRound(previousFactorLoadEstimate[m] - factorLoad1Sqrd[m], 8))
        );
      }

      maxDiff = max(diffDiagonalEstimateandFactorLoad);
    } while (maxDiff > 0.001);

    return factorLoad1;
  }
  // todo - straighten out this code
  return factorLoad1;
};

export default calculateFactor;
