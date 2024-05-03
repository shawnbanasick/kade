const calcQsortPatternArray = (multiplierArray: number[]) => {
  const patternArray: number[] = [];

  const values: number[] = [
    -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
  ];

  values.forEach((element, index) => {
    for (let i = 0; i < multiplierArray[index]; i++) {
      patternArray.push(element);
    }
  });
  return patternArray;
};

export default calcQsortPatternArray;
