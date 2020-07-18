import evenRound from "../../../../Utils/evenRound";

const writeFactorMatrix = fMatrix => {
  let newfMatrix = fMatrix.map((row, indexI) => {
    return row.map((item, indexJ) => {
      return evenRound(fMatrix[indexI][indexJ], 8);
    });
  });

  return newfMatrix;
};

export default writeFactorMatrix;
