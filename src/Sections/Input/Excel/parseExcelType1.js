import XLSX from "xlsx";
import state from "../../../store";
import formatExcelType1ForDisplay from "./excelLogic/formatExcelType1ForDisplay";
import throwNoSortsInputErrorModal from "../throwNoSortsInputError";
import throwNoSortsTabInputErrorModal from "../throwNoSortsTabInputErrorModal";
import throwNoStatementsInputErrorModal from "../throwNoStatementsInputErrorModal";
import throwNoStatementsTabInputErrorModal from "../throwNoStatementsTabInputErrorModal";

function parseExcelType1(excelFile) {
  const workbook = XLSX.readFile(excelFile, {
    type: "binary"
  });

  let tester;
  let tester2;
  let tester3;
  let tester4;
  let tempArray = [];
  const allWorksheets = [];
  let worksheet;
  let hasSortsWorksheet = false;
  let hasStatementsWorksheet = false;
  let isNoError = true;
  const filetype = "user-input"; // EXCEL TYPE 1

  // iterate through every sheet and pull values
  const sheetNameList = workbook.SheetNames;

  try {
    sheetNameList.forEach(y => {
      const y2 = y.toLowerCase();
      /* iterate through sheets */
      worksheet = workbook.Sheets[y];
      if (y2 === "sorts" || y2 === "qsorts" || y2 === "q-sorts") {
        hasSortsWorksheet = true;
        tester = XLSX.utils.sheet_to_csv(worksheet);
        tester2 = tester.split(/\n/);

        if (filetype === "user-input") {
          // max participants 200 artificial limit
          for (let i = 1; i < 200; i += 1) {
            tester3 = tester2[i].split(",");
            tempArray.push(tester3);
          }
          const checkValuesArray = tempArray[0].slice();
          // remove sort value
          checkValuesArray.shift();
          // helper
          const add = (a, b) => +a + +b;
          // sum array, if empty (no sort), will sum to zero
          const checkValuesArrayTotal = checkValuesArray.reduce(add);
          if (checkValuesArrayTotal === 0) {
            throwNoSortsInputErrorModal();
            isNoError = false;
          }
        } else if (filetype === "unforced") {
          tester3 = tester2.filter(Boolean);
          // convert to array
          // const checkValuesArray = tester3[6].split(",").map(Number);

          tempArray.push(tester3);
        }
      } else if (y2 === "statements" || y2 === "statement") {
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

    formatExcelType1ForDisplay(allWorksheets);
    if (isNoError) {
      state.setState({
        dataOrigin: "excel",
        notifyDataUploadSuccess: true,
        isInputButtonGreen: true,
        isDataButtonGreen: true
      });
      // button won't green without timeout
      setTimeout(() => {
        state.setState({ isLoadExcelT1ButtonGreen: true });
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
