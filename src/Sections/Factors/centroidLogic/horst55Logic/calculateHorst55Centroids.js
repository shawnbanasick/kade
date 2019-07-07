import testSignificanceOfResidual from "./testSignificanceOfResidual";
import calcSignAndFactorVectors from "./calcSignAndFactorVectors";
import getDiagonalsAndNewDiagonals from './getDiagonalsAndNewDiagonals';

// ** HOLDR is correlation matrix
const HOLDR = [
  [1.000, 0.829, 0.768, 0.108, 0.033, 0.108, 0.298, 0.309, 0.351],
  [0.829, 1.000, 0.775, 0.115, 0.061, 0.125, 0.323, 0.347, 0.369],
  [0.768, 0.775, 1.000, 0.272, 0.205, 0.238, 0.296, 0.271, 0.385],
  [0.108, 0.115, 0.272, 1.000, 0.636, 0.626, 0.249, 0.183, 0.369],
  [0.033, 0.061, 0.205, 0.636, 1.000, 0.709, 0.138, 0.091, 0.254],
  [0.108, 0.125, 0.238, 0.626, 0.709, 1.000, 0.190, 0.103, 0.291],
  [0.298, 0.323, 0.296, 0.249, 0.138, 0.190, 1.000, 0.654, 0.527],
  [0.309, 0.347, 0.271, 0.183, 0.091, 0.103, 0.654, 1.000, 0.541],
  [0.351, 0.369, 0.385, 0.369, 0.254, 0.291, 0.527, 0.541, 1.000]
];

const STPCRT = false;

const numFactors = 7;

const calculateHorst55Centroids = (numFactors, STPCRT, HOLDR) => {
  // * Conversion of a Fortran HELL-scape of nested loops, GOTOs, and CONTINUEs into javascript



  // rMatrix is correlation table with 1s in diagonals
  // variable naming follows Horst and PQMethod

  // current loop count
  let NL = 0;
  // loop iterations
  let L = 0;
  // copy the correl matrix to HOLDR
  let rMatrix = HOLDR.map(arr => arr.slice());
  // other variables from Horst
  const P = 0.001;
  // size of the matrix
  const N = rMatrix.length;
  const M = rMatrix.length;
  const FN = N;
  const FM = M;
  // centroid factors extracted
  let K = 0; // * change to user input (numFactors)
  const KF = 0;
  // for output
  const writeMatrix = [];
  const NFAX = 7;
  const fMatrix = [];  // * output matrix

  let U = [];

  // ** get first diagonals from correl matrix
  for (let i=0; i<rMatrix.length; i+=1) {
    U.push(rMatrix[i][i]);
  }

  
  // ** begin factor extraction
  let breakLoop = false;

  do {
    
    // **  we need S value from test of significance of residual to 
    // **  determine if loop breaks

    const testValues = testSignificanceOfResidual(rMatrix, N);
    
    // ** unpack test of significance of residual
    let D = testValues[0];
    const AVRGS = testValues[1];
    const S = testValues[2];


    // todo (check if delete possible) - or if number of facs is 0
    // ** check if ready for loop break and output path (lines 1994-1995)
    // ** if stop criteria met
    if (STPCRT && 2.0 * S * FM - FN * (FN - 1.0) > 0) {
      breakLoop = true;
      }
    // * if over num facs selected
    if (K >= NFAX) {
      breakLoop = true;
    }


    // * if we are still calculating facs, then goto line 54 first and calc diagonals, new diagonals
    // * returns [D, U, K, rMatrix, L, breakLoop]
    const diagonals = getDiagonalsAndNewDiagonals(D, U, L, NL, rMatrix, HOLDR, P, breakLoop, K);
    // * unpack
    D = diagonals[0];
    U = diagonals[1];
    K = diagonals[2];
    rMatrix = diagonals[3];
    L = diagonals[4];
    breakLoop = diagonals[5];

    // ** then, extract another factor by continuing with loop (line 25)
    calcSignAndFactorVectors(rMatrix, K, D, fMatrix);


    console.log(JSON.stringify(rMatrix));
    console.log(JSON.stringify(D));
    console.log(AVRGS);


    // console.log(numFactors);
    NL += 1;
  } while (NL < 30 || breakLoop === false);
  // do line 54
};

export default calculateHorst55Centroids;
