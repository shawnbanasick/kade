// todo - refactor to add tests for B and C early returns

import getComparisonOfNumAndDen from "../../../S4-rotation/varimaxLogic/5_getComparisonOfNumAndDen";

// NUM 4 - D
const parameter1 = -1.3365725557720873;
const parameter2 = -1.06412277;
const testValue1 = -0.5318618;
const testValue2 = 0.84683086;
const testValue3 = false;

test("get comparison of num and den - 4", () => {
    let value1 = getComparisonOfNumAndDen(parameter1, parameter2);
    expect(value1[0]).toEqual(testValue1);
    expect(value1[1]).toEqual(testValue2);
    expect(value1[2]).toEqual(testValue3);
});


// NUM 1 - A
const parameter1a = -0.00009254836777061;
const parameter2a = 2.36094117;
const testValue1a = undefined;
const testValue2a = undefined;
const testValue3a = true;

test("get comparison of num and den - 1", () => {
    let value1 = getComparisonOfNumAndDen(parameter1a, parameter2a);
    expect(value1[0]).toEqual(testValue1a);
    expect(value1[1]).toEqual(testValue2a);
    expect(value1[2]).toEqual(testValue3a);
});

