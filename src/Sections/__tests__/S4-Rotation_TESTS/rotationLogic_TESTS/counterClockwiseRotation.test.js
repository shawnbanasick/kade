import counterClockwiseRotation from "../../../S4-rotation/JudgementalRotation/rotationLogic/counterClockwiseRotation";

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
  [-0.38238, 0.49052],
  [-0.42309, 0.18781],
  [0.27007, 0.58863],
  [0.24489, 0.539],
  [-0.4448, -0.63743],
  [0.51605, -0.17141],
  [0.62194, -0.17155],
  [-0.55148, 0.15824],
  [-0.0125, 0.10173]
];

test("counter clockwise rotation", () => {
  let value1 = counterClockwiseRotation(parameter1, parameter2, parameter3);
  expect(value1).toEqual(testValue1);
  // expect(value1[1]).toEqual(testValue2);
});
