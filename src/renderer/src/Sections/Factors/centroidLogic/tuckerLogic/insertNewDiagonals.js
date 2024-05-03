const insertNewDiagonals = (rMatrix, HOLDR) => {
  let newRmatrix = rMatrix.map((row, indexI) => {
    return row.map((item, indexJ) => {
      rMatrix[indexI][indexJ] = HOLDR[indexI][indexJ];
      if (indexI === indexJ) {
        rMatrix[indexI][indexJ] = 0.0;
      }
      return rMatrix[indexI][indexJ];
    });
  });
  return newRmatrix;
};

export default insertNewDiagonals;
