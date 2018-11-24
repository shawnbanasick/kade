import zip from 'lodash/zip';

const transposeMatrix = function(matrix) {
  let matrixTransposed = zip(...matrix);
  return matrixTransposed;
};

export default transposeMatrix;
