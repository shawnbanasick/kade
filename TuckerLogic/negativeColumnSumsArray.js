import checkForNegativeColSums from '../../../Factors/centroidLogic/tuckerLogic/checkForNegativeColSums';

const parameter1 = [-0.075,0.041,0.002,-0.051,0.055,-0.052,0.017,0.041,0.024] ;

const testValue1 = [0,3,5];


test("get col sums from matrix", () => {
  const value1 = checkForNegativeColSums(parameter1);
  expect(value1).toEqual(testValue1);
});
