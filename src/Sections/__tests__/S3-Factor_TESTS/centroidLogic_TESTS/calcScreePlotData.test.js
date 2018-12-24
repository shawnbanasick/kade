import calcScreePlotData from "../../../Factors/centroidLogic/calcScreePlotData";

const parameter1 = [
  "Eigenvalues",
  1.6155,
  1.4113,
  0.8401,
  0.5535,
  0.3844,
  0.1831,
  0.2783
];

const testValue1 = [
  [1, 1.6155],
  [2, 1.4113],
  [3, 0.8401],
  [4, 0.5535],
  [5, 0.3844],
  [6, 0.1831],
  [7, 0.2783]
];

test("calc scree plot data", () => {
  const value1 = calcScreePlotData(parameter1);
  expect(value1).toEqual(testValue1);
});
