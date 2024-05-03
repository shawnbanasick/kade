const convertMatrixDiags = HOLDR => {
  const newMatrix = HOLDR.map((row, indexI) => {
    return row.map((item, indexJ) => {
      if (indexI === indexJ) {
        return 0;
      } else {
        return item;
      }
    });
  });
  return newMatrix;
};

export default convertMatrixDiags;
