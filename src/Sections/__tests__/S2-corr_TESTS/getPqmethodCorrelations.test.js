// run tests with terminal command: npx luna unitTests

import { getPqmethodCorrelation } from "../../S2-corr/corrLogic/getPqmethodCorrelation";

const x = [
  3,
  1,
  -3,
  -1,
  -1,
  3,
  -3,
  -2,
  0,
  -4,
  -1,
  0,
  3,
  -2,
  -3,
  -4,
  -1,
  2,
  4,
  -2,
  4,
  1,
  1,
  -2,
  0,
  1,
  -1,
  2,
  0,
  2,
  1,
  2,
  0
];
const y = [
  3,
  1,
  0,
  1,
  -4,
  -3,
  2,
  2,
  -2,
  0,
  0,
  -2,
  1,
  4,
  -1,
  -2,
  2,
  -1,
  2,
  1,
  3,
  -3,
  -3,
  -2,
  1,
  0,
  -1,
  -4,
  0,
  -1,
  3,
  -1,
  4
];

const testValue = 0.025;

test("calc pearson correlation", () => {
  let correlation = getPqmethodCorrelation(x, y);
  // let correlationValue = correlation[0];
  expect(correlation[0]).toEqual(testValue);
});

// export function test_getPqmethodCorrelation(t) {
//     let correlation = getPqmethodCorrelation(x, y);
//     t.assert(correlation[0] === testValue);
