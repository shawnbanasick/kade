import parseArrayPQM from "../../../Input/logic/parseArrayPQM";

const parameter1 =
  "-1 0-2 0-2 1 0-1 0-1 1 1 2 3-1-4-3-3-1-4 3 2 3 1 1 0 4 2 2-3-2-2 4";
const parameter2 = 33;

const testValue1 = [
  -1,
  0,
  -2,
  0,
  -2,
  1,
  0,
  -1,
  0,
  -1,
  1,
  1,
  2,
  3,
  -1,
  -4,
  -3,
  -3,
  -1,
  -4,
  3,
  2,
  3,
  1,
  1,
  0,
  4,
  2,
  2,
  -3,
  -2,
  -2,
  4
];

test("parse array pqm", () => {
  const value1 = parseArrayPQM(parameter1, parameter2);
  expect(value1).toEqual(testValue1);
});
