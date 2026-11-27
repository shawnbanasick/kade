import cloneDeep from 'lodash/cloneDeep';
import i18n from 'i18next';

import cleanMultiplierArray from './cleanMultiplierArray';
import transformExcelType2Ver2Statements from './transformExcelType2Ver2Statements';
import calcQsortPatternArray from './calcQsortPatternArray';
import createSortsDisplayText from './createSortsDisplayText';
import createMainDataObject from './createMainDataObject';
import transformExcelType2Ver2Sorts from './transformExcelType2Ver2Sorts';
import checkUniqueParticipantNames from '../../logic/checkUniqueParticipantNames';
import createStatementNumArray from './createStatementNumArray';

const formatExcelType2Ver2ForDisplay = (dataObject, errorObject) => {
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
      errorObject.hasError = true;
      errorObject.errorMessage = i18n.t('Cant find the Q sort pattern worksheet');
      errorObject.errorStackTrace = i18n.t('no stack trace available');
      errorObject.extendedErrorMessage = i18n.t(
        'Check the statements input and the Q sort pattern data'
      );
      return { errorObject };
    }
    let multiplierArray = cleanMultiplierArray(multiplierArray3);

    if (multiplierArray?.length !== 20) {
      errorObject.hasError = true;
      errorObject.errorMessage = i18n.t('The Q sort pattern input is incorrect');
      errorObject.errorStackTrace = i18n.t('no stack trace available');
      errorObject.extendedErrorMessage = i18n.t('Check the Q sort pattern data');
      return { errorObject };
    }

    // QAV#8  Create Q sort Pattern Array
    let qSortPatternArray = calcQsortPatternArray(multiplierArray);

    // QAV#6  Participant Sorts
    let sortData = cloneDeep(dataObject.sortsArray);
    const participantSorts2 = transformExcelType2Ver2Sorts(
      sortData,
      qSortPatternArray,
      errorObject
    );

    if (participantSorts2.errorObject?.hasError) {
      return { errorObject: participantSorts2.errorObject };
    }

    const participantSorts = participantSorts2.sortsArray;

    if (participantSorts.nonNumericArray?.length > 0) {
      errorObject.hasError = true;
      errorObject.errorMessage = i18n.t('The Q sorts contain a non-numeric value');
      errorObject.errorStackTrace = i18n.t('no stack trace available');
      errorObject.extendedErrorMessage = i18n.t('Check the Q sort data for non-numeric values');
      return { errorObject };
    }

    if (participantSorts?.length === 0) {
      errorObject.hasError = true;
      errorObject.errorMessage = i18n.t('No Q sorts found');
      errorObject.errorStackTrace = i18n.t('no stack trace available');
      errorObject.extendedErrorMessage = i18n.t('Check the Q sort data');
      return { errorObject };
    }

    // QAV#4  Participant Names
    const respondentNames = participantSorts2.namesArray;
    const participantNames = checkUniqueParticipantNames(respondentNames);

    // QAV#5  Number of Participants
    let numberOfParticipants = participantNames?.length;

    // QAV#7  Project Statements
    let projectStatements2 = cloneDeep(dataObject.statementsArray);
    let projectStatements = transformExcelType2Ver2Statements(projectStatements2);

    // QAV#3  Number of Statements
    const numStatements = projectStatements?.length;

    if (qSortPatternArray?.length !== projectStatements?.length) {
      errorObject.hasError = true;
      errorObject.errorMessage = i18n.t(
        'The number of statements does not match the Q sort pattern'
      );
      errorObject.errorStackTrace = i18n.t('no stack trace available');
      errorObject.extendedErrorMessage = i18n.t(
        'Check the statements input and the Q sort pattern data'
      );
      return { errorObject };
    }

    // Create Statement Num Array
    let statementNumArray = createStatementNumArray(numStatements);

    // Create Sorts Display Text
    let sortsDisplayText = createSortsDisplayText(participantNames, participantSorts);

    // Create Main Data Object
    let mainDataObject = createMainDataObject(participantNames, participantSorts);

    return {
      projectHistoryArray: projectHistoryArray,
      projectName: projectName,
      multiplierArray: multiplierArray,
      statements: projectStatements,
      numQsorts: numberOfParticipants,
      qSortPattern: qSortPatternArray,
      numStatements: projectStatements?.length,
      mainDataObject: mainDataObject,
      statementNumArray: statementNumArray,
      sortsDisplayText: sortsDisplayText,
      respondentNames: participantNames,
      errorObject: errorObject,
    };
  } catch (error) {
    console.log(error);
    console.log(error.message);
    console.log(error.stack);
    errorObject.hasError = true;
    errorObject.errorMessage = i18n.t('There was an unexpected XSLX data input error');
    errorObject.errorStackTrace = i18n.t('no stack trace available');
    errorObject.extendedErrorMessage = i18n.t('Check the format of the file and try again');
    return { errorObject };
  }
};

export default formatExcelType2Ver2ForDisplay;
