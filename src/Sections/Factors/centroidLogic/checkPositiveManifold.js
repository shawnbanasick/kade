import calculateColumnSums from "./calculateColumnSums";
import calculateMinValueAndIndex from "./calculateMinValueAndIndex";
import calculatePositiveManifold from "./calculatePositiveManifold";

const checkPositiveManifold = dataArray => {
    let columnSums = calculateColumnSums(dataArray);
    let findMinColumnSum = calculateMinValueAndIndex(columnSums);
    let minColumnSum = findMinColumnSum[0];
    let reflectedArrayData;

    if (minColumnSum < 0) {
        reflectedArrayData = calculatePositiveManifold(dataArray, minColumnSum);
        return reflectedArrayData;
    } else {
        reflectedArrayData = [dataArray, columnSums, []];
        return reflectedArrayData;
    }
};

export default checkPositiveManifold;
