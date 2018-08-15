import evenRound from "../../Utils/evenRound";

const calcEigenVectors = function(
    numberOfSorts,
    numberofPrincipalComps,
    eigenValuesSorted,
    svd
) {
    var inflectionArray = [];
    var temp1,
        critInflectionValue,
        temp3,
        temp4;
    // setup empty array
    var eigenVecs = [];
    for (var p = 0; p < numberOfSorts; p++) {
        eigenVecs.push([]);
    }
    // loop through each component
    for (var i = 0, iLen = numberofPrincipalComps; i < iLen; i++) {
        temp1 = Math.sqrt(eigenValuesSorted[i]);
        critInflectionValue = 0;

        // loop through each QSort to get loading and also calc CRIT
        for (var j = 0, jLen = svd.length; j < jLen; j++) {
            temp3 = evenRound(svd[j][i] * temp1, 8);
            eigenVecs[j][i] = temp3;
            // set up data for influection test
            temp4 = evenRound(temp3 * Math.abs(temp3), 8);
            critInflectionValue = critInflectionValue + temp4;
        }
        inflectionArray.push(evenRound(critInflectionValue, 8));
    }
    return [eigenVecs, inflectionArray];
};

export default calcEigenVectors;
