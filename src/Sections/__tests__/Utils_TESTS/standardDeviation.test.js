import standardDeviation from "../../../Utils/standardDeviation";

const x = [1, 2, 3, 2, 1, 2, 3, 4];

const testValue1 = 1.03509834;

test("standard deviation", () => {
  let value1 = standardDeviation(x);

  expect(value1).toEqual(testValue1);
});
