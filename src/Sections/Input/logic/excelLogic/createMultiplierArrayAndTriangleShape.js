export function createMultiplierArrayAndTriangleShape(inputData1) {
    var qavSortTriangleShape = [];
    var multiplierArray = [];
    for (var i = 4; i < 24; i++) {
        var testValue = +inputData1[i][1];
        if (testValue < 1 || isNaN(testValue)) {
            multiplierArray.push(0);
        } else {
            var multiplier = +inputData1[i][1];
            multiplierArray.push(multiplier);
            var sortValue = +inputData1[i][0];
            for (var j = 0, jLen = multiplier; j < jLen; j++) {
                qavSortTriangleShape.push(sortValue);
            }
        }
    }
    return [multiplierArray, qavSortTriangleShape];
}
