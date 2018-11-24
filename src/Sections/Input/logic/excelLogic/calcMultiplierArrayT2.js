const calcMultiplierArrayT2 = function(copyTriangleShape) {
    var multiplierArray = [];
    var prev;
    for (var i = 0, iLen = copyTriangleShape.length; i < iLen; i++) {
        if (copyTriangleShape[i] !== prev) {
            multiplierArray.push(1);
        } else {
            multiplierArray[multiplierArray.length - 1]++;
        }
        prev = copyTriangleShape[i];
    }
    // pad the multiplierArray
    var leadValue = copyTriangleShape[0];
    var minLeadValue = -6;
    var padding = Math.abs(minLeadValue - leadValue);
    for (var p = 0; p < padding; p++) {
        multiplierArray.unshift(0);
    }
    for (var j = 0; j < 20; j++) {
        if (multiplierArray.length < 20) {
            multiplierArray.push(0);
        }
    }
    return multiplierArray;
};

export default calcMultiplierArrayT2;