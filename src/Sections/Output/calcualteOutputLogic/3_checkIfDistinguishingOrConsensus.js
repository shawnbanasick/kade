import includes from "lodash/includes";
import store from "../../../store";

const checkIfDistinguishingOrConsensus = function(statementNumber, loopNumber) {
  const masterDistingStatementNumbersArray01 = store.getState(
    "masterDistingStatementNumbersArray01"
  );
  const masterDistingStatementNumbersArray05 = store.getState(
    "masterDistingStatementNumbersArray05"
  );
  const consensus05 = store.getState("consensus05Statements");
  const consensus01 = store.getState("consensus01Statements");
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
