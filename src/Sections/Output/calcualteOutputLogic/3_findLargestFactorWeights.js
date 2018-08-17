import uniq from 'lodash/uniq';
import store from "../../store";
import cloneDeep from "lodash/cloneDeep";
import evenRound from "../../Utils/evenRound";

const findLargestFactorWeights = function(significantLoadingsArray) {

    // remove unique sorts (value 99) from array
    let factorSelect = significantLoadingsArray.filter(function(n) {
        return n[0] !== 99;
    });

    // pull out just factor number and W value to array
    let factorNumbersArray2 = [];
    let factorNumbersArray = [];
    factorSelect.forEach(function(n) {
        let factorNumber = n[0]; // i.e. factor1
        factorNumbersArray2.push(factorNumber);
        let factorWeightW = n[3];
        let tempArray = [factorNumber, factorWeightW];
        factorNumbersArray.push(tempArray);
    });

    let sigArray = cloneDeep(factorNumbersArray2);

    // get unique array of significant factors labels
    let sigFactorNumbersArray = uniq(sigArray);

    var maxFactorValuesArray = [];
    var factorValue = 0;
    sigFactorNumbersArray.forEach(function() {
        var temp = factorNumbersArray.filter(function(j) {
            return j[0] === sigArray[factorValue];
        });

        var tempArray2 = [];
        temp.forEach(function(q) {
            var tempVar3 = evenRound(Math.abs(1 / q[1]), 8);
            tempArray2.push(tempVar3);
        });

        // numbers inverted, so using min rather max somewhere else
        var maxFactorValue = Math.min(...tempArray2);

        maxFactorValuesArray.push(maxFactorValue);

        factorValue = factorValue + 1;
    });

    // array
    store.setState({
        sigFactorNumbersArray: sigFactorNumbersArray
    });

    return [
        significantLoadingsArray,
        sigFactorNumbersArray,
        maxFactorValuesArray
    ];
};

export default findLargestFactorWeights;
