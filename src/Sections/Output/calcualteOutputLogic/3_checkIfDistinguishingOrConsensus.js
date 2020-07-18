import includes from "lodash/includes";
import calcState from "../../GlobalState/calcState";
const clone = require("rfdc")();

const checkIfDistinguishingOrConsensus = function(statementNumber, loopNumber) {
  // getState
  const masterDistingStatementNumbersArray01 = clone(
    calcState.masterDistingStatementNumbersArray01
  );
  const masterDistingStatementNumbersArray05 = clone(
    calcState.masterDistingStatementNumbersArray05
  );
  const consensus05 = clone(calcState.consensus05Statements);
  const consensus01 = clone(calcState.consensus01Statements);

  
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
  }
  return "";
};

export default checkIfDistinguishingOrConsensus;

