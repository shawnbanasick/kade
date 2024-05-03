import includes from "lodash/includes";
import getCalcState from "../../GlobalState/getCalcState";

const checkIfDistinguishingOrConsensus = function(statementNumber, loopNumber) {
  // getState
  const masterDistingStatementNumbersArray01 = getCalcState(
    "masterDistingStatementNumbersArray01"
  );
  const masterDistingStatementNumbersArray05 = getCalcState(
    "masterDistingStatementNumbersArray05"
  );
  const consensus05 = getCalcState("consensus05Statements");
  const consensus01 = getCalcState("consensus01Statements");

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
