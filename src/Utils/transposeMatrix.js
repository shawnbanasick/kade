import zip from "lodash/zip";

const transposeMatrix = matrix => {
  const matrixTransposed = zip(...matrix);
  return matrixTransposed;
};

export default transposeMatrix;
