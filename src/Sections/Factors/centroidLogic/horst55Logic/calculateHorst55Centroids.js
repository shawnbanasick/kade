import testSignificanceOfResidual from "./testSignificanceOfResidual";

const calculateHorst55Centroids = (numFactors, rMatrix, STPCRT) => {
  // rMatrix is correlation table with 1s in diagonals
  // variable naming follows Horst and PQMethod

  // current loop count
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
  // for output
  writeMatrix = [];

  do {
    const testValues = testSignificanceOfResidual(rMatrix, N);
    const D = testValues[0];
    const AVRGS = testValues[1];
    const S = testValues[2];

    // check if ready for output path (lines 1994-1995)
    if (STPCRT && 2.0 * S * FM - FN * (FN - 1.0) <= 0) {
      // if number facs extracted = NFAX facs selected
      if (K < 1) {
        // no factors selected
        {
          break;
        }
      }
    }
    // todo (check if delete possible) - or if number of facs is 0
    if (K >= NFAX) {
      if (K < 1) {
        // no factors selected
        {
          break;
        }
      }
    }
    // continue with loop (line 25)
    calcSignAndFactorVectors();

    console.log(numFactors);
    NL += 1;
  } while (NL < 30);
  // do line 54
  console.log(JSON.stringify(rMatrix));
  console.log(JSON.stringify(D));
  console.log(AVRGS);
};

export default calculateHorst55Centroids;
