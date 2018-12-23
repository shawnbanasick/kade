import calculateMinValueAndIndex from "../../../S3-factor/centroidLogic/calculateMinValueAndIndex";

const parameter1 = [
  0.8125,
  0.9875,
  0.14375,
  0.675,
  -1.0375,
  0.0875,
  -0.09375,
  -0.26875,
  -0.23125
];

const testValue1 = [-1.0375, 4];

test("calculate min value and index", () => {
  let value1 = calculateMinValueAndIndex(parameter1);
  expect(value1).toEqual(testValue1);
});
