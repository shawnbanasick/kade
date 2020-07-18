// run tests with terminal command: npx luna unitTests

import evenRound from "../../../Utils/evenRound";

const x = 1.0009;
const y = 0.123456789;
const z = 0.123456789;

const testValue1 = 1.001;
const testValue2 = 0.123;
const testValue3 = 0.12346;

test("even round", () => {
  let value1 = evenRound(x, 3);
  let value2 = evenRound(y, 3);
  let value3 = evenRound(z, 5);

  expect(value1).toEqual(testValue1);
  expect(value2).toEqual(testValue2);
  expect(value3).toEqual(testValue3);
});
