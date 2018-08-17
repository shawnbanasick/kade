import store from "../../store";
import includes from 'lodash/includes';

const checkIfDistinguishingOrConsensus = function(statementNumber, loopNumber) {
    var masterDistingStatementNumbersArray01 = store.getState(
        "masterDistingStatementNumbersArray01"
    );
    var masterDistingStatementNumbersArray05 = store.getState(
        "masterDistingStatementNumbersArray05"
    );
    var consensus05 = store.getState("consensus05Statements");
    var consensus01 = store.getState("consensus01Statements");
    if (
        includes(masterDistingStatementNumbersArray05[loopNumber], statementNumber)
    ) {
        return "  D";
    } else if (includes(consensus01, statementNumber)) {
        return "  C";
    } else if (
        includes(masterDistingStatementNumbersArray01[loopNumber], statementNumber)
    ) {
        return "  D*";
    } else if (includes(consensus05, statementNumber)) {
        return "  C*";
    } else {
        return "";
    }
};

export default checkIfDistinguishingOrConsensus;
