import calculateFactorLoadingSignificanceLevel from "../../../S4-rotation/varimaxLogic/3_calculateFactorLoadingSignificanceLevel";

const parameter1 = 33;

const testValue1 = 0.34119;

test("calculate factor loading significance levels", () => {
  let value1 = calculateFactorLoadingSignificanceLevel(parameter1);
  expect(value1).toEqual(testValue1);
});
