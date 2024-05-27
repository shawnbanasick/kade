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

  // TODO - Add error handling

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
      updateShowWarningMessageBar(false);
      updateShowErrorMessageBar(true);
      updateErrorMessage(i18n.t('Cant find the Q sort pattern worksheet'));
      updateErrorStackTrace(i18n.t('no stack trace available'));
      updateExtendedErrorMessage(i18n.t('Check the statements input and the Q sort pattern data'));
      updateIsLoadZipButtonGreen(false);
      updateIsCsvDataErrorCheckButtonGreen(false);
      updateShowDataImportSuccessMessage(false);
      throw new Error("Can't find the Q sort pattern worksheet!");
      /*
      inputState.showWarningMessageBar = false;
      inputState.showErrorMessageBar = true;
      inputState.errorMessage = i18n.t('Cant find the Q sort pattern worksheet');
      inputState.errorStackTrace = i18n.t('no stack trace available');
      inputState.extendedErrorMessage = i18n.t(
        'Check the statements input and the Q sort pattern data'
      );
      inputState.isLoadZipButtonGreen = false;
      inputState.isCsvDataErrorCheckButtonGreen = false;
      inputState.showDataImportSuccessMessage = false;
      throw new Error("Can't find the Q sort pattern worksheet!");
      */
    }
    let multiplierArray = cleanMultiplierArray(multiplierArray3);

    if (multiplierArray.length !== 20) {
      inputState.showWarningMessageBar = false;
      inputState.showErrorMessageBar = true;
      inputState.errorMessage = i18n.t('The Q sort pattern input is incorrect');
      inputState.errorStackTrace = i18n.t('no stack trace available');
      inputState.extendedErrorMessage = i18n.t('Check the Q sort pattern data');
      inputState.isLoadZipButtonGreen = false;
      inputState.isCsvDataErrorCheckButtonGreen = false;
      inputState.showDataImportSuccessMessage = false;
      throw new Error('Check the Q sort pattern data');
    }

    // QAV#8  Create Q sort Pattern Array
    let qSortPatternArray = calcQsortPatternArray(multiplierArray);
    //console.log("qSortPatternArray: ", qSortPatternArray);

    // QAV#3  Number of Statements
    let numberOfStatements2 = [...multiplierArray];
    const numStatements = calcStatementsNum(numberOfStatements2);
    //console.log("numStatements: ", numStatements);

    // QAV#6  Participant Sorts
    let sortData = cloneDeep(dataObject.sortsArray);
    const participantSorts2 = transformExcelType2Ver2Sorts(sortData, qSortPatternArray);
    const participantSorts = participantSorts2.sortsArray;
    if (participantSorts.length === 0) {
      inputState.showWarningMessageBar = false;
      inputState.showErrorMessageBar = true;
      inputState.errorMessage = i18n.t('No Q sorts found');
      inputState.errorStackTrace = i18n.t('no stack trace available');
      inputState.extendedErrorMessage = i18n.t('Check the Q sort data');
      inputState.isLoadZipButtonGreen = false;
      inputState.isCsvDataErrorCheckButtonGreen = false;
      inputState.showDataImportSuccessMessage = false;
      throw new Error("Can't find the Q sort worksheet!");
    }

    // QAV#4  Participant Names
    const respondentNames = participantSorts2.namesArray;
    const participantNames = checkUniqueParticipantNames(respondentNames);

    //console.log("participantNames: ", participantNames);

    // QAV#5  Number of Participants
    let numberOfParticipants = participantNames.length;
    //console.log("numberOfParticipants: ", numberOfParticipants);

    // QAV#7  Project Statements
    let projectStatements2 = cloneDeep(dataObject.statementsArray);
    //console.log("projectStatements2: ", [projectStatements2]);
    let projectStatements = transformExcelType2Ver2Statements(projectStatements2);
    //console.log("projectStatements: ", projectStatements);

    // Create Statement Num Array
    let statementNumArray = createStatementNumArray(numStatements);
    //console.log("statementNumArray: ", statementNumArray);

    // Create Excel Type 1 Nonsymmetric Array Text
    /*
    let excelType1NonsymmetricArrayText = createExcelType1NonsymmetricalArrayText(
      participantNames
    );
    */
    //console.log("nonsymmetricArrayText: ", excelType1NonsymmetricArrayText);

    // Create Sorts Display Text
    let sortsDisplayText = createSortsDisplayText(participantNames, participantSorts);
    //console.log("sortsDisplayText: ", sortsDisplayText);

    // Create Main Data Object
    let mainDataObject = createMainDataObject(participantNames, participantSorts);
    //console.log("mainDataObject: ", JSON.stringify(mainDataObject));

    // Create Return Object

    projectHistoryState.projectHistoryArray = projectHistoryArray;
    coreState.projectName = projectName;
    coreState.multiplierArray = multiplierArray;
    coreState.statements = projectStatements;
    coreState.numQsorts = numberOfParticipants;
    coreState.qSortPattern = qSortPatternArray;
    coreState.numStatements = projectStatements.length;
    coreState.mainDataObject = mainDataObject;
    coreState.statementNumArray = statementNumArray;
    coreState.sortsDisplayText = sortsDisplayText;
    coreState.respondentNames = participantNames;
    inputState.areQsortsLoaded = true;
    inputState.isQsortPatternLoaded = true;
    inputState.statementsLoaded = true;
    //  excelType1NonsymmetricArrayText
  } catch (error) {
    console.log(error);
    console.log(error.message);
    console.log(error.stack);
  }

  return returnObject;
};

export default formatExcelType2Ver2ForDisplay;
