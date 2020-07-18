import formatScreePlotData from '../../../Factors/centroidLogic/horst55Logic/formatScreePlotData';


const parameter1 = [2.124,1.5742,1.5548,1.0322,0.3691,0.6264,0.2407];

const testValue1 = [[1,2.124],[2,1.5742],[3,1.5548],[4,1.0322],[5,0.3691],[6,0.6264],[7,0.2407]];


test("format Scree Plot Data", () => {
    const value1 = formatScreePlotData(parameter1);
    expect(value1).toEqual(testValue1);
  });
  