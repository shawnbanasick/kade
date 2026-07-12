import cloneDeep from 'lodash/cloneDeep';
import calcStatementsNum from './calcStatementsNum';
import cleanMultiplierArray from './cleanMultiplierArray';
import transformExcelType2Ver2Statements from './transformExcelType2Ver2Statements';
import calcQsortPatternArray from './calcQsortPatternArray';
// import createExcelType1NonsymmetricalArrayText from "./createExcelType1NonsymmetricalArray";
import createSortsDisplayText from './createSortsDisplayText';
import createMainDataObject from './createMainDataObject';
import transformExcelType2Ver2Sorts from './transformExcelType2Ver2Sorts';
import checkUniqueParticipantNames from '../../logic/checkUniqueParticipantNames';
import projectHistoryState from '../../../GlobalState/projectHistoryState';
import coreState from '../../../GlobalState/coreState';
import inputState from '../../../GlobalState/inputState';
import i18n from 'i18next';

import createStatementNumArray from './createStatementNumArray';

const formatExcelType2Ver2ForDisplay = (dataObject) => {
  let returnObject = {};

  // TODO - Add more error handling
  try {
    // QAV#1  Project Name
    let projectName = dataObject.projectName;

    // store #2 project history array
    const logMessageObj1 = {
      logMessage: `${projectName} data loaded from XLSX Type 2 file`,
      logType: 'excel2Input',
    };

    const projectHistoryArray = [logMessageObj1];

    // QAV#2  Multiplier Array
    let multiplierArray3 = cloneDeep(dataObject.multiplierArray);

    if (multiplierArray3 === undefined) {
      inputState.setState({ showWarningMessageBar: false });
      inputState.setState({ showErrorMessageBar: true });
      inputState.setState({ errorMessage: i18n.t('Cant find the Q sort pattern worksheet') });
      inputState.setState({ errorStackTrace: i18n.t('no stack trace available') });
      inputState.setState({
        extendedErrorMessage: i18n.t('Check the statements input and the Q sort pattern data'),
      });
      inputState.setState({ isLoadZipButtonGreen: false });
      inputState.setState({ isCsvDataErrorCheckButtonGreen: false });
      inputState.setState({ showDataImportSuccessMessage: false });
      throw new Error("Can't find the Q sort pattern worksheet!");
    }
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

    // QAV#8  Create Q sort Pattern Array
    let qSortPatternArray = calcQsortPatternArray(multiplierArray);

    // QAV#3  Number of Statements
    let numberOfStatements2 = [...multiplierArray];
    const numStatements = calcStatementsNum(numberOfStatements2);

    // QAV#6  Participant Sorts
    let sortData = cloneDeep(dataObject.sortsArray);
    const participantSorts2 = transformExcelType2Ver2Sorts(sortData, qSortPatternArray);
    const participantSorts = participantSorts2.sortsArray;
    if (participantSorts.length === 0) {
      inputState.setState({ showWarningMessageBar: false });
      inputState.setState({ showErrorMessageBar: true });
      inputState.setState({ errorMessage: i18n.t('No Q sorts found') });
      inputState.setState({ errorStackTrace: i18n.t('no stack trace available') });
      inputState.setState({ extendedErrorMessage: i18n.t('Check the Q sort data') });
      inputState.setState({ isLoadZipButtonGreen: false });
      inputState.setState({ isCsvDataErrorCheckButtonGreen: false });
      inputState.setState({ showDataImportSuccessMessage: false });
      throw new Error("Can't find the Q sort worksheet!");
    }

    // QAV#4  Participant Names
    const respondentNames = participantSorts2.namesArray;
    const participantNames = checkUniqueParticipantNames(respondentNames);

    // QAV#5  Number of Participants
    let numberOfParticipants = participantNames.length;

    // QAV#7  Project Statements
    let projectStatements2 = cloneDeep(dataObject.statementsArray);
    let projectStatements = transformExcelType2Ver2Statements(projectStatements2);

    // Create Statement Num Array
    let statementNumArray = createStatementNumArray(numStatements);

    // Create Excel Type 1 Nonsymmetric Array Text
    /*
    let excelType1NonsymmetricArrayText = createExcelType1NonsymmetricalArrayText(
      participantNames
    );
    */

    // Create Sorts Display Text
    let sortsDisplayText = createSortsDisplayText(participantNames, participantSorts);

    // Create Main Data Object
    let mainDataObject = createMainDataObject(participantNames, participantSorts);

    // Create Return Object
    projectHistoryState.setState({ projectHistoryArray: projectHistoryArray });
    coreState.setState({ projectName: projectName });
    coreState.setState({ multiplierArray: multiplierArray });
    coreState.setState({ statements: projectStatements });
    coreState.setState({ numQsorts: numberOfParticipants });
    coreState.setState({ qSortPattern: qSortPatternArray });
    coreState.setState({ numStatements: projectStatements.length });
    coreState.setState({ mainDataObject: mainDataObject });
    coreState.setState({ statementNumArray: statementNumArray });
    coreState.setState({ sortsDisplayText: sortsDisplayText });
    coreState.setState({ respondentNames: participantNames });
    inputState.setState({ areQsortsLoaded: true });
    inputState.setState({ isQsortPatternLoaded: true });
    inputState.setState({ statementsLoaded: true });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    console.log(error.stack);
  }

  return returnObject;
};

export default formatExcelType2Ver2ForDisplay;
