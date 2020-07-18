// import _ from "lodash";
import testSigResD from "./testSigResD";
import testSigResAvrgsAndS from "./testSigResAvrgsAndS";

const testSignificanceOfResidual = (rMatrix, N, D) => {
  // rMatrix is correl or residual matrix, N is size of matrix. D is diagonal array

  const newD = testSigResD(D, rMatrix);
  D = newD.D;
  rMatrix = newD.rMatrix;

  const calcAvrgsAndS = testSigResAvrgsAndS(rMatrix, N);
  const S = calcAvrgsAndS.S;
  const AVRGS = calcAvrgsAndS.AVRGS;

  return { D, AVRGS, S, rMatrix };
};
export default testSignificanceOfResidual;

