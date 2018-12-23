import { getRespondentNamesExcelT1 } from "../../../Input/logic/excelLogic/getRespondentNamesExcelT1";

const parameter1 = [
  {
    sortValue: "Sort Value",
    statementNum: "US1"
  },
  {
    sortValue: "Sort Value",
    statementNum: "US2"
  },
  {
    sortValue: "Sort Value",
    statementNum: "US3"
  },
  {
    sortValue: "Sort Value",
    statementNum: "US4"
  },
  {
    sortValue: "Sort Value",
    statementNum: "JP5"
  },
  {
    sortValue: "Sort Value",
    statementNum: "CA6"
  },
  {
    sortValue: "Sort Value",
    statementNum: "UK7"
  },
  {
    sortValue: "Sort Value",
    statementNum: "US8"
  },
  {
    sortValue: "Sort Value",
    statementNum: "FR9"
  }
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

test("", () => {
  const value1 = getRespondentNamesExcelT1(parameter1);
  expect(value1).toEqual(testValue1);
});
