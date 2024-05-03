import XLSX from "xlsx";
import throwNoSortsInputErrorModal from "../ErrorChecking/throwNoSortsInputError";
import numStatementsMatchErrorModal from "../ErrorChecking/numStatementsMatchErrorModal";
import throwNoSortsTabInputErrorModal from "../ErrorChecking/throwNoSortsTabInputErrorModal";
import formatExcelType1ForDisplay from "./excelLogic/formatExcelType1ForDisplay";
import headersDontMatchSortsErrorModal from "../ErrorChecking/headersDontMatchSortsErrorModal";
import throwNoStatementsInputErrorModal from "../ErrorChecking/throwNoStatementsInputErrorModal";
import throwExcelT1RangeErrorModal from "./excelLogic/throwExcelT1RangeErrorModal";
import throwNoSortDesignPatternErrorModal from "../ErrorChecking/throwNoSortDesignPatternErrorModal";
import throwNoStatementsTabInputErrorModal from "../ErrorChecking/throwNoStatementsTabInputErrorModal";
import hasDuplicateStatementNumbersErrorModal from "../ErrorChecking/hasDuplicateStatementNumbersErrorModal";
import throwExcelT1MissingStatementNumberError from "../ErrorChecking/throwExcelT1MissingStatementNumberError";
import formatExcelType1Ver2ForDisplay from "./excelLogic/formatExcelType1Ver2ForDisplay";
import i18n from "i18next";
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
  let dataObject = {};
  dataObject.version = "old";
  let newTypeWorksheetsCheck = [];
  let hasPatternTab = false;

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

      if (y2 === "name" || y2 === "names") {
        console.log("3. Name worksheet found");
        let tempVar = XLSX.utils.sheet_to_csv(worksheet);
        let tempVar2 = tempVar.split(/\n/);
        let tempVar3 = tempVar2.filter(Boolean);
        let tempVar4 = tempVar3[1].toString();
        tempVar4 = tempVar4.replace(/,/g, "");
        dataObject.projectName = tempVar4;
      }

      if (y2 === "pattern" || y2 === "patterns") {
        console.log("4. Pattern worksheet found");

        newTypeWorksheetsCheck.push("pattern");
        let tempVar = XLSX.utils.sheet_to_csv(worksheet);
        let tempVar2 = tempVar.split(/\n/);
        let tempVar3 = tempVar2.filter(Boolean);
        dataObject.multiplierArray = tempVar3[1];
        hasPatternTab = true;
      }

      if (y2 === "type") {
        console.log("4b. Type worksheet found");
        let tempVar = XLSX.utils.sheet_to_csv(worksheet);
        let tempVar2 = tempVar.split(/\n/);
        let tempVar3 = tempVar2.filter(Boolean);
        let tempVar4 = tempVar3[1].toString();
        tempVar4 = tempVar4.replace(/,/g, "");
        let tempVar5 = tempVar4.toLowerCase().trim();
        if (tempVar5 !== "1") {
          inputState.showWarningMessageBar = false;
          inputState.showErrorMessageBar = true;
          inputState.errorMessage = i18n.t(
            "Wrong spreadsheet type - must be Type 1"
          );
          inputState.errorStackTrace = i18n.t("no stack trace available");
          inputState.extendedErrorMessage = i18n.t(
            "Check the spreadsheet type"
          );
          inputState.isLoadZipButtonGreen = false;
          inputState.isCsvDataErrorCheckButtonGreen = false;
          inputState.showDataImportSuccessMessage = false;
          throw new Error("Wrong spreadsheet type!");
        }
      }

      if (y2 === "version") {
        console.log("5. Version worksheet found");
        newTypeWorksheetsCheck.push("version");
        let tempVar = XLSX.utils.sheet_to_csv(worksheet);
        let tempVar2 = tempVar.split(/\n/);
        let tempVar3 = tempVar2.filter(Boolean);
        dataObject.version = tempVar3[1];
      }

      if (y2 === "sorts" || y2 === "qsorts" || y2 === "q-sorts") {
        console.log(`1. Q sorts worksheet found`);
        hasSortsWorksheet = true;
        tester = XLSX.utils.sheet_to_csv(worksheet);
        tester2 = tester.split(/\n/);
        let firstRow = tester2[0].split(",");
        // max statement number 500 artificial limit
        for (let i = 1; i < tester2.length; i += 1) {
          tester3 = tester2[i].split(",");
          rawSortsData.push(tester3);

          // emergency break
          if (i > 300) {
            break;
          }
        }
        let temp2 = [...rawSortsData];
        temp2.unshift(firstRow);
        dataObject.sortsArray = temp2;
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
        dataObject.statementsArray = [...rawStatementsData];
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

    if (hasPatternTab === true && dataObject.version === "old") {
      inputState.showWarningMessageBar = false;
      inputState.showErrorMessageBar = true;
      inputState.errorMessage = i18n.t(
        "The 'version' tab is missing from the spreadsheet"
      );
      inputState.errorStackTrace = i18n.t("no stack trace available");
      inputState.extendedErrorMessage = i18n.t("Check the spreadsheet type");
      inputState.isLoadZipButtonGreen = false;
      inputState.isCsvDataErrorCheckButtonGreen = false;
      inputState.showDataImportSuccessMessage = false;
      throw new Error("Missing version tab!");
    }

    //
    // **
    // ** Send to Processing
    // **

    let finalErrorCheck;
    if (dataObject.version === "old") {
      finalErrorCheck = formatExcelType1ForDisplay(
        rawStatementsData,
        rawSortsData
      );
    } else {
      finalErrorCheck = formatExcelType1Ver2ForDisplay(dataObject);
    }

    // **
    // ** Error Handling
    // **

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
      appState.isInputButtonGreen = true;
      appState.isDataButtonGreen = true;
      inputState.isDataAlreadyLoaded = true;
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
