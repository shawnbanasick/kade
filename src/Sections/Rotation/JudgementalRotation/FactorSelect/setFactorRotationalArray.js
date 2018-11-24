import store from '../../../store';

const setTwoFactorRotationalArray = function(chartData) {
    let abFactors = store.getState("abFactors");
    let rotationFactorA = Math.min(...abFactors);
    let rotationFactorB = Math.max(...abFactors);

    var ilen = chartData.length;
    var calculateRotationsArray = [];
    var tempArray;
    var temp1;
    var temp2;

    for (var i = 0; i < ilen; i++) {
        tempArray = [];
        temp1 = chartData[i][rotationFactorA - 1];
        temp2 = chartData[i][rotationFactorB - 1];
        tempArray.push(temp1, temp2);
        calculateRotationsArray.push(tempArray);
    }
    store.setState("calculateRotationsArray", calculateRotationsArray);
    return calculateRotationsArray;
};

export default setTwoFactorRotationalArray;