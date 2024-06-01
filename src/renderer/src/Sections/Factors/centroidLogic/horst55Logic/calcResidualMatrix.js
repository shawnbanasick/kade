import evenRound from '../../../../Utils/evenRound';

const calcResidualMatrix = (rMatrix, D, W) => {
  let newRmatrix = rMatrix.map((row, indexI) => {
    return row.map((item, indexJ) => {
      rMatrix[indexI][indexI] = D[indexI];
      rMatrix[indexI][indexJ] = rMatrix[indexI][indexJ] - W[indexI] * W[indexJ];
      rMatrix[indexI][indexJ] = evenRound(rMatrix[indexI][indexJ], 7);
      return rMatrix[indexI][indexJ];
    });
  });
  return newRmatrix;
};

export default calcResidualMatrix;
