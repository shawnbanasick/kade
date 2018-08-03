const grabProjectStatements = function(statementsDataT2) {
    let qavCurrentStatements = [];
    for (let s = 0, sLen = statementsDataT2.length; s < sLen; s++) {
        let temp12 = statementsDataT2[s].Statements;
        if (temp12 === "" || temp12 === undefined || temp12 === null) {
        } else {
            qavCurrentStatements.push(temp12);
        }
    }
    return qavCurrentStatements;
};

export default grabProjectStatements;