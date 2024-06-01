import calculateColumnSums from './calculateColumnSums';
import caculateMinValueAndIndex from './calculateMinValueAndIndex';

const calculatePositiveManifold = (manifoldArray2, minColumnSum2) => {
  // eslint re-assignment
  let minColumnSum = minColumnSum2;
  const manifoldArray = manifoldArray2.slice();

  const reflectedRowCol = [];
  const mLoopLen = manifoldArray.length;
  let columnSums;
  let findMinColumnSum;
  let minIndex;

  while (minColumnSum < 0) {
    columnSums = calculateColumnSums(manifoldArray);
    findMinColumnSum = caculateMinValueAndIndex(columnSums);
    minColumnSum = findMinColumnSum[0];
    minIndex = findMinColumnSum[1];

    if (minColumnSum < 0) {
      for (let m = 0; m < mLoopLen; m += 1) {
        manifoldArray[m][minIndex] = -manifoldArray[m][minIndex];
      }
      for (let p = 0, pLen = manifoldArray[minIndex].length; p < pLen; p += 1) {
        // single row
        manifoldArray[minIndex][p] = -manifoldArray[minIndex][p];
      }
      reflectedRowCol.push(minIndex);
    }
  }
  const positiveManifoldData = [manifoldArray, columnSums, reflectedRowCol];
  return positiveManifoldData;
};

export default calculatePositiveManifold;
