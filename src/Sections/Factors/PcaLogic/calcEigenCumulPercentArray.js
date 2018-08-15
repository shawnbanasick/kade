import evenRound from "../../Utils/evenRound";

const calcEigenCumulPercentArray = function(eigenValuesSorted, numberOfSorts) {
    var percentNumber = 100 / numberOfSorts;
    var eigenValuesAsPercents = [];
    var eigenValuesPercent;
    var eigenValuesCumulPercentArray = [];
    var eigenValueCumulPercentAccum = 0;

    for (var k = 0, kLen = eigenValuesSorted.length; k < kLen; k++) {
        eigenValuesSorted[k] = evenRound(eigenValuesSorted[k], 8);
        eigenValuesPercent = evenRound(eigenValuesSorted[k] * percentNumber, 0);
        eigenValuesAsPercents.push(eigenValuesPercent);
        eigenValueCumulPercentAccum = eigenValueCumulPercentAccum + eigenValuesPercent;
        eigenValuesCumulPercentArray.push(eigenValueCumulPercentAccum);
    }
    return [eigenValuesAsPercents, eigenValuesCumulPercentArray];
};

export default calcEigenCumulPercentArray;
