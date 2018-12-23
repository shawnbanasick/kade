import calcCosDegrees from "../../../S4-rotation/JudgementalRotation/rotationLogic/calcCosDegrees";

const parameter1 = 10;

const testValue1 = 0.984807753012208;

test("calc cosine degrees", () => {
  let value1 = calcCosDegrees(parameter1);
  expect(value1).toEqual(testValue1);
});
