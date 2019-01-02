import includes from "lodash/includes";
import state from "../../../store";

const checkIfDistinguishingOrConsensus = function(statementNumber, loopNumber) {
  const masterDistingStatementNumbersArray01 = state.getState(
    "masterDistingStatementNumbersArray01"
  );
  const masterDistingStatementNumbersArray05 = state.getState(
    "masterDistingStatementNumbersArray05"
  );
  const consensus05 = state.getState("consensus05Statements");
  const consensus01 = state.getState("consensus01Statements");
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
