import calcSinDegrees from "../../../Rotation/JudgementalRotation/rotationLogic/calcSinDegrees";

const parameter1 = 10;

const testValue1 = 0.17364817766693033;

test("calc sin degrees", () => {
  const value1 = calcSinDegrees(parameter1);
  expect(value1).toEqual(testValue1);
  // expect(value1[1]).toEqual(testValue2);
});
