import variance from "../../../Utils/variance";

const parameter1 = [-1.331, 0.416, 2.039];
const parameter2 = [];

const testValue1 = 1.893671;
const testValue2 = 0;

test("", () => {
    let value1 = variance(parameter1);
    let value2 = variance(parameter2);

    expect(value1).toEqual(testValue1);
    expect(value2).toEqual(testValue2);
});



