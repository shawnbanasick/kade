const testSignificanceOfResidual = (rMatrix, N) => {
  // rMatrix is correl or residual matrix, N is size of matrix. D is diagonal array
  const D = [];
  for (let i = 0; i < rMatrix.length; i += 1) {
    D.push(rMatrix[i][i]);
    rMatrix[i][i] = 0;
  }

  let S = 0.0;
  let AVRGS;

  for (let ii = 0; ii < rMatrix.length; ii += 1) {
    for (let jj = 0; jj < rMatrix[ii].length; jj += 1) {
      S += rMatrix[ii][jj] ** 2;
    }
    AVRGS = (2 * S) / (N * (N - 1));
  }
  return [D, AVRGS];
};
export default testSignificanceOfResidual;

// return AVRGS, D
