import varimaxCalculations from "./4_varimaxCalculations";

const varimaxIteration = function(standardizedFactorMatrix) {
    // each item in 2D matrix
    var rotatedFactors;
    var i,
        j;
    var loopLen = standardizedFactorMatrix.length;

    for (i = 0; i < loopLen; i++) {
        for (j = i + 1; j < loopLen; j++) {
            // sends out for rotation
            rotatedFactors = varimaxCalculations(
                standardizedFactorMatrix[i],
                standardizedFactorMatrix[j]
            );
            // subs results into matrix
            standardizedFactorMatrix[i] = rotatedFactors[0];
            standardizedFactorMatrix[j] = rotatedFactors[1];
        }
    }
    return standardizedFactorMatrix;
};

export default varimaxIteration;
