import evenRound from '../../../../Utils/evenRound';

function roundNumber(number, precision) {
  precision = Math.abs(parseInt(precision, 10)) || 0;
  var multiplier = Math.pow(10, precision);
  return Math.round(number * multiplier) / multiplier;
}

const calcResidualMatrix = (zeroDiagMatrix, DR, factorArray) => {
  const newMatrix = zeroDiagMatrix.map((row, indexI) => {
    return row.map((item, indexJ) => {
      // diagonal case
      if (indexI === indexJ) {
        let value1 = factorArray[indexI];
        let sqrdValue = evenRound(value1 * value1, 5);
        let residual = evenRound(DR[indexI] - sqrdValue, 5);
        return roundNumber(residual, 5);
      } else {
        // non-diagonal case
        let value1 = factorArray[indexI];
        let value2 = factorArray[indexJ];
        let newValue = evenRound(value1 * value2, 5);
        let residual = evenRound(zeroDiagMatrix[indexI][indexJ] - newValue, 5);
        return roundNumber(residual, 5);
      }
    });
  });
  return newMatrix;
};

export default calcResidualMatrix;
