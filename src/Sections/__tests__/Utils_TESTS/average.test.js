import average from "../../Utils/average";

const x = [2, 2, 6, 6];
const y = [5, 5];

const testValue1 = 4;
const testValue2 = 5;

let average1 = average(x);
let average2 = average(y);

test("average", () => {
  expect(average1).toEqual(testValue1);
  expect(average2).toEqual(testValue2);
});
