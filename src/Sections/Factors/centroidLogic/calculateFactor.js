import reduce from 'lodash/reduce';
import map from 'lodash/map';
import max from 'lodash/max';

import evenRound from "../../Utils/evenRound";

const calculateFactor = (reflectedArray, columnTotals) => {
    // console.time("total calculation time ");
    var totalsSums,
        totalsSumsSqrt,
        factorLoad1,
        factorLoad1Sqrd,
        diffDiagonalEstimateandFactorLoad;
    var colTotalsAndMeanSum = [];

    for (var i = 0, iLen = columnTotals.length; i < iLen; i++) {
        colTotalsAndMeanSum.push(evenRound(columnTotals[i] + 0.5, 8)); // 0.5 as used in PQMethod
    }

    totalsSums = reduce(colTotalsAndMeanSum, function(sum, num) {
        return sum + num;
    });

    totalsSumsSqrt = evenRound(Math.sqrt(totalsSums), 8);

    factorLoad1 = map(colTotalsAndMeanSum, function(num) {
        return evenRound(num / totalsSumsSqrt, 8);
    });

    factorLoad1Sqrd = map(factorLoad1, function(num) {
        return evenRound(num * num, 8);
    });

    diffDiagonalEstimateandFactorLoad = [];
    for (var j = 0, jLen = factorLoad1Sqrd.length; j < jLen; j++) {
        diffDiagonalEstimateandFactorLoad.push(
            Math.abs(evenRound(factorLoad1Sqrd[j] - 0.5, 8))
        );
    }

    var maxDiff = max(diffDiagonalEstimateandFactorLoad);

    function totalSumsFunction(newDiagonalEstimate) {
        var totalsSums = reduce(newDiagonalEstimate, function(sum, num) {
            return evenRound(sum + num, 8);
        });
        return totalsSums;
    }

    function factorLoad1Function(newDiagonalEstimate) {
        factorLoad1 = map(newDiagonalEstimate, function(num) {
            return evenRound(num / totalsSumsSqrt, 8);
        });
        return factorLoad1;
    }

    function factorLoad1SqrdFunction(factorLoad1) {
        factorLoad1Sqrd = map(factorLoad1, function(num) {
            return evenRound(num * num, 8);
        });
        return factorLoad1Sqrd;
    }

    if (maxDiff > 0.001) {
        do {
            var previousFactorLoadEstimate = factorLoad1Sqrd;

            var newDiagonalEstimate = [];
            for (var k = 0, kLen = columnTotals.length; k < kLen; k++) {
                newDiagonalEstimate.push(
                    evenRound(columnTotals[k] + previousFactorLoadEstimate[k], 8)
                );
            }

            totalsSums = totalSumsFunction(newDiagonalEstimate);

            totalsSumsSqrt = evenRound(Math.sqrt(totalsSums), 8);

            factorLoad1 = factorLoad1Function(newDiagonalEstimate);

            factorLoad1Sqrd = factorLoad1SqrdFunction(factorLoad1);

            diffDiagonalEstimateandFactorLoad = [];
            for (var m = 0, mLen = previousFactorLoadEstimate.length; m < mLen; m++) {
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
    } else {
        return factorLoad1; // todo - straighten out this code
    }
};

export default calculateFactor;
