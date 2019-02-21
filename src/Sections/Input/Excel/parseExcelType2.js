import XLSX from "xlsx";
import state from "../../../store";
// import throwNoSortsInputErrorModal from '../throwNoSortsInputError';
import throwNoSortsTabInputErrorModal from '../throwNoSortsTabInputErrorModal';
import formatExcelType2ForDisplay from "./excelLogic/formatExcelType2ForDisplay";
import throwNoStatementsInputErrorModal from '../throwNoStatementsInputErrorModal';
import throwNoStatementsTabInputErrorModal from '../throwNoStatementsTabInputErrorModal';

function parseExcelType2(excelFile) {
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
  let hasSortsWorksheet = "false";
  let hasStatementsWorksheet = "false";
  const filetype = "unforced"; // EXCEL TYPE 1

  // iterate through every sheet and pull values
  const sheetNameList = workbook.SheetNames;

  try {
    sheetNameList.forEach(y => {
      const y2 = y.toLowerCase();
      /* iterate through sheets */
      worksheet = workbook.Sheets[y];
      if (y2 === "sorts" || y2 === "qsorts" || y2 === "q-sorts") {
        hasSortsWorksheet = "true";
        tester = XLSX.utils.sheet_to_csv(worksheet);
        tester2 = tester.split(/\n/);

        if (filetype === "user-input") {
          for (let i = 1; i < 1000; i += 1) {
            tester3 = tester2[i].split(",");
            console.log(JSON.stringify(tester3[0]));
            tempArray.push(tester3);
          }
        } else if (filetype === "unforced") {
          tester3 = tester2.filter(Boolean);
          // const value4 = tester3.split(",");
          // console.log(JSON.stringify(value4[1]));
          // console.log(JSON.stringify(value4[1].length));
          console.log(JSON.stringify(tester3[6].length));
          console.log(JSON.stringify(tester3[6]));
          tempArray.push(tester3);
        }
      } else if (y2 === "statements" || y2 === "statement") {
        hasStatementsWorksheet = "true";
        tempArray = [];
        tester4 = XLSX.utils.sheet_to_json(worksheet);
        const testValue = Object.prototype.hasOwnProperty.call(tester4[0], 'Statements');
        if (!testValue) {
          throwNoStatementsInputErrorModal();
          return;
        }
        tempArray.push(tester4);
      }
      allWorksheets.push(tempArray);
    }); // end iteration of for each

    if (hasSortsWorksheet === "false") {
      throwNoSortsTabInputErrorModal();
      return;
    }

    if (hasStatementsWorksheet === "false") {
      throwNoStatementsTabInputErrorModal();
      return;
    }
    // push to DOM
    formatExcelType2ForDisplay(allWorksheets);
    // no errors ==> state updates
    state.setState({
      dataOrigin: "excel",
      notifyDataUploadSuccess: true,
      isInputButtonGreen: true,
      isLoadExcelT2ButtonGreen: true
    });
  } catch (error) {
    // set unexpected error message and show modal
    state.setState({
      excelErrorMessage1: error.message,
      showExcelErrorModal: true
    });
  }
}

export default parseExcelType2;
