import calcCoeffLValue from '../../../Factors/centroidLogic/tuckerLogic/calcCoeffLValue';

const parameter1 = 9.86;
const parameter2 = [0.263,0.286,0.121,0.292,0.292,0.267,0.23,0.135,0.122];
const parameter3 = 9.144;

const testValue1 = 0.8587;


test("calcCoeffLValue", () => {
  const value1 = calcCoeffLValue(parameter1, parameter2, parameter3);
  expect(value1).toEqual(testValue1);
});
