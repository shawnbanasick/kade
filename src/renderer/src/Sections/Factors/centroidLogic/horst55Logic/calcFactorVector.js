// import _ from "lodash";
import calcNewW from "./calcNewW";
import adjustByS from "./adjustByS";

const calcFactorVector = (D, K, N, V, W, fMatrix, rMatrix) => {
  W = calcNewW(D, N, V, W);

  W = adjustByS(N, W);

  // ** write to the output matrix (fmatrix)
  const tempArray = W.slice();

  fMatrix[K] = tempArray;

  return { K, W, fMatrix };
};

export default calcFactorVector;

