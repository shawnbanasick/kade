import calcFactorArray from '../../../Factors/centroidLogic/tuckerLogic/calcFactorArray';

const parameter1 = 5.058;
const parameter2 = [2.368,2.556,3.157,2.724,3.089,2.946,2.577,3.099,3.072];


const testValue1 = [0.468,0.505,0.624,0.539,0.611,0.582,0.509,0.613,0.607];


test("calc Factor Array", () => {
  const value1 = calcFactorArray(parameter1, parameter2);
  expect(value1).toEqual(testValue1);
});
