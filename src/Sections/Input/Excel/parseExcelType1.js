import XLSX from "xlsx";
import state from "../../../store";
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

function parseExcelType1(excelFile) {
  const workbook = XLSX.readFile(excelFile, {
    type: "binary"
  });

  let tester;
  let tester2;
  let tester3;
  let tester4;
  const allWorksheets = [];
  let tempArray = [];
  let worksheet;
  let hasSortsWorksheet = false;
  let hasStatementsWorksheet = false;
  let isNoError = true;
  // const filetype = "user-input"; // EXCEL TYPE 1

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
        tempArray = [];
        console.log(`1. Q sorts worksheet found`);
        hasSortsWorksheet = true;
        tester = XLSX.utils.sheet_to_csv(worksheet);
        tester2 = tester.split(/\n/);

        // max statement number 500 artificial limit
        for (let i = 1; i < tester2.length; i += 1) {
          tester3 = tester2[i].split(",");
          tempArray.push(tester3);

          // emergency break
          if (i > 500) {
            break;
          }
        }
      }

      if (y2 === "statements" || y2 === "statement") {
        console.log(`2. Statements worksheet found`);
        hasStatementsWorksheet = true;
        tempArray = [];
        tester4 = XLSX.utils.sheet_to_json(worksheet);
        const testValue = Object.prototype.hasOwnProperty.call(
          tester4[0],
          "Statements"
        );
        if (!testValue) {
          throwNoStatementsInputErrorModal();
          isNoError = false;
        }
        tempArray.push(tester4);
      }
      allWorksheets.push(tempArray);
    }); // end iteration of for each

    if (hasSortsWorksheet === false) {
      throwNoSortsTabInputErrorModal();
      isNoError = false;
    }
    if (hasStatementsWorksheet === false) {
      throwNoStatementsTabInputErrorModal();
      isNoError = false;
    }

    const finalErrorCheck = formatExcelType1ForDisplay(allWorksheets);

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

    if (isNoError && finalErrorCheck !== true) {
      state.setState({
        dataOrigin: "excel",
        notifyDataUploadSuccess: true,
        isInputButtonGreen: true,
        isDataButtonGreen: true
      });
      // button won't go green without timeout
      setTimeout(() => {
        state.setState({
          isLoadExcelT1ButtonGreen: true
        });
      }, 100);
    }

    // manage error messages
  } catch (error) {
    // set error message
    state.setState({
      excelErrorMessage1: error.message,
      showExcelErrorModal: true
    });
  }
}

export default parseExcelType1;
