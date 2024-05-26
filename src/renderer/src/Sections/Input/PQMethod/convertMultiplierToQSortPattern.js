const findMinValueInMultiplierArray = (multiplierArray) => {
  const baseArray = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  let qSortPatternArray = [];

  for (let i = 0; i < 20; i++) {
    if (Math.abs(multiplierArray[i]) > 0) {
      for (let k = 0; k < multiplierArray[i]; k++) {
        qSortPatternArray.push(baseArray[i]);
      }
    }
  }
  return qSortPatternArray;
};

export default findMinValueInMultiplierArray;
