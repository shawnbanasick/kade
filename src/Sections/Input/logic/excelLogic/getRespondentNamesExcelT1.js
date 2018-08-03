export function getRespondentNamesExcelT1(namesData) {
    var respondentNames = [];
    for (var m = 0, mLen = namesData.length; m < mLen; m++) {
        var temp1 = namesData[m].statementNum;
        if (temp1 !== "") {
            respondentNames.push(temp1);
        }
    }
    // qavRespondentNames = UTIL.checkUniqueName(qavRespondentNames);
    return respondentNames;
}
