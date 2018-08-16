import reduce from "lodash/reduce";
import map from "lodash/map";
import max from "lodash/max";

import evenRound from "../../../Utils/evenRound";

const calculateFactor = (reflectedArray, columnTotals) => {
  // console.time("total calculation time ");
  let totalsSums,
    totalsSumsSqrt,
    factorLoad1,
    factorLoad1Sqrd,
    diffDiagonalEstimateandFactorLoad;
  const colTotalsAndMeanSum = [];

  for (let i = 0, iLen = columnTotals.length; i < iLen; i++) {
    colTotalsAndMeanSum.push(evenRound(columnTotals[i] + 0.5, 8)); // 0.5 as used in PQMethod
  }

  totalsSums = reduce(colTotalsAndMeanSum, (sum, num) => sum + num);

  totalsSumsSqrt = evenRound(Math.sqrt(totalsSums), 8);

  factorLoad1 = map(colTotalsAndMeanSum, (num) => evenRound(num / totalsSumsSqrt, 8));

  factorLoad1Sqrd = map(factorLoad1, (num) => evenRound(num * num, 8));

  diffDiagonalEstimateandFactorLoad = [];
  for (let j = 0, jLen = factorLoad1Sqrd.length; j < jLen; j++) {
    diffDiagonalEstimateandFactorLoad.push(
      Math.abs(evenRound(factorLoad1Sqrd[j] - 0.5, 8))
    );
  }

  let maxDiff = max(diffDiagonalEstimateandFactorLoad);

  function totalSumsFunction(newDiagonalEstimate) {
    const totalsSums = reduce(newDiagonalEstimate, (sum, num) => evenRound(sum + num, 8));
    return totalsSums;
  }

  function factorLoad1Function(newDiagonalEstimate) {
    factorLoad1 = map(newDiagonalEstimate, (num) => evenRound(num / totalsSumsSqrt, 8));
    return factorLoad1;
  }

  function factorLoad1SqrdFunction(factorLoad1) {
    factorLoad1Sqrd = map(factorLoad1, (num) => evenRound(num * num, 8));
    return factorLoad1Sqrd;
  }

  if (maxDiff > 0.001) {
    do {
      const previousFactorLoadEstimate = factorLoad1Sqrd;

      const newDiagonalEstimate = [];
      for (let k = 0, kLen = columnTotals.length; k < kLen; k++) {
        newDiagonalEstimate.push(
          evenRound(columnTotals[k] + previousFactorLoadEstimate[k], 8)
        );
      }

      totalsSums = totalSumsFunction(newDiagonalEstimate);

      totalsSumsSqrt = evenRound(Math.sqrt(totalsSums), 8);

      factorLoad1 = factorLoad1Function(newDiagonalEstimate);

      factorLoad1Sqrd = factorLoad1SqrdFunction(factorLoad1);

      diffDiagonalEstimateandFactorLoad = [];
      for (let m = 0, mLen = previousFactorLoadEstimate.length; m < mLen; m++) {
        diffDiagonalEstimateandFactorLoad.push(
          Math.abs(
            evenRound(previousFactorLoadEstimate[m] - factorLoad1Sqrd[m], 8)
          )
        );
      }

      maxDiff = max(diffDiagonalEstimateandFactorLoad);
    } while (maxDiff > 0.001);

    // console.timeEnd("total calculation time ");

    return factorLoad1;
  } 
    return factorLoad1; // todo - straighten out this code
  
};

export default calculateFactor;
