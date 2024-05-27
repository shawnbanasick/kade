const calcStatementsNum = (multiplierArray) => {
  const initialValue = 0;
  const numStatements = multiplierArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  return numStatements;
};

export default calcStatementsNum;
