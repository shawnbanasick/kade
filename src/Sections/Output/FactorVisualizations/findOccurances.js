const findOccurrences = function(arr, val) {
    var i,
        j,
        count = 0;
    for (i = 0, j = arr.length; i < j; i++) {
        if (arr[i] === val) {
            count++;
        }
    }
    return count;
};

export default findOccurrences;
