import evenRound from "../../Utils/evenRound";

const doFactorRotations = function(CospAndSinp, factorA, factorB) {
    var shouldSkipRotation = CospAndSinp[2];
    if (shouldSkipRotation) {
        var originalFactors = [factorA, factorB];
        return originalFactors;
    } else {
        var resultsArrayFactorA = [];
        var resultsArrayFactorB = [];
        var i,
            AA,
            BB,
            rotatedFactors;
        var iLoopLen = factorA.length;
        var SINP = CospAndSinp[0];
        var COSP = CospAndSinp[1];

        for (i = 0; i < iLoopLen; i++) {
            AA = evenRound(factorA[i] * COSP + factorB[i] * SINP, 8);
            resultsArrayFactorA.push(AA);

            BB = evenRound(-factorA[i] * SINP + factorB[i] * COSP, 8);
            resultsArrayFactorB.push(BB);
        }
        rotatedFactors = [resultsArrayFactorA, resultsArrayFactorB];
        return rotatedFactors;
    }
};

export default doFactorRotations;
