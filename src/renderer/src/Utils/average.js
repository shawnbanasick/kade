import evenRound from "./evenRound";

const average = function(data) {
    var sum = data.reduce(function(sum, value) {
        return sum + value;
    }, 0);
    var avg = evenRound(sum / data.length, 8);
    return avg;
};

export default average;
