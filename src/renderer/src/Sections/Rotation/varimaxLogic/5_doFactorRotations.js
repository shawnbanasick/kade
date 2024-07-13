import evenRound from '../../../Utils/evenRound';

const doFactorRotations = function (CospAndSinp, factorA, factorB) {
  const shouldSkipRotation = CospAndSinp[2];
  if (shouldSkipRotation) {
    const originalFactors = [factorA, factorB];
    return originalFactors;
  }
  const resultsArrayFactorA = [];
  const resultsArrayFactorB = [];
  let i, AA, BB, rotatedFactors;
  const iLoopLen = factorA.length;
  const SINP = CospAndSinp[0];
  const COSP = CospAndSinp[1];

  for (i = 0; i < iLoopLen; i++) {
    AA = evenRound(factorA[i] * COSP + factorB[i] * SINP, 8);
    resultsArrayFactorA.push(AA);

    BB = evenRound(-factorA[i] * SINP + factorB[i] * COSP, 8);
    resultsArrayFactorB.push(BB);
  }
  rotatedFactors = [resultsArrayFactorA, resultsArrayFactorB];
  return rotatedFactors;
};

export default doFactorRotations;
