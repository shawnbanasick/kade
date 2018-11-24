export function getStatementsExcelT1(statementData1) {
    var currentStatements = [];
    for (var s = 0, sLen = statementData1[0].length; s < sLen; s++) {
        var temp12 = statementData1[0][s].Statements;
        if (temp12 === "" || temp12 === undefined || temp12 === null) {
        } else {
            currentStatements.push(temp12);
        }
    }
    return currentStatements;
}
