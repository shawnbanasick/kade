import sumArrayValues from "../../Utils/sumArrayValues";

const parameter1 = [0.08490936, 0.14749678, 0.13555839, 0.1120683, 0.30110465, 0.22890879, 0.33954037, 0.26587213, 0.00002864];

const testValue1 = 1.61548741;

test("sum array values", () => {
    let value1 = sumArrayValues(parameter1);
    expect(value1).toEqual(testValue1);
});


