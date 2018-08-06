import XLSX from "xlsx";
import store from "../../../store";
// import { formatExcelType1ForDisplay } from "./formatExcelType1ForDisplay";

function parseExcelType1(excelFile) {
  const workbook = XLSX.readFile(excelFile, { type: "binary" });
  console.log(`workbook: ${JSON.stringify(workbook)}`);

  let tester, tester2, tester3, tester4;
  let tempArray = [];
  const allWorksheets = [];
  let worksheet;
  let hasSortsWorksheet = false;
  let hasStatementsWorksheet = false;
  const filetype = "user-input"; // EXCEL TYPE 1

  // iterate through every sheet and pull values
  const sheetNameList = workbook.SheetNames;

  try {
    sheetNameList.forEach(y => {
      y = y.toLowerCase();
      /* iterate through sheets */
      worksheet = workbook.Sheets[y];
      if (y === "sorts" || y === "qsorts" || y === "q-sorts") {
        hasSortsWorksheet = true;
        tester = XLSX.utils.sheet_to_csv(worksheet);
        tester2 = tester.split(/\n/);

        if (filetype === "user-input") {
          // max participants 200 artificial limit
          for (let i = 1; i < 200; i++) {
            tester3 = tester2[i].split(",");
            tempArray.push(tester3);
          }
        } else if (filetype === "unforced") {
          tester3 = tester2.filter(Boolean);
          tempArray.push(tester3);
        }
      } else if (y === "statements" || y === "statement") {
        hasStatementsWorksheet = true;
        tempArray = [];
        tester4 = XLSX.utils.sheet_to_json(worksheet);
        tempArray.push(tester4);
      }
      allWorksheets.push(tempArray);
    }); // end iteration of for each

    if (hasSortsWorksheet === false) {
      throw new Error("Can't find the 'sorts' worksheet!");
    }
    if (hasStatementsWorksheet === false) {
      throw new Error("Can't find the 'statements' worksheet!");
    }

    console.log(`allWorksheets: ${JSON.stringify(allWorksheets)}`);

    // formatExcelType1ForDisplay(allWorksheets);
    store.setState({ dataOrigin: "excel" });

    // manage error messages
  } catch (error) {
    // set error message
    store.setState({
      excelErrorMessage1: error.message,
      showExcelErrorModal: true
    });
  }
  // end reader on load

  //   reader.onabort = () => {
  //     console.log("file reading was aborted");
  //     store.setState({
  //       excelErrorMessage1: "The file reader aborted the load process!",
  //       showExcelErrorModal: true
  //     });
  //   };
  //   reader.onerror = () => {
  //     console.log("The file reader encountered an error");
  //     store.setState({
  //       excelErrorMessage1: "The file reader encountered an error!",
  //       showExcelErrorModal: true
  //     });
  //   };
}

export default parseExcelType1;
