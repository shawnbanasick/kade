import store from "../../store";
import cloneDeep from "lodash/cloneDeep";
import evenRound from "../../Utils/evenRound";


// todo - change function to accept factors as rows format and eliminate need to transpose factorMatrix
const calculateCommunalities = function(currentFactorData) {
    var calculateCommunalityArray = cloneDeep(currentFactorData);
    var temp,
        temp2,
        temp3,
        temp4,
        i,
        roundedValue,
        chartDataLength;
    var communalitiesArray = [];
    var fSigCriterion = [];

    function square(m) {
        return m * m;
    }

    // for each row (participant q-sort) in table format array
    calculateCommunalityArray.forEach(function(n) {

        // square all array values
        temp = n.map(square);

        // sum all array values
        temp2 = temp.reduce(function(a, b) {
            return a + b;
        });

        // do rounding and push to new array
        temp3 = evenRound(temp2, 5);
        communalitiesArray.push(temp3);

        // round squared array values calculated above 
        temp4 = [];
        for (var k = 0, kLen = temp.length; k < kLen; k++) {
            roundedValue = evenRound(temp[k], 5);
            temp4.push(roundedValue);
        }
        fSigCriterion.push(temp4);
    });

    store.setState({
        fSigCriterion: fSigCriterion,
        rowH2: communalitiesArray
    });

    chartDataLength = calculateCommunalityArray.length;
    for (i = 0; i < chartDataLength; i++) {
        calculateCommunalityArray[i].push(communalitiesArray[i]);
    }
    return calculateCommunalityArray;
};

export default calculateCommunalities;
