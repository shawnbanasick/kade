const grabStatementsT3 = function(data) {
    var currentStatements = [];
    for (var pp = 1; pp < data.length; pp++) {
        var temp11 = data[pp].split(',');
        let testValue = +temp11[0];
        if (isNaN(testValue) || temp11[0] === "" || temp11[1] === null) {
        } else {
            currentStatements.push(temp11[1]);
        }
    }
    return currentStatements;
};

export default grabStatementsT3;