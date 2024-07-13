import evenRound from '../../../Utils/evenRound';

const calcStandardizedFactorMatrix = function (sumSquares, factorMatrix) {
  // (3722-3727)
  const standarizedFactorMatrix = [];
  let arrayFrag1;
  let temp5;
  let len2;
  let temp4;
  let sqrtSumSquares;
  let m, k;
  const loopLen1 = factorMatrix.length;

  for (m = 0; m < loopLen1; m++) {
    arrayFrag1 = factorMatrix[m];
    temp5 = [];
    len2 = factorMatrix[m].length;

    for (k = 0; k < len2; k++) {
      sqrtSumSquares = evenRound(Math.sqrt(sumSquares[k]), 8);
      if (sqrtSumSquares !== 0) {
        temp4 = evenRound(arrayFrag1[k] / sqrtSumSquares, 8);
      } else {
        temp4 = 0.0;
      }
      temp5.push(temp4);
    }
    standarizedFactorMatrix.push(temp5);
  }
  return standarizedFactorMatrix;
};

export default calcStandardizedFactorMatrix;
