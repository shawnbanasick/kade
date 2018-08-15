const calculateMinValueAndIndex = columnTotals => {
    let minValues;
    let minIndex = 0;
    let min = columnTotals[0];

    columnTotals.forEach(function(element, index) {
        if (columnTotals[index] < min) {
            minIndex = index;
            min = columnTotals[index];
        }
    }, this);
    minValues = [min, minIndex];
    return minValues;
};

export default calculateMinValueAndIndex;
