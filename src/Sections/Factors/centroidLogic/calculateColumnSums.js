import evenRound from "../../Utils/evenRound";

const calculateColumnSums = sortMatrix => {
  let columnTotals = [];

  for (let j = 0, jLen = sortMatrix.length; j < jLen; j++) {
    let sum = 0;

    for (let i = 0, iLen = sortMatrix.length; i < iLen; i++) {
      sum = sum + sortMatrix[i][j];
    }

    sum = sum - 1;

    let sum1 = evenRound(sum, 8);

    columnTotals.push(sum1);
  }
  return columnTotals;
};

export default calculateColumnSums;
