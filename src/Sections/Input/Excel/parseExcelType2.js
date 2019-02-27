import XLSX from "xlsx";
import state from "../../../store";
import throwNoSortsInputErrorModal from "../throwNoSortsInputError";
import numStatementsMatchErrorModal from "../numStatementsMatchErrorModal";
import throwNoSortsTabInputErrorModal from "../throwNoSortsTabInputErrorModal";
import formatExcelType2ForDisplay from "./excelLogic/formatExcelType2ForDisplay";
import throwNoStatementsInputErrorModal from "../throwNoStatementsInputErrorModal";
import throwNoStatementsTabInputErrorModal from "../throwNoStatementsTabInputErrorModal";
import throwNoSortDesignPatternErrorModal from "../throwNoSortDesignPatternErrorModal";

function parseExcelType2(excelFile) {
  const workbook = XLSX.readFile(excelFile, {
    type: "binary"
  });

  let tester;
  let tester2;
  let tester3;
  let tester4;
  const rawSortsData = [];
  const rawStatementsData = [];
  // let tempArray = [];
  let worksheet;
  let hasSortsWorksheet = false;
  let hasStatementsWorksheet = false;
  let isNoError = true;

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

        // filter unneeded values
        tester3 = tester2.filter(Boolean);
        // convert to array
        const checkValuesArray = tester3[6].split(",").map(Number);
        // remove participant name
        checkValuesArray.shift();
        // helper
        const add = (a, b) => Math.abs(a) + Math.abs(b);
        // sum array, if empty (no sort), will sum to zero
        const checkValuesArrayTotal = checkValuesArray.reduce(add);
        if (checkValuesArrayTotal === 0) {
          throwNoSortsInputErrorModal();
          isNoError = false;
        }
        rawSortsData.push(tester3);
      } else if (y2 === "statements" || y2 === "statement") {
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

    // do final checks and push to DOM
    const finalErrorCheck = formatExcelType2ForDisplay(
      rawStatementsData,
      rawSortsData
    );

    // no sort design
    if (finalErrorCheck[0]) {
      throwNoSortDesignPatternErrorModal();
      isNoError = false;
    }

    // statement number doesnt match
    if (finalErrorCheck[1]) {
      numStatementsMatchErrorModal();
      isNoError = false;
    }

    if (hasSortsWorksheet === false) {
      throwNoSortsTabInputErrorModal();
      isNoError = false;
    }

    if (hasStatementsWorksheet === false) {
      throwNoStatementsTabInputErrorModal();
      isNoError = false;
    }
    // no errors ==> state updates
    if (isNoError) {
      state.setState({
        dataOrigin: "excel",
        notifyDataUploadSuccess: true,
        isInputButtonGreen: true,
        isDataButtonGreen: true
      });
      // button won't green without timeout
      setTimeout(() => {
        state.setState({
          isLoadExcelT2ButtonGreen: true
        });
      }, 100);
    }
  } catch (error) {
    // set unexpected error message and show modal
    state.setState({
      excelErrorMessage1: error.message,
      showExcelErrorModal: true
    });
  }
}

export default parseExcelType2;
