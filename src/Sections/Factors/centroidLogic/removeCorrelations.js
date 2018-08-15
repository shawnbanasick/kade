import evenRound from "../../Utils/evenRound";

const removeCorrelations = (array, factorLoadings) => {
    let factorCorrelations = [];
    var newArrayFrag;

    function helper1(factorLoadings, index) {
        factorLoadings.forEach(function(num) {
            var temp = num * factorLoadings[index];
            newArrayFrag.push(evenRound(temp, 8));
        }, this);

        return newArrayFrag;
    }

    for (var i = 0, iLen = factorLoadings.length; i < iLen; i++) {
        newArrayFrag = [];
        newArrayFrag = helper1(factorLoadings, i);
        factorCorrelations.push(newArrayFrag);
    }

    let residualCorrelationsPrep = [];

    for (var j = 0, jLen = factorLoadings.length; j < jLen; j++) {
        var subtractionFrag = [];
        for (var k = 0, kLen = factorLoadings.length; k < kLen; k++) {
            let tempVar = array[j][k] - factorCorrelations[j][k];
            subtractionFrag.push(evenRound(tempVar, 8));
        }
        residualCorrelationsPrep.push(subtractionFrag);
    }

    for (var p = 0, pLen = factorLoadings.length; p < pLen; p++) {
        var m = p;
        residualCorrelationsPrep[p][m] = 1;
    }

    return residualCorrelationsPrep;
};

export default removeCorrelations;
