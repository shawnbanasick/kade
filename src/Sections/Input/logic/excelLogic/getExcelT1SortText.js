export function getExcelT1SortText(inputData1, numStatements) {
    var sortData = [];
    var sortLength = 29 + numStatements;
    var counter = inputData1[28].length - 1;

    for (var k = 28; k < sortLength; k++) {
        var key = inputData1[k][0];
        var value;
        var tempArray1 = [];
        var j = 1;
        var tempObj1;

        for (var kr = 0; kr < counter; kr++) {
            value = inputData1[k][j];

            // catch the respondent names first
            if (k === 28 && value !== "") {
                tempObj1 = {};
                tempObj1.sortValue = key;
                tempObj1.statementNum = value;
                tempArray1.push(tempObj1);
            } else {
                if (value !== "") {
                    tempObj1 = {};
                    tempObj1.sortValue = +key;
                    tempObj1.statementNum = +value;
                    tempArray1.push(tempObj1);
                }
            }
            j = j + 1;
        }
        sortData.push(tempArray1);
    }
    return sortData;
}
