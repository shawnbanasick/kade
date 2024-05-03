import calcCosDegrees from "../../../Rotation/JudgementalRotation/rotationLogic/calcCosDegrees";

const parameter1 = 10;

const testValue1 = 0.984807753012208;

test("calc cosine degrees", () => {
  const value1 = calcCosDegrees(parameter1);
  expect(value1).toEqual(testValue1);
});
