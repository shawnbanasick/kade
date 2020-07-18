import calculateQPrimeArray from '../../../Factors/centroidLogic/tuckerLogic/calculateQPrimeArray';

const parameter1 = [0.499,0.499,0.436,0.621,0.623,0.623,0.467,0.489,0.489]; 
const parameter2 = [1.869,2.057,2.721,2.103,2.466,2.323,2.11,2.61,2.583]; 

const testValue1 = [2.368,2.556,3.157,2.724,3.089,2.946,2.577,3.099,3.072]; 


test("calculate Q prime array", () => {
  const value1 = calculateQPrimeArray(parameter1, parameter2);
  expect(value1).toEqual(testValue1);
});
