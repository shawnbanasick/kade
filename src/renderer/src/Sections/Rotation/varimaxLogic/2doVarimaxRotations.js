import evenRound from '../../../Utils/evenRound';
import sumArrayValues from '../../../Utils/sumArrayValues';
import varimaxIteration from './3_varimaxIteration';
import unStandardize from './3_unStandardize';

const doVarimaxRotations = (factorMatrix, sumSquares) => {
  // also calls and loops factor adjustment function varimaxIteration
  let NV; // = 1;  outer big loop counter
  // var TVNV      // total variance of current loop
  let TVLT; //  total variance of previous loop used for kickout test
  let NC;
  let TV = 0; // total variance
  let aaArray;
  let bbArray;
  let tvArray;
  const FN = factorMatrix[0].length;
  const FFN = FN * FN;
  let testCondition;
  let intermediateRotation;
  let AA;
  let BB;
  let FNBB;
  let AASQ;

  do {
    if (NV) {
      factorMatrix = intermediateRotation;
    }

    tvArray = [];
    let arrayFrag;
    let temp;
    let i;
    let j;
    const iLoopLen = factorMatrix.length;

    TVLT = TV;

    // gets sumSquares of new varimaxIteration matrix to check convergence
    for (i = 0; i < iLoopLen; i += 1) {
      // for each factor
      AA = 0;
      BB = 0;
      arrayFrag = factorMatrix[i];
      const jLoopLen = arrayFrag.length;

      aaArray = [];
      bbArray = [];
      for (j = 0; j < jLoopLen; j += 1) {
        // for each sort
        temp = evenRound(arrayFrag[j] * arrayFrag[j], 8); // CC
        aaArray.push(evenRound(temp, 8)); // AA
        const tempBB = evenRound(temp * temp, 8);
        bbArray.push(evenRound(tempBB, 8));
      }
      AA = evenRound(sumArrayValues(aaArray), 8);
      BB = evenRound(sumArrayValues(bbArray), 8);
      // FN is number factors, AA is total of sumSquares, BB is square of total of sumSquares, FFN is number factors squared
      // (3745)
      FNBB = evenRound(FN * BB, 8);
      AASQ = evenRound(AA * AA, 8);
      // TV = evenRound(((FN * BB - AA * AA) / FFN), 8);
      TV = evenRound((FNBB - AASQ) / FFN, 8);
      tvArray.push(TV);
    }

    TV = evenRound(sumArrayValues(tvArray), 8);

    if (!NV) {
      NV = 1;
      NC = 0;
      TVLT = 0;
    } else {
      NV += 1;
    }

    // testing for convergence
    if (Math.abs(TV - TVLT) < 0.00000001) {
      NC += 1;
    } else {
      NC = 0;
    }

    intermediateRotation = varimaxIteration(factorMatrix);

    // run no more than 225 iterations
    testCondition = false;
    if (NC > 3) {
      testCondition = true;
    }
    if (NV >= 225) {
      testCondition = true;
    }
  } while (testCondition === false);

  const results = unStandardize(factorMatrix, sumSquares);

  return results;
};

export default doVarimaxRotations;
