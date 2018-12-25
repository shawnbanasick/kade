import XLSX from "xlsx";
import store from "../../../store";
import formatExcelType2ForDisplay from "./excelLogic/formatExcelType2ForDisplay";

function parseExcelType2(excelFile) {
  const workbook = XLSX.readFile(excelFile, { type: "binary" });

  let tester;
  let tester2;
  let tester3;
  let tester4;
  let tempArray = [];
  const allWorksheets = [];
  let worksheet;
  let hasSortsWorksheet = false;
  let hasStatementsWorksheet = false;
  const filetype = "unforced"; // EXCEL TYPE 1

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
          for (let i = 1; i < 200; i += 1) {
            tester3 = tester2[i].split(",");
            tempArray.push(tester3);
          }
        } else if (filetype === "unforced") {
          tester3 = tester2.filter(Boolean);
          tempArray.push(tester3);
        }
      } else if (y2 === "statements" || y2 === "statement") {
        hasStatementsWorksheet = true;
        tempArray = [];
        tester4 = XLSX.utils.sheet_to_json(worksheet);
        tempArray.push(tester4);
      }

      allWorksheets.push(tempArray);
    }); // end iteration of for each

    if (hasSortsWorksheet === false) {
      throw new Error("Can't find the 'sorts' worksheet tab!");
    }
    if (hasStatementsWorksheet === false) {
      throw new Error("Can't find the 'statements' worksheet tab!");
    }

    formatExcelType2ForDisplay(allWorksheets);
    store.setState({ dataOrigin: "excel" });
  } catch (error) {
    // set error message
    store.setState({
      excelErrorMessage1: error.message,
      showExcelErrorModal: true
    });
  }
}

export default parseExcelType2;
