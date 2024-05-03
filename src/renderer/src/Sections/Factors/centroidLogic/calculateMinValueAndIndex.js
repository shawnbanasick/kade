const calculateMinValueAndIndex = columnTotals => {
  let minIndex = 0;
  let min = columnTotals[0];

  columnTotals.forEach((element, index) => {
    if (columnTotals[index] < min) {
      minIndex = index;
      min = columnTotals[index];
    }
  }, this);
  const minValues = [min, minIndex];
  return minValues;
};

export default calculateMinValueAndIndex;
