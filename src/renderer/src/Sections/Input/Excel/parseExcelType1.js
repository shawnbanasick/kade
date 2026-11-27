import i18n from 'i18next';

import inputState from '../../GlobalState/inputState';
import appState from '../../GlobalState/appState';
import coreState from '../../GlobalState/coreState';

import projectHistoryState from '../../GlobalState/projectHistoryState';
import formatExcelType1ForDisplay from './excelLogic/formatExcelType1ForDisplay';
import formatExcelType1Ver2ForDisplay from './excelLogic/formatExcelType1Ver2ForDisplay';
import { sheetToCsv, sheetToJson } from './sheetHelpers';
import createStatementNumArray from '../Excel/excelLogic/createStatementNumArray';

function parseExcelType1(workbook) {
  let tester;
  let tester2;
  let tester3;
  let tester4;
  const rawSortsData = [];
  const rawStatementsData = [];
  let worksheet;

  let errorObject = {
    hasError: false,
    errorMessage: '',
    errorStackTrace: '',
    extendedErrorMessage: '',
  };

  let hasSortsWorksheet = false;
  let hasStatementsWorksheet = false;
  let hasPatternWorksheet = false;

  let isNoError = true;
  let dataObject = {};
  dataObject.version = 'old';
  let newTypeWorksheetsCheck = [];

  // iterate through every sheet and pull values
  const sheetNameList = workbook.sheetNames;

  try {
    sheetNameList.forEach((y) => {
      const y2 = y.toLowerCase();
      worksheet = workbook.sheets[y];
      /* iterate through sheets */
      if (y2 === 'guide') {
        console.log('found guide page');
      }

      if (y2 === 'name' || y2 === 'names') {
        console.log('3. Name worksheet found');
        let tempVar = sheetToCsv(worksheet);
        let tempVar2 = tempVar.split(/\n/);
        let tempVar3 = tempVar2.filter(Boolean);
        let tempVar4 = tempVar3[1].toString();
        tempVar4 = tempVar4.replace(/,/g, '');
        dataObject.projectName = tempVar4;
      }

      if (y2 === 'pattern' || y2 === 'patterns') {
        console.log('4. Pattern worksheet found');

        newTypeWorksheetsCheck.push('pattern');
        let tempVar = sheetToCsv(worksheet);
        let tempVar2 = tempVar.split(/\n/);
        let tempVar3 = tempVar2.filter(Boolean);
        dataObject.multiplierArray = tempVar3[1];
        hasPatternWorksheet = true;
      }

      if (y2 === 'type') {
        console.log('4b. Type worksheet found');
        let tempVar = sheetToCsv(worksheet);
        let tempVar2 = tempVar.split(/\n/);
        let tempVar3 = tempVar2.filter(Boolean);
        let tempVar4 = tempVar3[1].toString();
        tempVar4 = tempVar4.replace(/,/g, '');
        let tempVar5 = tempVar4.toLowerCase().trim();
        if (tempVar5 !== '1') {
          errorObject.hasError = true;
          errorObject.errorMessage = `${i18n.t('Input Error - Wrong spreadsheet type - must be Type 1')}`;
          errorObject.errorStackTrace = `${i18n.t('no stack trace available')}`;
          errorObject.extendedErrorMessage = `${i18n.t('Check the spreadsheet type')}`;
        }
      }

      if (y2 === 'version') {
        console.log('5. Version worksheet found');
        newTypeWorksheetsCheck.push('version');
        let tempVar = sheetToCsv(worksheet);
        let tempVar2 = tempVar?.split(/\n/);
        let tempVar3 = tempVar2?.filter(Boolean);
        let tempVar4 = tempVar3[1]?.toString();
        tempVar4 = tempVar4?.replace(/,/g, '');
        dataObject.version = tempVar4?.trim();
      }

      if (y2 === 'sorts' || y2 === 'qsorts' || y2 === 'q-sorts') {
        console.log(`1. Q sorts worksheet found`);
        hasSortsWorksheet = true;
        tester = sheetToCsv(worksheet);
        tester2 = tester.split(/\n/);
        let firstRow = tester2[0].split(',');
        // max statement number 500 artificial limit
        for (let i = 1; i < tester2.length; i += 1) {
          tester3 = tester2[i].split(',');
          rawSortsData.push(tester3);

          // emergency break
          if (i > 500) {
            break;
          }
        }
        let temp2 = [...rawSortsData];
        temp2.unshift(firstRow);
        const filtered = temp2.filter((row) => row[0] !== '');
        if (filtered[1].length < 2) {
          console.log('Wrong spreadsheet type - must be Type 1');
          errorObject.hasError = true;
          errorObject.errorMessage = `${i18n.t('Input Error - Wrong spreadsheet type - must be Type 1')}`;
          errorObject.errorStackTrace = `${i18n.t('no stack trace available')}`;
          errorObject.extendedErrorMessage = `${i18n.t('Check the spreadsheet type')}`;
        }
        dataObject.sortsArray = temp2;
      }

      if (y2 === 'statements' || y2 === 'statement') {
        console.log(`2. Statements worksheet found`);
        hasStatementsWorksheet = true;
        tester4 = sheetToJson(worksheet);
        const testValue = Object.prototype.hasOwnProperty.call(tester4[0], 'Statements');
        if (!testValue) {
          errorObject.hasError = true;
          errorObject.errorMessage = `${i18n.t('Input Error - No statements found in spreadsheet')}`;
          errorObject.errorStackTrace = `${i18n.t('no stack trace available')}`;
          errorObject.extendedErrorMessage = `${i18n.t('Check statements input tab')}`;
          isNoError = false;
        }
        rawStatementsData.push(tester4);
        dataObject.statementsArray = [...rawStatementsData];
      }
    }); // end iteration of for each

    if (hasSortsWorksheet === false) {
      errorObject.hasError = true;
      errorObject.errorMessage = `${i18n.t('Input Error - No sorts tab found in spreadsheet')}`;
      errorObject.errorStackTrace = `${i18n.t('no stack trace available')}`;
      errorObject.extendedErrorMessage = `${i18n.t('Check sorts input tab')}`;
      isNoError = false;
    }

    if (hasStatementsWorksheet === false) {
      errorObject.hasError = true;
      errorObject.errorMessage = `${i18n.t('Cant find the statements tab in the Excel File')}`;
      errorObject.errorStackTrace = `${i18n.t('no stack trace available')}`;
      errorObject.extendedErrorMessage = `${i18n.t('Check the format of the Excel file and try again')}`;
      isNoError = false;
    }

    if (hasPatternWorksheet === false && dataObject.version !== 'old') {
      errorObject.hasError = true;
      errorObject.errorMessage = `${i18n.t('Input Error - No pattern tab found in spreadsheet')}`;
      errorObject.errorStackTrace = `${i18n.t('no stack trace available')}`;
      errorObject.extendedErrorMessage = `${i18n.t('Check pattern input tab')}`;
      isNoError = false;
    }

    if (hasPatternWorksheet === true && dataObject.version === 'old') {
      errorObject.hasError = true;
      errorObject.errorMessage = `${i18n.t("The 'version' tab is missing from the spreadsheet")}`;
      errorObject.errorStackTrace = `${i18n.t('no stack trace available')}`;
      errorObject.extendedErrorMessage = `${i18n.t('Check the spreadsheet type')}`;
      isNoError = false;
    }

    if (errorObject.hasError) {
      inputState.setState({
        showWarningMessageBar: false,
        showErrorMessageBar: true,
        errorMessage: errorObject.errorMessage,
        errorStackTrace: errorObject.errorStackTrace,
        extendedErrorMessage: errorObject.extendedErrorMessage,
        isLoadZipButtonGreen: false,
        isCsvDataErrorCheckButtonGreen: false,
        showDataImportSuccessMessage: false,
      });
      throw new Error(errorObject.errorMessage);
    }

    // **
    // ** If no immediate errors, send to processing
    // **

    let finalProcessing;

    if (dataObject.version === 'old') {
      //** OLD VERSION PROCESSING **//
      finalProcessing = formatExcelType1ForDisplay(rawStatementsData, rawSortsData, errorObject);
      if (finalProcessing.errorObject.hasError) {
        inputState.setState({
          showWarningMessageBar: false,
          showErrorMessageBar: true,
          errorMessage: finalProcessing.errorObject.errorMessage,
          errorStackTrace: finalProcessing.errorObject.errorStackTrace,
          extendedErrorMessage: finalProcessing.errorObject.extendedErrorMessage,
          isLoadZipButtonGreen: false,
          isCsvDataErrorCheckButtonGreen: false,
          showDataImportSuccessMessage: false,
        });
        throw new Error(finalProcessing.errorObject.errorMessage);
      }
    } else {
      //** NEW VERSION PROCESSING **//
      finalProcessing = formatExcelType1Ver2ForDisplay(dataObject, errorObject);
    }

    //** THROW FINAL PROCESSING ERROR **//
    if (finalProcessing.errorObject.hasError) {
      inputState.setState({
        showWarningMessageBar: false,
        showErrorMessageBar: true,
        errorMessage: finalProcessing.errorObject.errorMessage,
        errorStackTrace: finalProcessing.errorObject.errorStackTrace,
        extendedErrorMessage: finalProcessing.errorObject.extendedErrorMessage,
        isLoadZipButtonGreen: false,
        isCsvDataErrorCheckButtonGreen: false,
        showDataImportSuccessMessage: false,
      });
      throw new Error(errorObject.errorMessage);
    }

    /*
     * SUCCESSFUL LOAD
     */

    if (isNoError && finalProcessing.errorObject.hasError === false) {
      let statementNumArray = createStatementNumArray(finalProcessing.statements.length);

      appState.setState({ isDataButtonGreen: true, isInputButtonGreen: true });

      projectHistoryState.projectHistoryArray = finalProcessing.projectHistoryArray;

      coreState.setState({
        statements: finalProcessing.statements,
        sortsDisplayText: finalProcessing.sortsDisplayText,
        projectName: finalProcessing.projectName,
        numQsorts: finalProcessing.numQsorts,
        numStatements: finalProcessing.numStatements,
        qSortPattern: finalProcessing.qSortPattern,
        mainDataObject: finalProcessing.mainDataObject,
        multiplierArray: finalProcessing.multiplierArray,
        respondentNames: finalProcessing.respondentNames,
        statementNumArray: statementNumArray,
      });

      inputState.setState({
        statementsLoaded: true,
        areQsortsLoaded: true,
        isQsortPatternLoaded: true,
        isDataAlreadyLoaded: true,
        sortsLoaded: true,
        dataOrigin: 'excel',
        notifyDataUploadSuccess: true,
      });

      setTimeout(() => {
        inputState.setState({ isLoadExcelT1ButtonGreen: true });
      }, 10);
    }
    // manage error messages
  } catch (error) {
    // set error message
    inputState.setState({ excelErrorMessage1: error.message });
    inputState.setState({ showExcelErrorModal: true });
  }
}

export default parseExcelType1;
