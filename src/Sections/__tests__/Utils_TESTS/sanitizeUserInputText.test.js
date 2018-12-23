// run tests with terminal command: npx luna unitTests

import sanitizeUserInputText from "../../Utils/sanitizeUserInputText";

// const x = "<abc>";
const y = "<abc>";
const z = 202;

// const testValue1 = "abc";
const testValue2 = "";
const testValue3 = 202;

test("sanitize user input", () => {
  // let value1 = sanitizeUserInputText(x);
  let value2 = sanitizeUserInputText(y);
  let value3 = sanitizeUserInputText(z);

  // expect(value1).toEqual(testValue1);
  expect(value2).toEqual(testValue2);
  expect(value3).toEqual(testValue3);
});
