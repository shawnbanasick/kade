import calculateColumnSums from "./calculateColumnSums";
import caculateMinValueAndIndex from "./calculateMinValueAndIndex";

const calculatePositiveManifold = (manifoldArray, minColumnSum) => {
    var reflectedRowCol = [];
    var columnSums,
        findMinColumnSum,
        minIndex,
        positiveManifoldData;
    var m,
        p,
        pLen;
    var mLoopLen = manifoldArray.length;

    while (minColumnSum < 0) {
        columnSums = calculateColumnSums(manifoldArray);
        findMinColumnSum = caculateMinValueAndIndex(columnSums);
        minColumnSum = findMinColumnSum[0];
        minIndex = findMinColumnSum[1];
        if (minColumnSum < 0) {
            for (m = 0; m < mLoopLen; m++) {
                manifoldArray[m][minIndex] = manifoldArray[m][minIndex] * -1;
            }
            for (p = 0, pLen = manifoldArray[minIndex].length; p < pLen; p++) {
                // single row
                manifoldArray[minIndex][p] = manifoldArray[minIndex][p] * -1; // do something
            }
            reflectedRowCol.push(minIndex);
        } else {
            positiveManifoldData = [manifoldArray, columnSums, reflectedRowCol];
            return positiveManifoldData;
        }
    }
};

export default calculatePositiveManifold;
