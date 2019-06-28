import testSignificanceOfResidual from "./testSignificanceOfResidual";

const calculateHorst55Centroids = (numFactors, rMatrix) => {
  // rMatrix is correlation table with 1s in diagonals
  // variable naming follows Horst and PQMethod

  let NL = 0;
  // copy the correl matrix to HOLDR
  const HOLDR = rMatrix.map(arr => arr.slice());
  // other variables from Horst
  const P = 0.001;
  // size of the matrix
  const N = rMatrix.length;
  const M = rMatrix.length;
  const FN = N;
  const FM = M;
  // loop iterations
  const L = 0;
  // centroid factors extracted
  const K = 0;
  const KF = 0;

  // others
  // diagonal vector
  let D = [];

  const testValues = testSignificanceOfResidual(rMatrix, N);
  const AVRGS = testValues[1];
  D = testValues[0];

  do {
    console.log(numFactors);
    NL += 1;
  } while (NL < 30);
  console.log(JSON.stringify(rMatrix));
  console.log(JSON.stringify(D));
  console.log(AVRGS);
};

export default calculateHorst55Centroids;
