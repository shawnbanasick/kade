import calcNewDandS from '../../../Factors/centroidLogic/horst55Logic/calcNewDandS';

const parameter1 = [0.0017146,0.0001424,-0.0034755,-0.003067,-0.008257,-0.0043579,0.0022833,0.0001427,-0.0014515]; 
const parameter2 = [0.8263494,0.9769545,1,0.5686151,1,0.9096792,0.4806774,0.7428765,1]; 

const testValue1 = {"D":[0.8246348,0.9768121,1,0.5716821,1,0.9140371,0.4783941,0.7427338,1],"S":0.008257,"U":[0.8246348,0.9768121,1,0.5716821,1,0.9140371,0.4783941,0.7427338,1]}; 

test("calc New D and S", () => {
    const value1 = calcNewDandS(parameter1, parameter2);
    expect(value1).toEqual(testValue1);
});
