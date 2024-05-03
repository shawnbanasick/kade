const calcStatementsNum = (multiplierArray: number[]) => {
  const initialValue = 0;
  const numStatements = multiplierArray.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue,
    initialValue
  );
  return numStatements;
};

export default calcStatementsNum;
