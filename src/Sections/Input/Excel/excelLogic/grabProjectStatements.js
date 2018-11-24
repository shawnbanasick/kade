function grabProjectStatements(statementsDataT2) {
  const qavCurrentStatements = [];
  for (let s = 0, sLen = statementsDataT2.length; s < sLen; s += 1) {
    const temp12 = statementsDataT2[s].Statements;
    if (temp12 !== "" && temp12 !== undefined && temp12 !== null) {
      qavCurrentStatements.push(temp12);
    }
  }
  return qavCurrentStatements;
}

export default grabProjectStatements;
