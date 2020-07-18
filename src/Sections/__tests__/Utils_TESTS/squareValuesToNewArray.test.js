import squareValuesToNewArray from "../../../Utils/squareValuesToNewArray";

const parameter1 = [
  -0.2913921,
  -0.38405309,
  0.36818255,
  0.33476604,
  -0.54873003,
  0.47844413,
  0.58270093,
  -0.5156279,
  0.00535119
];
const testValue1 = [
  0.08490936,
  0.14749678,
  0.13555839,
  0.1120683,
  0.30110465,
  0.22890879,
  0.33954037,
  0.26587213,
  0.00002864
];

test("square values to new array", () => {
  let value1 = squareValuesToNewArray(parameter1);
  expect(value1).toEqual(testValue1);
});
