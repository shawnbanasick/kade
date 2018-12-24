import calcEigenCumulPercentArray from "../../../Factors/PcaLogic/calcEigenCumulPercentArray";

const parameter1 = [
  2.383773189005688,
  2.01532507454543,
  1.3408286262679792,
  1.1273546328374817,
  0.7322316184562889,
  0.5116923670933565,
  0.4013270245579843,
  0.31957480438566027,
  0.16789266285013338
];
const parameter2 = 9;

const testValue1 = [26, 22, 15, 13, 8, 6, 4, 4, 2];
const testValue2 = [26, 48, 63, 76, 84, 90, 94, 98, 100];

test("calc eigen cumulative percent array", () => {
  const value1 = calcEigenCumulPercentArray(parameter1, parameter2);
  expect(value1[0]).toEqual(testValue1);
  expect(value1[1]).toEqual(testValue2);
});
