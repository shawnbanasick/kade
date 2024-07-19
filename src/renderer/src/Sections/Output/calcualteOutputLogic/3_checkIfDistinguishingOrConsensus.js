import includes from 'lodash/includes';
import calcState from '../../GlobalState/calcState';

const checkIfDistinguishingOrConsensus = function (statementNumber, loopNumber) {
  // getState
  const masterDistingStatementNumbersArray01 =
    calcState.getState().masterDistingStatementNumbersArray01;
  const masterDistingStatementNumbersArray05 =
    calcState.getState().masterDistingStatementNumbersArray05;
  const consensus05 = calcState.getState().consensus05Statements;
  const consensus01 = calcState.getState().consensus01Statements;

  if (includes(masterDistingStatementNumbersArray05[loopNumber], statementNumber)) {
    return '  D';
  } else if (includes(consensus01, statementNumber)) {
    return '  C';
  } else if (includes(masterDistingStatementNumbersArray01[loopNumber], statementNumber)) {
    return '  D*';
  } else if (includes(consensus05, statementNumber)) {
    return '  C*';
  }
  return '';
};

export default checkIfDistinguishingOrConsensus;
