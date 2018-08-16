import evenRound from "../../Utils/evenRound";

const calcStandardizedFactorMatrix = function(sumSquares, factorMatrix) {
    // (3722-3727)
    var standarizedFactorMatrix = [];
    var arrayFrag1;
    var temp5;
    var len2;
    var temp4;
    var sqrtSumSquares;
    var m,
        k;
    var loopLen1 = factorMatrix.length;

    for (m = 0; m < loopLen1; m++) {
        arrayFrag1 = factorMatrix[m];
        temp5 = [];
        len2 = factorMatrix[m].length;

        for (k = 0; k < len2; k++) {
            sqrtSumSquares = evenRound(Math.sqrt(sumSquares[k]), 8);
            if (sqrtSumSquares !== 0) {
                temp4 = evenRound(arrayFrag1[k] / sqrtSumSquares, 8);
            } else {
                temp4 = 0.0;
            }
            temp5.push(temp4);
        }
        standarizedFactorMatrix.push(temp5);
    }
    return standarizedFactorMatrix;
};

export default calcStandardizedFactorMatrix;
