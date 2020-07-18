const testSidResD = (D, rMatrix) => {
  const newRMatrix = rMatrix.map((row, index) => {
    D[index] = row[index];
    row[index] = 0.0;
    return row;
  });

  return { D, rMatrix: newRMatrix };
};

export default testSidResD;

