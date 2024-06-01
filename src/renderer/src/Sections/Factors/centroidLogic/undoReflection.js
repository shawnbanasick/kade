const undoReflection = (subtractedArray2, factorLoadings2, reflectedRowCol) => {
  // eslint re-assignments
  const subtractedArray = subtractedArray2.slice();
  const factorLoadings = factorLoadings2.slice();

  reflectedRowCol.forEach((rowcolnumber) => {
    for (let i = 0; i < subtractedArray.length; i += 1) {
      subtractedArray[i][rowcolnumber] = -subtractedArray[i][rowcolnumber];
    }
    for (let j = 0; j < subtractedArray[rowcolnumber].length; j += 1) {
      subtractedArray[rowcolnumber][j] = -subtractedArray[rowcolnumber][j];
    }
    factorLoadings[rowcolnumber] = -factorLoadings[rowcolnumber];
  }, this);
  const factorResults = [subtractedArray, factorLoadings];
  return factorResults;
};

export default undoReflection;
