import store from "../../store";

const pushStatementsToOutputArray = function(
    sheetNames,
    output,
    outputData,
    sheetNamesXlsx,
    colSizes
) {
    var statements = store.getState("statements");

    // var newSheet = {
    //     sheetid: "Statements",
    //     header: true
    // };
    sheetNamesXlsx.push("Statements");

    var maxStatementLength = 0;
    var arrayOfStatements = [];
    arrayOfStatements.push(["", ""], ["Statement Number", "Statements"]);
    for (var ii = 0, iiLen = statements.length; ii < iiLen; ii++) {
        var tempArray1 = [];
        tempArray1.push(ii + 1, statements[ii]);
        arrayOfStatements.push(tempArray1);
        var stringLength = statements[ii].length;
        if (stringLength > maxStatementLength) {
            maxStatementLength = stringLength;
        }
    }
    outputData.push(arrayOfStatements);

    var columns = [
        {
            wch: 10
        },
        {
            wch: maxStatementLength
        }
    ];
    colSizes.push(columns);

    store.setState({
        maxStatementLength: maxStatementLength
    });

    return [sheetNames, output, outputData, sheetNamesXlsx, colSizes];
};

export default pushStatementsToOutputArray;
