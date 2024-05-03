function calcPatternArray(multiplierArray) {
  const labelArray = [
    "-6",
    "-5",
    "-4",
    "-3",
    "-2",
    "-1",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13"
  ];
  const patternArray = [];
  for (let i = 0; i < labelArray.length; i += 1) {
    const indexer = multiplierArray[i];
    if (indexer !== 0) {
      const text = `${labelArray[i]} column: ${multiplierArray[i]} cards`;
      patternArray.push(text);
    }
  }
  return patternArray;
}

export default calcPatternArray;
