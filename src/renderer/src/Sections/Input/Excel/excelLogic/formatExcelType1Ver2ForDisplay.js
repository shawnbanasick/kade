import checkUniqueParticipantNames from '../../logic/checkUniqueParticipantNames';
import createMainDataObject from './createMainDataObject';
import cleanMultiplierArray from './cleanMultiplierArray';
import i18n from 'i18next';
import createStatementNumArray from './createStatementNumArray';
import calcStatementsNum from './calcStatementsNum';
import transformExcelType1Ver2Sorts from './transformExcelType1Ver2Sorts';
import extremeValueErrorCheck from './extremeValueErrorCheck';
import transformExcelType1Ver2Statements from './transformExcelType1Ver2Statements';
import calcQsortPatternArray from './calcQsortPatternArray';
import sortErrorCheckT2 from './sortErrorCheckT2';
import createSortsDisplayText from './createSortsDisplayText';
import cloneDeep from 'lodash/cloneDeep';
import projectHistoryState from '../../../GlobalState/projectHistoryState';
import coreState from '../../../GlobalState/coreState';
import inputState from '../../../GlobalState/inputState';

const formatExcelType1Ver2 = (dataObject) => {
  let outOfRangeError = false;
  let noSortsError = false;
  let noSortPatternError = false;
  let hasDuplicateStatementNumbers = false;
  let noHeaderMatchError = false;
  let numStatementsMatchError = false;
  let missingStatementNumberError = false;

  // TODO - Add more error handling

  try {
    // QAV#1  Project Name
    let projectName = dataObject.projectName;

    // QAV#2  Multiplier Array
    let multiplierArray3 = cloneDeep(dataObject.multiplierArray);
    let multiplierArray = cleanMultiplierArray(multiplierArray3);

    if (multiplierArray.length !== 20) {
      inputState.setState({ showWarningMessageBar: false });
      inputState.setState({ showErrorMessageBar: true });
      inputState.setState({ errorMessage: i18n.t('The Q sort pattern input is incorrect') });
      inputState.setState({ errorStackTrace: i18n.t('no stack trace available') });
      inputState.setState({ extendedErrorMessage: i18n.t('Check the Q sort pattern data') });
      inputState.setState({ isLoadZipButtonGreen: false });
      inputState.setState({ isCsvDataErrorCheckButtonGreen: false });
      inputState.setState({ showDataImportSuccessMessage: false });
      throw new Error('Check the Q sort pattern data');
    }

    // QAV#3  Number of Statements
    let numberOfStatements2 = [...multiplierArray];
    const numStatements = calcStatementsNum(numberOfStatements2);

    // QAV#4  Participant Names
    let participantNames2 = [...dataObject.sortsArray[0]];
    let participantNames3 = participantNames2.filter((item) => item);
    participantNames3.shift();
    let participantNames = checkUniqueParticipantNames(participantNames3);

    // QAV#5  Number of Participants
    let numberOfParticipants = participantNames.length;

    // QAV#6  Participant Sorts
    let sortData = cloneDeep(dataObject.sortsArray);
    const participantSorts2 = transformExcelType1Ver2Sorts(
      sortData,
      numStatements,
      participantNames
    );
    let participantSorts = cloneDeep(participantSorts2.participantSorts);

    if (participantSorts.length !== numberOfParticipants) {
      inputState.setState({ showWarningMessageBar: false });
      inputState.setState({ showErrorMessageBar: true });
      inputState.setState({
        errorMessage: i18n.t('Participant data and Q sort data do not match'),
      });
      inputState.setState({ errorStackTrace: i18n.t('no stack trace available') });
      inputState.setState({ extendedErrorMessage: i18n.t('Check the Q sort data') });
      inputState.setState({ isLoadZipButtonGreen: false });
      inputState.setState({ isCsvDataErrorCheckButtonGreen: false });
      inputState.setState({ showDataImportSuccessMessage: false });
      throw new Error('Check the Q sort data');
    }

    // Error Checking
    extremeValueErrorCheck(participantSorts2);

    // QAV#7  Project Statements
    let projectStatements2 = cloneDeep(dataObject.statementsArray);

    let projectStatements = transformExcelType1Ver2Statements(projectStatements2);

    // QAV#8  Create Q sort Pattern Array
    let qSortPatternArray = calcQsortPatternArray(multiplierArray);

    if (qSortPatternArray.length !== projectStatements.length) {
      inputState.setState({ showWarningMessageBar: false });
      inputState.setState({ showErrorMessageBar: true });
      inputState.setState({
        errorMessage: i18n.t('The Q sort pattern input or number of statements is incorrect'),
      });
      inputState.setState({ errorStackTrace: i18n.t('no stack trace available') });
      inputState.setState({
        extendedErrorMessage: i18n.t('Check the statements input and the Q sort pattern data'),
      });
      inputState.setState({ isLoadZipButtonGreen: false });
      inputState.setState({ isCsvDataErrorCheckButtonGreen: false });
      inputState.setState({ showDataImportSuccessMessage: false });
      throw new Error('Check the Q sort pattern data');
    }

    // Error Checking
    sortErrorCheckT2(qSortPatternArray, participantSorts, participantNames);

    // Create Statement Num Array
    let statementNumArray = createStatementNumArray(numStatements);

    // Create Excel Type 1 Nonsymmetric Array Text
    /* let excelType1NonsymmetricArrayText = createExcelType1NonsymmetricalArrayText(
      participantNames
    );
    */

    // Create Sorts Display Text
    let sortsDisplayText = createSortsDisplayText(participantNames, participantSorts);

    // Create Main Data Object
    let mainDataObject = createMainDataObject(participantNames, participantSorts);

    // ** OUTPUT PROCESSING ** //

    const logMessageObj1 = {
      logMessage: `${projectName} ${i18n.t('data loaded from XLSX Type 1 file')}`,
      logType: 'excelInput',
    };

    projectHistoryState.setState({ projectHistoryArray: logMessageObj1 });
    coreState.setState({ statements: projectStatements });
    coreState.setState({ sortsDisplayText: sortsDisplayText });
    coreState.setState({ projectName: projectName });
    coreState.setState({ numQsorts: numberOfParticipants });
    coreState.setState({ numStatements: numStatements });
    coreState.setState({ qSortPattern: qSortPatternArray });
    coreState.setState({ mainDataObject: mainDataObject });
    coreState.setState({ multiplierArray: multiplierArray });
    coreState.setState({ statementNumArray: statementNumArray });
    coreState.setState({ respondentNames: participantNames });
    inputState.setState({ areQsortsLoaded: true });
    inputState.setState({ isQsortPatternLoaded: true });
    inputState.setState({ statementsLoaded: true });
  } catch (error) {
    console.log(error.message);
    console.log(error.stack);
    let message = error.message;
    inputState.setState({ excelErrorMessage1: message });
    inputState.setState({ showExcelErrorModal: true });
  }

  return [
    outOfRangeError,
    noSortsError,
    noSortPatternError,
    hasDuplicateStatementNumbers,
    noHeaderMatchError,
    numStatementsMatchError,
    missingStatementNumberError,
  ];
};

export default formatExcelType1Ver2;
