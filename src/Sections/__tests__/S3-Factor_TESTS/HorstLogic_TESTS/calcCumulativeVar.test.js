import calcCumulativeVar from '../../../Factors/centroidLogic/horst55Logic/calcCumulativeVar';

const parameter1 = [24,17,17,11,4,7,3];

const testValue1 = [24,41,58,69,73,80,83];


test("calc Cumulative Var", () => {
    const value1 = calcCumulativeVar(parameter1);
    expect(value1).toEqual(testValue1);
  });
  