const shiftRawSortsPositive = function(tempArray, min) {
  let minValue = Math.abs(min);
  let tempArray2 = tempArray.map(function(x) {
    return x + minValue + 1;
  });
  return tempArray2;
};

export default shiftRawSortsPositive;
