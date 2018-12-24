import calculateColumnSums from "./calculateColumnSums";
import calculateMinValueAndIndex from "./calculateMinValueAndIndex";
import calculatePositiveManifold from "./calculatePositiveManifold";

const checkPositiveManifold = dataArray => {
  const columnSums = calculateColumnSums(dataArray);
  const findMinColumnSum = calculateMinValueAndIndex(columnSums);
  const minColumnSum = findMinColumnSum[0];
  let reflectedArrayData;

  if (minColumnSum < 0) {
    reflectedArrayData = calculatePositiveManifold(dataArray, minColumnSum);
    return reflectedArrayData;
  }
  reflectedArrayData = [dataArray, columnSums, []];
  return reflectedArrayData;
};

export default checkPositiveManifold;
