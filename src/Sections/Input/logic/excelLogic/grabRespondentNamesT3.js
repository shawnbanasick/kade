const grabRespondentNamesT3 = function(data) {
    var qavRespondentNames2 = [];
    for (var jj = 1, jjLen = data.length; jj < jjLen; jj++) {
        var temp1 = data[jj][0];
        if (temp1 === "") {
        } else {
            qavRespondentNames2.push(temp1);
        }
    }
    var qavRespondentNames = qavRespondentNames2.slice(2);
    return qavRespondentNames;
};

export default grabRespondentNamesT3;
