import getColumnSumsFromMatrix from "./getColumnSumsFromMatrix";
import calculateDR from "./calculateDR";
import checkForNegativeColSums from "./checkForNegativeColSums";
import calculateQPrimeArray from "./calculateQPrimeArray";
import calculateCoeffPValue from "./calculateCoeffPValue";
import calcFactorArray from "./calcFactorArray";
import calcCoeffLValue from "./calcCoeffLValue";
import calcResidualMatrix from "./calcResidualMatrix";
import convertMatrixDiags from "./convertMatrixDiags";
import reflectMatrix from "./reflectMatrix";
import calcEigenValues from "./calcEigenValues";
import evenRound from "../../../../Utils/evenRound";

const clone = require("rfdc")();

const tuckerMain = (NFAX, HOLDR, numQsorts) => {
  // todo - set to user input

  const allFactorsArray = [];
  const coeffLValueArray = [];
  const largestCorrelationArray = [];
  const largestFactorLoadingArray = [];

  // loop through factor extractions
  for (let i = 0; i < NFAX; i += 1) {
    // convert diagonals to 0 for first matrix
    let matrix = convertMatrixDiags(HOLDR);

    // identify the largest correlations for each column aka D(R)
    // also use abs arrays to calc matrix sum |g-iJ| for P coeff calc
    const DRObject = calculateDR(matrix);

    const DR = DRObject.absValsArray;
    const matrixSum = DRObject.matrixSum;

    // calculate column sums
    const columnSums = getColumnSumsFromMatrix(matrix);

    // identify negative column sums if present
    const negativeColSumsArray = checkForNegativeColSums(columnSums);

    let qPrimeArray;
    // if negative column sums, reflect matrix to postivie manifold
    if (negativeColSumsArray.length > 0) {
      qPrimeArray = reflectMatrix(negativeColSumsArray, matrix, columnSums, DR);
    } else {
      qPrimeArray = calculateQPrimeArray(DR, columnSums);
    }

    const coeffPValue = calculateCoeffPValue(qPrimeArray);

    const coeffFValue = evenRound(Math.sqrt(coeffPValue), 5);

    const factorArray = calcFactorArray(coeffFValue, qPrimeArray);

    const largestCorrelation = evenRound(Math.max(...DR), 4);

    const largestFactorLoading = evenRound(Math.max(...factorArray), 4);

    const coeffLValue = calcCoeffLValue(coeffPValue, DR, matrixSum);

    const residualArray = calcResidualMatrix(matrix, DR, factorArray);

    // console.log("DR:", JSON.stringify(DR));
    // console.log("coeff P:", JSON.stringify(coeffPValue));
    // console.log("matrix sum:", JSON.stringify(matrixSum));

    allFactorsArray.push(factorArray);
    coeffLValueArray.push(coeffLValue);
    largestCorrelationArray.push(largestCorrelation);
    largestFactorLoadingArray.push(largestFactorLoading);

    // set matrix to residual matrix
    HOLDR = residualArray;
  } // end of factor extraction loop

  const factorMatrix1 = clone(allFactorsArray);
  const eigenValues = calcEigenValues(factorMatrix1, numQsorts);

  const resultsObject = {};

  resultsObject.explainVarandEigens = eigenValues;
  resultsObject.fMatrix = allFactorsArray;
  resultsObject.eigenvalues = eigenValues[0];
  resultsObject.lArray = coeffLValueArray;
  resultsObject.largestCorrelationArray = largestCorrelationArray;
  resultsObject.largestLoadingArray = largestFactorLoadingArray;

  return resultsObject;
};

export default tuckerMain;
