import checkUniqueParticipantName from "../../Input/logic/checkUniqueParticipantNames";

const parameter1 = [
  "US1",
  "US2",
  "US3",
  "US4",
  "JP5",
  "CA6",
  "UK7",
  "US8",
  "FR9"
];
const parameter2 = [
  "US1",
  "US2",
  "US3",
  "US4",
  "JP5",
  "CA6",
  "UK7",
  "UK7",
  "UK7"
];

const testValue1 = [
  "US1",
  "US2",
  "US3",
  "US4",
  "JP5",
  "CA6",
  "UK7",
  "US8",
  "FR9"
];
const testValue2 = [
  "1_US1",
  "2_US2",
  "3_US3",
  "4_US4",
  "5_JP5",
  "6_CA6",
  "7_UK7",
  "8_UK7",
  "9_UK7"
];

test("check unique participant names", () => {
  const value1 = checkUniqueParticipantName(parameter1);
  const value2 = checkUniqueParticipantName(parameter2);

  expect(value1).toEqual(testValue1);
  expect(value2).toEqual(testValue2);
});
