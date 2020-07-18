const checkForNegativeColSums = array => {
  const negativesArray = array
  .map((a, i) => a < 0 ? i : -1)
  .filter(a => a !== -1);
  return negativesArray;
};

export default checkForNegativeColSums;
