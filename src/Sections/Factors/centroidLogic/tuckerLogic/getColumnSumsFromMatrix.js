import sumArrayValues from "./sumArrayValues";

const getColumnSumsFromMatrix = matrix => {
  const columnSums = matrix.map(row => {
    const value = sumArrayValues(row);
    return value;
  });
  return columnSums;
};

export default getColumnSumsFromMatrix;
