import evenRound from "./evenRound";
import average from "./average";

const standardDeviation = function(values) {
    var avg = average(values);
    var squareDiffs = values.map(function(value) {
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });
    var avgSquareDiff1 = squareDiffs.reduce(function(sum, value) {
        return sum + value;
    }, 0);
    var avgSquareDiff = evenRound(avgSquareDiff1 / (squareDiffs.length - 1), 8);
    var stdDev = evenRound(Math.sqrt(avgSquareDiff), 8);
    return stdDev;
};

export default standardDeviation;
