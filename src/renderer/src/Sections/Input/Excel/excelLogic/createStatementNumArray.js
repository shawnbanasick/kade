const createStatementNumArray = numStatements => {
  let statementNumArray = [];
  for (let i = 0; i < numStatements; i++) {
    statementNumArray.push(i + 1);
  }

  return statementNumArray;
};

export default createStatementNumArray;
