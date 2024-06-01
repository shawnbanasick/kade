const shiftRawSortsPositive = (tempArray, min) => {
  const minValue = Math.abs(min);
  const tempArray2 = tempArray.map((x) => x + minValue + 1);
  return tempArray2;
};

export default shiftRawSortsPositive;
