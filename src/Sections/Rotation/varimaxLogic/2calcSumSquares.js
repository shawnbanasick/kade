import evenRound from "../../Utils/evenRound";

const calcSumSquares = function calcSumSquares(factorsForRotation) {
    // (3709 - 3714)
    var temp1,
        temp3,
        temp;
    var sumSquares = [];
    var loopLen = factorsForRotation.length;
    for (var i = 0, iLen = factorsForRotation[0].length; i < iLen; i++) {
        temp1 = 0;
        temp3 = 0;
        for (var j = 0; j < loopLen; j++) {
            // todo - check to see if evenRound is needed here since rounding below
            temp = evenRound(factorsForRotation[j][i] * factorsForRotation[j][i], 8);
            temp1 = temp1 + temp;
        }
        temp3 = evenRound(temp1, 8);
        sumSquares.push(temp3);
    }
    return sumSquares;
};

export default calcSumSquares;
