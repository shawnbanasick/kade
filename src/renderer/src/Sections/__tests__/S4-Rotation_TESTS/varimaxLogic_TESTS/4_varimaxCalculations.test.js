import varimaxCalculations from "../../../Rotation/varimaxLogic/4_varimaxCalculations";

const parameter1 = [
  0.80127099,
  0.20016365,
  0.13140919,
  0.3204959,
  0.26018489,
  -0.07547152,
  0.08987012,
  0.14760858,
  0.03003675
];

const parameter2 = [
  -0.00096273,
  -0.12492795,
  0.01227656,
  0.12197242,
  0.36224263,
  0.14175846,
  -0.5021029,
  -0.08545494,
  0.06305365
];

const testValue1 = [
  [
    0.80119504,
    0.19857126,
    0.13155364,
    0.32200954,
    0.26473529,
    -0.07367667,
    0.08352696,
    0.14651848,
    0.03083003
  ],
  [
    -0.01107384,
    -0.12744385,
    0.01061734,
    0.11791839,
    0.35893053,
    0.14269954,
    -0.50319699,
    -0.0873108,
    0.0626696
  ]
];

test("varimax calculations", () => {
  const value1 = varimaxCalculations(parameter1, parameter2);
  expect(value1).toEqual(testValue1);
});
