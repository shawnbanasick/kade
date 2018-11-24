const undoReflection = (subtractedArray, factorLoadings, reflectedRowCol) => {
    reflectedRowCol.forEach(function(rowcolnumber) {
        for (var i = 0; i < subtractedArray.length; i++) {
            subtractedArray[i][rowcolnumber] = subtractedArray[i][rowcolnumber] * -1;
        }
        for (var j = 0; j < subtractedArray[rowcolnumber].length; j++) {
            subtractedArray[rowcolnumber][j] = subtractedArray[rowcolnumber][j] * -1;
        }
        factorLoadings[rowcolnumber] = factorLoadings[rowcolnumber] * -1;
    }, this);
    let factorResults = [subtractedArray, factorLoadings];
    return factorResults;
};

export default undoReflection;
