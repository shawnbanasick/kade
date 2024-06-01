import testSignificanceOfResidual from './testSignificanceOfResidual';
import calcSignVector from './calcSignVector';
import accumulateW from './accumulateW';
import calcResidualMatrix from './calcResidualMatrix';
import calcFactorVector from './calcFactorVector';
import writeFactorMatrix from './writeFactorMatrix';
import calcNewDandS from './calcNewDandS';
import insertNewDiagonals from './insertNewDiagonals';
import evenRound from '../../../../Utils/evenRound';
import cloneDeep from 'lodash/cloneDeep';
import factorState from '../../../GlobalState/factorState';

const horstMain = (NFAX, STPCRT, HOLDR, numState, NL, P) => {
  // Conversion of Horst 5.5's fortran HELL-scape of nested loops, GOTOs, and CONTINUEs into javascript

  // variable naming pattern follows Horst and PQMethod when possible for ease of porting / debugging
  // NL = max loop count
  // P = convergence cutoff threshold level

  let L = 0;
  let didNotConverge = false;
  // copy the correl matrix from HOLDR
  let rMatrix = cloneDeep(HOLDR);
  // size of the matrix
  const N = rMatrix.length;
  const FN = N;
  const FM = numState;

  let S;
  // current loop factor number
  let K = 0;
  //  output matrix
  let fMatrix = [];
  let D = [];
  let V = [];
  let breakLoop = false;
  let doLoop54 = false;

  // get first diagonals from correl matrix
  let U = rMatrix.map((item, index) => rMatrix[index][index]);

  // start line 15 big loop - begin factor extraction
  do {
    //   we need S value from test of significance of residual to
    //   determine if loop breaks

    const testValues = testSignificanceOfResidual(rMatrix, N, D);
    D = testValues.D;
    S = testValues.S;
    rMatrix = testValues.rMatrix;

    // lines 1994-1995 IF routing
    let testCriteria = evenRound(2.0 * S * FM - FN * (FN - 1.0), 5);
    if (STPCRT && testCriteria < 0) {
      if (K > 0) {
        doLoop54 = true;
      } else {
        breakLoop = true;
        break;
      }
    } else {
      if (K >= NFAX) {
        if (K > 0) {
          doLoop54 = true;
        } else {
          breakLoop = true;
          break;
        }
      }
    }

    // ****************************************
    //  LOOP 25 START
    // ****************************************

    // sum rows
    let W = accumulateW(rMatrix);

    // then, extract another factor by continuing with loop (line 25)
    // first get sign vector
    let signVector = calcSignVector(rMatrix, W, V);
    W = signVector.W;
    V = signVector.V;
    // then get factor vector
    let factorVector = calcFactorVector(D, K, N, V, W, fMatrix, rMatrix);
    K = factorVector.K;
    W = factorVector.W;
    fMatrix = factorVector.fMatrix;

    // increment counter for num facs extracted
    K += 1;

    // get new residual matrix
    rMatrix = calcResidualMatrix(rMatrix, D, W);

    // *************************************
    // LINE 54 - CALC NEW DIAGONAL
    // *************************************
    if (doLoop54 === true) {
      let newDandS = calcNewDandS(D, U);
      D = newDandS.D;
      S = newDandS.S;
      U = newDandS.U;

      // line 72 IF less than threshold, end loop
      if (evenRound(S - P, 7) > 0) {
        // loop again
        L += 1;

        // line 732 (2045)
        if (L > NL) {
          // goto line 83 ---> write output file
          console.log('did not converge');

          didNotConverge = true;
          breakLoop = true;
          // K = K - 1;
          fMatrix.length = K;
          writeFactorMatrix(fMatrix);
        } else {
          // goto line 75 new diagonals, then loop back to line 25 get sign vector
          K = 0;
          rMatrix = insertNewDiagonals(rMatrix, HOLDR);

          // ****************************************
          //  LOOP 25 START
          // ****************************************
          // sum rows
          let W = accumulateW(rMatrix);

          // then, extract another factor by continuing with loop (line 25)
          // first get sign vector
          let signVector = calcSignVector(rMatrix, W, V);
          W = signVector.W;
          V = signVector.V;
          // then get factor vector
          let factorVector = calcFactorVector(D, K, N, V, W, fMatrix, rMatrix);
          K = factorVector.K;
          W = factorVector.W;
          fMatrix = factorVector.fMatrix;

          // increment counter for num facs extracted
          K += 1;
          // get new residual matrix
          rMatrix = calcResidualMatrix(rMatrix, D, W);
          // end of loop 25
          doLoop54 = false;
        } // end of loop54
      } else {
        breakLoop = true;
      }
    }
  } while (breakLoop === false);

  // reduce if autostop
  if (STPCRT === true) {
    K = K - 1;
    factorState.setState({ numCentroidFactors: K });
    // trim for autostop
    fMatrix.length = K;
  } else {
    fMatrix.length = NFAX;
  }

  const resultsObject = {};
  resultsObject.fMatrix = fMatrix;
  resultsObject.didNotConverge = didNotConverge;

  return resultsObject;
};

export default horstMain;
