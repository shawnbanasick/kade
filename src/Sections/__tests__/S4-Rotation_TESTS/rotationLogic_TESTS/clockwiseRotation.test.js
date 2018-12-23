import clockwiseRotation from "../../../S4-rotation/JudgementalRotation/rotationLogic/clockwiseRotation";

const parameter1 = [
  [-0.2913921, 0.54946489],
  [-0.38405309, 0.25842464],
  [0.36818255, 0.53279182],
  [0.33476604, 0.48828577],
  [-0.54873003, -0.55050616],
  [0.47844413, -0.25841561],
  [0.58270093, -0.27694738],
  [-0.5156279, 0.2516003],
  [0.00535119, 0.10235977]
];
const parameter2 = 10;
const parameter3 = 0;

const testValue1 = [
  [-0.19155, 0.59172],
  [-0.33334, 0.32119],
  [0.45511, 0.46076],
  [0.41447, 0.42274],
  [-0.63599, -0.44686],
  [0.4263, -0.33757],
  [0.52576, -0.37392],
  [-0.4641, 0.33732],
  [0.02304, 0.09988]
];

test("clockwise rotation", () => {
  let value1 = clockwiseRotation(parameter1, parameter2, parameter3);
  expect(value1).toEqual(testValue1);
  // expect(value1[1]).toEqual(testValue2);
});
