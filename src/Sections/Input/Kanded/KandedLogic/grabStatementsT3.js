const grabStatementsT3 = data => {
  const currentStatements = [];
  for (let pp = 1; pp < data.length; pp += 1) {
    const temp11 = data[pp].split(",");
    const testValue = +temp11[0];
    if (isNaN(testValue) || temp11[0] === "" || temp11[1] === null) {
    } else {
      currentStatements.push(temp11[1]);
    }
  }
  return currentStatements;
};

export default grabStatementsT3;
