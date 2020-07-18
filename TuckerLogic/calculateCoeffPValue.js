import calculateCoeffPValue from '../../../Factors/centroidLogic/tuckerLogic/calculateCoeffPValue';

const parameter1 = [2.368,2.556,3.157,2.724,3.089,2.946,2.577,3.099,3.072];

const testValue1 = 25.588 


test("calculate Coeff P Value", () => {
  const value1 = calculateCoeffPValue(parameter1);
  expect(value1).toEqual(testValue1);
});
