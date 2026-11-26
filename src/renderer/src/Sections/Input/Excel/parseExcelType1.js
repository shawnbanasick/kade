import i18n from 'i18next';

import inputState from '../../GlobalState/inputState';
import appState from '../../GlobalState/appState';
import coreState from '../../GlobalState/coreState';

import projectHistoryState from '../../GlobalState/projectHistoryState';
import numStatementsMatchErrorModal from '../ErrorChecking/numStatementsMatchErrorModal';
import formatExcelType1ForDisplay from './excelLogic/formatExcelType1ForDisplay';
import headersDontMatchSortsErrorModal from '../ErrorChecking/headersDontMatchSortsErrorModal';
import throwNoSortsInputErrorModal from '../ErrorChecking/throwNoSortsInputError';
import throwExcelT1RangeErrorModal from './excelLogic/throwExcelT1RangeErrorModal';
import throwNoSortDesignPatternErrorModal from '../ErrorChecking/throwNoSortDesignPatternErrorModal';
import hasDuplicateStatementNumbersErrorModal from '../ErrorChecking/hasDuplicateStatementNumbersErrorModal';
import formatExcelType1Ver2ForDisplay from './excelLogic/formatExcelType1Ver2ForDisplay';
import { sheetToCsv, sheetToJson } from './sheetHelpers';

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
        console.log(`tempVar5: ${tempVar5}`);
        if (tempVar5 !== '1') {
          console.log('Wrong spreadsheet type - must be Type 1');
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
        let tempVar2 = tempVar.split(/\n/);
        let tempVar3 = tempVar2.filter(Boolean);
        dataObject.version = tempVar3[1];
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
      inputState.setState({ showWarningMessageBar: false });
      inputState.setState({ showErrorMessageBar: true });
      inputState.setState({ errorMessage: errorObject.errorMessage });
      inputState.setState({ errorStackTrace: errorObject.errorStackTrace });
      inputState.setState({ extendedErrorMessage: errorObject.extendedErrorMessage });
      inputState.setState({ isLoadZipButtonGreen: false });
      inputState.setState({ isCsvDataErrorCheckButtonGreen: false });
      inputState.setState({ showDataImportSuccessMessage: false });
      throw new Error(errorObject.errorMessage);
    }

    // **
    // ** If no immediate errors, send to processing
    // **

    let finalProcessing;

    if (dataObject.version === 'old') {
      //** OLD VERSION PROCESSING **//
      finalProcessing = formatExcelType1ForDisplay(rawStatementsData, rawSortsData, errorObject);
      console.log('finalProcessing', finalProcessing.errorObject);
      if (finalProcessing.errorObject.hasError) {
        inputState.setState({ showWarningMessageBar: false });
        inputState.setState({ showErrorMessageBar: true });
        inputState.setState({ errorMessage: finalProcessing.errorObject.errorMessage });
        inputState.setState({ errorStackTrace: finalProcessing.errorObject.errorStackTrace });
        inputState.setState({
          extendedErrorMessage: finalProcessing.errorObject.extendedErrorMessage,
        });
        inputState.setState({ isLoadZipButtonGreen: false });
        inputState.setState({ isCsvDataErrorCheckButtonGreen: false });
        inputState.setState({ showDataImportSuccessMessage: false });
        throw new Error(finalProcessing.errorObject.errorMessage);
      }
    } else {
      //** NEW VERSION PROCESSING **//
      finalProcessing = formatExcelType1Ver2ForDisplay(dataObject, errorObject);
    }

    //** THROW FINAL PROCESSING ERROR **//
    if (finalProcessing.errorObject.hasError) {
      inputState.setState({ showWarningMessageBar: false });
      inputState.setState({ showErrorMessageBar: true });
      inputState.setState({ errorMessage: errorObject.errorMessage });
      inputState.setState({ errorStackTrace: errorObject.errorStackTrace });
      inputState.setState({ extendedErrorMessage: errorObject.extendedErrorMessage });
      inputState.setState({ isLoadZipButtonGreen: false });
      inputState.setState({ isCsvDataErrorCheckButtonGreen: false });
      inputState.setState({ showDataImportSuccessMessage: false });
      throw new Error(errorObject.errorMessage);
    }

    // **
    // ** Error Handling
    // **

    // out of range values
    if (finalProcessing.outOfRangeError) {
      // throwExcelT1RangeErrorModal();
      isNoError = false;
    }

    // no sorts
    if (finalProcessing.noSortsError) {
      throwNoSortsInputErrorModal();
      isNoError = false;
    }

    // no sort design pattern
    if (finalProcessing.noSortPatternError) {
      throwNoSortDesignPatternErrorModal();
      isNoError = false;
    }

    // duplicate statement numbers
    if (finalProcessing.hasDuplicateStatementNumbers) {
      hasDuplicateStatementNumbersErrorModal();
      isNoError = false;
    }

    // no header match error
    if (finalProcessing.noHeaderMatchError) {
      headersDontMatchSortsErrorModal();
      isNoError = false;
    }

    // num statements doesnt match number sort values in Q sort pattern
    if (finalProcessing.numStatementsMatchError) {
      numStatementsMatchErrorModal();
      isNoError = false;
    }

    // missing statement number(s)
    if (finalProcessing.missingStatementNumberError) {
      // throwExcelT1MissingStatementNumberError();
      isNoError = false;
    }

    console.log(`isNoError: ${isNoError}`);
    console.log(`finalProcessing: ${JSON.stringify(finalProcessing)}`);
    /*
     * IMPORT ERROR NOTIFICATION
     */

    /*
     * SUCCESSFUL LOAD
     */

    if (isNoError && finalProcessing.errorObject.hasError === false) {
      console.log('finalProcessing', finalProcessing);

      appState.setState({ isDataButtonGreen: true });
      appState.setState({ isInputButtonGreen: true });

      projectHistoryState.projectHistoryArray = finalProcessing.projectHistoryArray;

      coreState.setState({ statements: finalProcessing.statements });
      coreState.setState({ sortsDisplayText: finalProcessing.sortsDisplayText });
      coreState.setState({ projectName: finalProcessing.projectName });
      coreState.setState({ numQsorts: finalProcessing.numQsorts });
      coreState.setState({ numStatements: finalProcessing.numStatements });
      coreState.setState({ qSortPattern: finalProcessing.qSortPattern });
      coreState.setState({ mainDataObject: finalProcessing.mainDataObject });
      coreState.setState({ multiplierArray: finalProcessing.multiplierArray });
      coreState.setState({ respondentNames: finalProcessing.respondentNames });

      inputState.setState({ statementsLoaded: true });
      inputState.setState({ areQsortsLoaded: true });
      inputState.setState({ isQsortPatternLoaded: true });
      inputState.setState({ isDataAlreadyLoaded: true });
      inputState.setState({ sortsLoaded: true });
      inputState.setState({ dataOrigin: 'excel' });
      inputState.setState({ notifyDataUploadSuccess: true });
      inputState.setState({ areQsortsLoaded: true });

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
