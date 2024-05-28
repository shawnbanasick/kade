export default function getStatementsExcelT1(statementData1) {
  const currentStatements = [];
  for (let s = 0, sLen = statementData1[0].length; s < sLen; s += 1) {
    const temp12 = statementData1[0][s].Statements;
    if (temp12 !== '' && temp12 !== undefined && temp12 !== null) {
      currentStatements.push(temp12);
    }
  }
  return currentStatements;
}
