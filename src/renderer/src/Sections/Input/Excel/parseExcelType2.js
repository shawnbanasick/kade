import i18n from 'i18next';

import inputState from '../../GlobalState/inputState';
import appState from '../../GlobalState/appState';
import coreState from '../../GlobalState/coreState';
import projectHistoryState from '../../GlobalState/projectHistoryState';

import formatExcelType2ForDisplay from './excelLogic/formatExcelType2ForDisplay';
import formatExcelType2Ver2ForDisplay from './excelLogic/formatExcelType2Ver2ForDisplay';
import { sheetToCsv, sheetToJson } from './sheetHelpers';

function parseExcelType2(workbook) {
  let tester;
  let tester2;
  let tester3;
  let tester4;
  const rawSortsData = [];
  const rawStatementsData = [];
  let worksheet;
  let isNoError = true;
  let newTypeWorksheetsCheck = [];
  let dataObject = {};
  dataObject.version = 'old';
  let hasPatternTab = false;
  let hasSortsWorksheet = false;
  let hasStatementsWorksheet = false;

  let errorObject = {
    hasError: false,
    errorMessage: '',
    errorStackTrace: '',
    extendedErrorMessage: '',
  };

  // workbook shape is now { sheetNames, sheets }
  const sheetNameList = workbook.sheetNames;

  try {
    sheetNameList.forEach((y) => {
      const y2 = y.toLowerCase();

      /* iterate through sheets */
      worksheet = workbook.sheets[y];
      if (y2 === 'type') {
        console.log('3. Type worksheet found');
        let tempVar = sheetToCsv(worksheet);
        let tempVar2 = tempVar.split(/\n/);
        let tempVar3 = tempVar2.filter(Boolean);
        let tempVar4 = tempVar3[1].toString();
        tempVar4 = tempVar4.replace(/,/g, '');
        let tempVar5 = tempVar4.toLowerCase().trim();
        if (tempVar5 !== '2') {
          inputState.setState({ showWarningMessageBar: false });
          inputState.setState({ showErrorMessageBar: true });
          inputState.setState({ errorMessage: i18n.t('Wrong spreadsheet type - must be Type 2') });
          inputState.setState({ errorStackTrace: i18n.t('no stack trace available') });
          inputState.setState({ extendedErrorMessage: i18n.t('Check the spreadsheet type') });
          inputState.setState({ isLoadZipButtonGreen: false });
          inputState.setState({ isCsvDataErrorCheckButtonGreen: false });
          inputState.setState({ showDataImportSuccessMessage: false });
          throw new Error('Wrong spreadsheet type!');
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

      if (y2 === 'name' || y2 === 'names') {
        let tempVar = sheetToCsv(worksheet);
        let tempVar2 = tempVar.split(/\n/);
        let tempVar3 = tempVar2.filter(Boolean);
        let tempVar4 = tempVar3[1].toString();
        tempVar4 = tempVar4.replace(/,/g, '');
        dataObject.projectName = tempVar4;
      }

      if (y2 === 'pattern' || y2 === 'patterns') {
        console.log('4. Q sort pattern worksheet found');
        newTypeWorksheetsCheck.push('pattern');
        let tempVar = sheetToCsv(worksheet);
        let tempVar2 = tempVar.split(/\n/);
        let tempVar3 = tempVar2.filter(Boolean);
        hasPatternTab = true;
        dataObject.multiplierArray = tempVar3[1];
        if (tempVar2[1] === undefined) {
          errorObject.hasError = true;
          errorObject.errorMessage = i18n.t('Cant find the Q sort pattern');
          errorObject.errorStackTrace = i18n.t('no stack trace available');
          errorObject.extendedErrorMessage = i18n.t('Check the Q sort pattern data');
        }
      }

      // ** SORTS **
      if (y2 === 'sorts' || y2 === 'qsorts' || y2 === 'q-sorts') {
        hasSortsWorksheet = true;
        console.log('1. Q sorts worksheet found');
        tester = sheetToCsv(worksheet);
        tester2 = tester.split(/\n/);
        // filter unneeded values
        tester3 = tester2.filter(Boolean);
        // convert to array
        const checkValuesArray = tester3[6].split(',').map(Number);
        // remove participant name
        checkValuesArray.shift();
        // helper
        const add = (a, b) => Math.abs(a) + Math.abs(b);
        // sum array, if empty (no sort), will sum to zero
        const checkValuesArrayTotal = checkValuesArray.reduce(add);
        if (checkValuesArrayTotal === 0) {
          errorObject.hasError = true;
          errorObject.errorMessage = i18n.t('The Q sorts contain no data');
          errorObject.errorStackTrace = i18n.t('no stack trace available');
          errorObject.extendedErrorMessage = i18n.t('Check the Q sorts data');
        }
        rawSortsData.push(tester3);
        dataObject.sortsArray = rawSortsData;
      }

      // ** STATEMENTS **
      if (y2 === 'statements' || y2 === 'statement') {
        hasStatementsWorksheet = true;
        console.log('2. Statements worksheet found');
        tester4 = sheetToJson(worksheet);
        const testValue = Object.prototype.hasOwnProperty.call(tester4[0], 'Statements');
        if (!testValue) {
          errorObject.hasError = true;
          errorObject.errorMessage = i18n.t('No statements found in the input data');
          errorObject.errorStackTrace = i18n.t('no stack trace available');
          errorObject.extendedErrorMessage = i18n.t('Check the statements input data');
        }
        rawStatementsData.push(tester4);
        dataObject.statementsArray = [...rawStatementsData];
      }
    }); // end iteration of for each

    if (hasPatternTab === true && dataObject.version === 'old') {
      errorObject.hasError = true;
      errorObject.errorMessage = i18n.t('The "version" tab is missing from the spreadsheet');
      errorObject.errorStackTrace = i18n.t('no stack trace available');
      errorObject.extendedErrorMessage = i18n.t('Check the spreadsheet type');
    }
    // **
    // ** INITIALLY ERROR CATCHING
    // **

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
    // ** NO INTIAL ERROR ==> FORMAT DATA FOR DISPLAY
    // **
    let finalErrorCheck;
    if (dataObject.version === 'old') {
      finalErrorCheck = formatExcelType2ForDisplay(rawStatementsData, rawSortsData, errorObject);
    } else {
      finalErrorCheck = formatExcelType2Ver2ForDisplay(dataObject, errorObject);
    }

    if (finalErrorCheck.errorObject.hasError) {
      inputState.setState({
        showWarningMessageBar: false,
        showErrorMessageBar: true,
        errorMessage: finalErrorCheck.errorObject.errorMessage,
        errorStackTrace: finalErrorCheck.errorObject.errorStackTrace,
        extendedErrorMessage: finalErrorCheck.errorObject.extendedErrorMessage,
        isLoadZipButtonGreen: false,
        isCsvDataErrorCheckButtonGreen: false,
        showDataImportSuccessMessage: false,
      });
      throw new Error(errorObject.errorMessage);
    }

    // **
    // ** IF NO FINAL ERROR ==> SET STATE
    // **
    if (isNoError) {
      inputState.setState({
        dataOrigin: 'excel',
        statementsLoaded: true,
        areQsortsLoaded: true,
        isQsortPatternLoaded: true,
        isDataAlreadyLoaded: true,
        sortsLoaded: true,
        notifyDataUploadSuccess: true,
        isLoadExcelT2ButtonGreen: true,
      });
      appState.setState({ isInputButtonGreen: true, isDataButtonGreen: true });

      coreState.setState({
        projectName: finalErrorCheck.projectName,
        statements: finalErrorCheck.statements,
        sortsDisplayText: finalErrorCheck.sortsDisplayText,
        numQsorts: finalErrorCheck.numQsorts,
        numStatements: finalErrorCheck.numStatements,
        qSortPattern: finalErrorCheck.qSortPattern,
        mainDataObject: finalErrorCheck.mainDataObject,
        multiplierArray: finalErrorCheck.multiplierArray,
        respondentNames: finalErrorCheck.respondentNames,
        statementNumArray: finalErrorCheck.statementNumArray,
      });
      projectHistoryState.setState({ projectHistoryArray: finalErrorCheck.projectHistoryArray });

      setTimeout(() => {
        inputState.setState({ isLoadExcelT2ButtonGreen: true });
      }, 10);
    }
  } catch (error) {
    inputState.setState({ excelErrorMessage1: error.message });
    inputState.setState({ showExcelErrorModal: true });
  }
}

export default parseExcelType2;
