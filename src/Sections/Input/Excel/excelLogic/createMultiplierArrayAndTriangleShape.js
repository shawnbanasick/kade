export default function createMultiplierArrayAndTriangleShape(inputData1) {
  const qavSortTriangleShape = [];
  const multiplierArray = [];
  for (let i = 4; i < 24; i += 1) {
    const testValue = +inputData1[i][1];
    if (testValue < 1 || isNaN(testValue)) {
      multiplierArray.push(0);
    } else {
      const multiplier = +inputData1[i][1];
      multiplierArray.push(multiplier);
      const sortValue = +inputData1[i][0];
      for (let j = 0, jLen = multiplier; j < jLen; j += 1) {
        qavSortTriangleShape.push(sortValue);
      }
    }
  }
  return [multiplierArray, qavSortTriangleShape];
}
