import XLSX from "xlsx";
import throwNoSortsInputErrorModal from "../throwNoSortsInputError";
import numStatementsMatchErrorModal from "../numStatementsMatchErrorModal";
import throwNoSortsTabInputErrorModal from "../throwNoSortsTabInputErrorModal";
import formatExcelType1ForDisplay from "./excelLogic/formatExcelType1ForDisplay";
import headersDontMatchSortsErrorModal from "../headersDontMatchSortsErrorModal";
import throwNoStatementsInputErrorModal from "../throwNoStatementsInputErrorModal";
import throwExcelT1RangeErrorModal from "./excelLogic/throwExcelT1RangeErrorModal";
import throwNoSortDesignPatternErrorModal from "../throwNoSortDesignPatternErrorModal";
import throwNoStatementsTabInputErrorModal from "../throwNoStatementsTabInputErrorModal";
import hasDuplicateStatementNumbersErrorModal from "../hasDuplicateStatementNumbersErrorModal";
import throwExcelT1MissingStatementNumberError from "../throwExcelT1MissingStatementNumberError";

import inputState from "../../GlobalState/inputState";
import appState from "../../GlobalState/appState";

function parseExcelType1(excelFile) {
  const workbook = XLSX.readFile(excelFile, {
    type: "binary"
  });

  let tester;
  let tester2;
  let tester3;
  let tester4;
  const rawSortsData = [];
  const rawStatementsData = [];
  let worksheet;
  let hasSortsWorksheet = false;
  let hasStatementsWorksheet = false;
  let isNoError = true;

  // iterate through every sheet and pull values
  const sheetNameList = workbook.SheetNames;

  try {
    sheetNameList.forEach(y => {
      const y2 = y.toLowerCase();
      worksheet = workbook.Sheets[y];
      /* iterate through sheets */
      if (y2 === "guide") {
        console.log("found guide page");
      }

      if (y2 === "sorts" || y2 === "qsorts" || y2 === "q-sorts") {
        console.log(`1. Q sorts worksheet found`);
        hasSortsWorksheet = true;
        tester = XLSX.utils.sheet_to_csv(worksheet);
        tester2 = tester.split(/\n/);

        // max statement number 500 artificial limit
        for (let i = 1; i < tester2.length; i += 1) {
          tester3 = tester2[i].split(",");
          rawSortsData.push(tester3);

          // emergency break
          if (i > 500) {
            break;
          }
        }
      }

      if (y2 === "statements" || y2 === "statement") {
        console.log(`2. Statements worksheet found`);
        hasStatementsWorksheet = true;
        tester4 = XLSX.utils.sheet_to_json(worksheet);
        const testValue = Object.prototype.hasOwnProperty.call(
          tester4[0],
          "Statements"
        );
        if (!testValue) {
          throwNoStatementsInputErrorModal();
          isNoError = false;
        }
        rawStatementsData.push(tester4);
      }
    }); // end iteration of for each

    if (hasSortsWorksheet === false) {
      throwNoSortsTabInputErrorModal();
      isNoError = false;
    }
    if (hasStatementsWorksheet === false) {
      throwNoStatementsTabInputErrorModal();
      isNoError = false;
    }

    const finalErrorCheck = formatExcelType1ForDisplay(
      rawStatementsData,
      rawSortsData
    );

    // out of range values
    if (finalErrorCheck[0]) {
      throwExcelT1RangeErrorModal();
      isNoError = false;
    }

    // no sorts
    if (finalErrorCheck[1]) {
      throwNoSortsInputErrorModal();
      isNoError = false;
    }

    // no sort design pattern
    if (finalErrorCheck[2]) {
      throwNoSortDesignPatternErrorModal();
      isNoError = false;
    }

    // duplicate statement numbers
    if (finalErrorCheck[3]) {
      hasDuplicateStatementNumbersErrorModal();
      isNoError = false;
    }

    // no header match error
    if (finalErrorCheck[4]) {
      headersDontMatchSortsErrorModal();
      isNoError = false;
    }

    // num statements doesnt match number sort values in Q sort pattern
    if (finalErrorCheck[5]) {
      numStatementsMatchErrorModal();
      isNoError = false;
    }

    // missing statement number(s)
    if (finalErrorCheck[6]) {
      throwExcelT1MissingStatementNumberError();
      isNoError = false;
    }

    if (isNoError && finalErrorCheck !== true) {
      inputState.dataOrigin = "excel";
      inputState.notifyDataUploadSuccess = true;
      inputState.areQsortsLoaded = true;
      inputState.sortsLoaded = true;
      appState.isInputButtonGreen = true;
      appState.isDataButtonGreen = true;
      // button won't go green without timeout
      setTimeout(() => {
        inputState.isLoadExcelT1ButtonGreen = true;
      }, 100);
    }

    // manage error messages
  } catch (error) {
    // set error message
    inputState.excelErrorMessage1 = error.message;
    inputState.showExcelErrorModal = true;
  }
}

export default parseExcelType1;
