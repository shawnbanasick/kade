import * as XLSX from 'xlsx';
import throwNoSortsInputErrorModal from '../ErrorChecking/throwNoSortsInputError';
import numStatementsMatchErrorModal from '../ErrorChecking/numStatementsMatchErrorModal';
import throwNoSortsTabInputErrorModal from '../ErrorChecking/throwNoSortsTabInputErrorModal';
import formatExcelType2ForDisplay from './excelLogic/formatExcelType2ForDisplay';
import throwNoStatementsInputErrorModal from '../ErrorChecking/throwNoStatementsInputErrorModal';
import throwNoStatementsTabInputErrorModal from '../ErrorChecking/throwNoStatementsTabInputErrorModal';
import throwNoSortDesignPatternErrorModal from '../ErrorChecking/throwNoSortDesignPatternErrorModal';
import formatExcelType2Ver2ForDisplay from './excelLogic/formatExcelType2Ver2ForDisplay';
import inputState from '../../GlobalState/inputState';
import appState from '../../GlobalState/appState';
import i18n from 'i18next';

function parseExcelType2(workbook) {
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
  let newTypeWorksheetsCheck = [];
  let dataObject = {};
  dataObject.version = 'old';
  let hasPatternTab = false;

  // iterate through every sheet and pull values
  const sheetNameList = workbook.SheetNames;

  try {
    sheetNameList.forEach((y) => {
      const y2 = y.toLowerCase();
      /* iterate through sheets */
      worksheet = workbook.Sheets[y];

      if (y2 === 'type') {
        console.log('3. Type worksheet found');
        let tempVar = XLSX.utils.sheet_to_csv(worksheet);
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
        newTypeWorksheetsCheck.push('version');
        let tempVar = XLSX.utils.sheet_to_csv(worksheet);
        let tempVar2 = tempVar.split(/\n/);
        let tempVar3 = tempVar2.filter(Boolean);
        dataObject.version = tempVar3[1];
      }

      if (y2 === 'name' || y2 === 'names') {
        let tempVar = XLSX.utils.sheet_to_csv(worksheet);
        let tempVar2 = tempVar.split(/\n/);
        let tempVar3 = tempVar2.filter(Boolean);
        let tempVar4 = tempVar3[1].toString();
        tempVar4 = tempVar4.replace(/,/g, '');
        dataObject.projectName = tempVar4;
      }

      if (y2 === 'pattern' || y2 === 'patterns') {
        newTypeWorksheetsCheck.push('pattern');
        let tempVar = XLSX.utils.sheet_to_csv(worksheet);
        let tempVar2 = tempVar.split(/\n/);
        let tempVar3 = tempVar2.filter(Boolean);
        hasPatternTab = true;
        dataObject.multiplierArray = tempVar3[1];
        if (tempVar2[1] === undefined) {
          inputState.setState({ showWarningMessageBar: false });
          inputState.setState({ showErrorMessageBar: true });
          inputState.setState({ errorMessage: i18n.t('Cant find the Q sort pattern') });
          inputState.setState({ errorStackTrace: i18n.t('no stack trace available') });
          inputState.setState({ extendedErrorMessage: i18n.t('Check the Q sort pattern data') });
          inputState.setState({ isLoadZipButtonGreen: false });
          inputState.setState({ isCsvDataErrorCheckButtonGreen: false });
          inputState.setState({ showDataImportSuccessMessage: false });
          throw new Error("Can't find the Q sort pattern!");
        }
      }

      // ** SORTS **
      if (y2 === 'sorts' || y2 === 'qsorts' || y2 === 'q-sorts') {
        console.log('1. Q sorts worksheet found');

        hasSortsWorksheet = true;
        tester = XLSX.utils.sheet_to_csv(worksheet);
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
          throwNoSortsInputErrorModal();
          isNoError = false;
        }
        rawSortsData.push(tester3);
        dataObject.sortsArray = rawSortsData;
      }

      // ** STATEMENTS **
      if (y2 === 'statements' || y2 === 'statement') {
        console.log('2. Statements worksheet found');
        hasStatementsWorksheet = true;
        tester4 = XLSX.utils.sheet_to_json(worksheet);
        const testValue = Object.prototype.hasOwnProperty.call(tester4[0], 'Statements');
        if (!testValue) {
          throwNoStatementsInputErrorModal();
          isNoError = false;
        }
        rawStatementsData.push(tester4);
        dataObject.statementsArray = [...rawStatementsData];
      }
    }); // end iteration of for each

    if (hasPatternTab === true && dataObject.version === 'old') {
      inputState.setState({ showWarningMessageBar: false });
      inputState.setState({ showErrorMessageBar: true });
      inputState.setState({
        errorMessage: i18n.t("The 'version' tab is missing from the spreadsheet"),
      });
      inputState.setState({ errorStackTrace: i18n.t('no stack trace available') });
      inputState.setState({ extendedErrorMessage: i18n.t('Check the spreadsheet type') });
      inputState.setState({ isLoadZipButtonGreen: false });
      inputState.setState({ isCsvDataErrorCheckButtonGreen: false });
      inputState.setState({ showDataImportSuccessMessage: false });
      throw new Error('Missing version tab!');
    }

    // **
    // ** Do Processing
    // **
    let finalErrorCheck;
    if (dataObject.version === 'old') {
      finalErrorCheck = formatExcelType2ForDisplay(rawStatementsData, rawSortsData);
    } else {
      finalErrorCheck = formatExcelType2Ver2ForDisplay(dataObject);
    }

    // **
    // ** Error Handling
    // **
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
      inputState.setState({ dataOrigin: 'excel' });
      inputState.setState({ notifyDataUploadSuccess: true });
      inputState.setState({ areQsortsLoaded: true });
      appState.setState({ isInputButtonGreen: true });
      appState.setState({ isDataButtonGreen: true });
      inputState.setState({ isDataAlreadyLoaded: true });
      // button won't green without timeout
      setTimeout(() => {
        inputState.setState({ isLoadExcelT2ButtonGreen: true });
      }, 10);
    }
  } catch (error) {
    // set unexpected error message and show modal
    inputState.setState({ excelErrorMessage1: error.message });
    inputState.setState({ showExcelErrorModal: true });
  }
}

export default parseExcelType2;
