import { sortsDisplayText } from "../../../S1-data/UploadFile/uploadLogic/sortsDisplayText";

const parameter1 = [
  {
    name: "US1     ",
    posShiftSort: [
      4,
      5,
      3,
      5,
      3,
      6,
      5,
      4,
      5,
      4,
      6,
      6,
      7,
      8,
      4,
      1,
      2,
      2,
      4,
      1,
      8,
      7,
      8,
      6,
      6,
      5,
      9,
      7,
      7,
      2,
      3,
      3,
      9
    ],
    rawSort: [
      -1,
      0,
      -2,
      0,
      -2,
      1,
      0,
      -1,
      0,
      -1,
      1,
      1,
      2,
      3,
      -1,
      -4,
      -3,
      -3,
      -1,
      -4,
      3,
      2,
      3,
      1,
      1,
      0,
      4,
      2,
      2,
      -3,
      -2,
      -2,
      4
    ],
    displaySort:
      "-1,0,-2,0,-2,1,0,-1,0,-1,1,1,2,3,-1,-4,-3,-3,-1,-4,3,2,3,1,1,0,4,2,2,-3,-2,-2,4"
  }
];

const testValue1 =
  "US1     : -1,0,-2,0,-2,1,0,-1,0,-1,1,1,2,3,-1,-4,-3,-3,-1,-4,3,2,3,1,1,0,4,2,2,-3,-2,-2,4";

test("sorts display text", () => {
  let value1 = sortsDisplayText(parameter1);
  expect(value1[0]).toEqual(testValue1);
});
