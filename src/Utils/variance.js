import evenRound from "./evenRound";

const variance = function(arr) {
    var len = 0;
    var sum = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "") {
        } else if (isNaN(arr[i])) {
            return 0;
        } else {
            len = len + 1;
            sum = sum + parseFloat(arr[i]);
        }
    }
    var v = 0;
    if (len > 1) {
        var mean = sum / len;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "") {
            } else {
                v = v + (arr[i] - mean) * (arr[i] - mean);
            }
        }
        var output2 = v / len;
        var output = evenRound(output2, 6);
        return output;
    } else {
        return 0;
    }
};

export default variance;
