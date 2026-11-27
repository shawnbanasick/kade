import i18n from 'i18next';
import cloneDeep from 'lodash/cloneDeep';

import checkUniqueParticipantNames from '../../logic/checkUniqueParticipantNames';
import createMainDataObject from './createMainDataObject';
import cleanMultiplierArray from './cleanMultiplierArray';
import createStatementNumArray from './createStatementNumArray';
import calcStatementsNum from './calcStatementsNum';
import transformExcelType1Ver2Sorts from './transformExcelType1Ver2Sorts';
import extremeValueErrorCheck from './extremeValueErrorCheck';
import transformExcelType1Ver2Statements from './transformExcelType1Ver2Statements';
import calcQsortPatternArray from './calcQsortPatternArray';
import sortErrorCheckT2 from './sortErrorCheckT2';
import createSortsDisplayText from './createSortsDisplayText';

const formatExcelType1Ver2ForDisplay = (dataObject, errorObject) => {
  // TODO - Add more error handling

  try {
    // QAV#1  Project Name
    const projectName = dataObject.projectName;

    // QAV#2  Multiplier Array
    const multiplierArray3 = cloneDeep(dataObject.multiplierArray);
    const multiplierArray = cleanMultiplierArray(multiplierArray3);

    if (
      !Array.isArray(multiplierArray) ||
      multiplierArray.length !== 20 ||
      !Array.from(multiplierArray).every((value) => Number.isInteger(value) && value >= 0)
    ) {
      errorObject.hasError = true;
      errorObject.noSortPatternError = true;
      errorObject.errorMessage = i18n.t('The Q sort pattern input is incorrect');
      errorObject.extendedErrorMessage = i18n.t('Check the Q sort pattern data');
      errorObject.errorStackTrace = i18n.t('no stack trace available');

      return { errorObject };
    }
    // QAV#3  Number of Statements
    const numberOfStatements2 = [...multiplierArray];
    const numStatements = calcStatementsNum(numberOfStatements2);

    // QAV#4  Participant Names
    const headerRow = dataObject.sortsArray?.[0];

    if (!Array.isArray(headerRow)) {
      throw new Error('Participant header row is missing or invalid');
    }

    const participantNames3a = [...headerRow].slice(1);
    const participantNames3 = participantNames3a.filter((item) => item);

    let participantNames = checkUniqueParticipantNames(participantNames3);

    // QAV#5  Number of Participants
    let numberOfParticipants = participantNames?.length;

    // QAV#6  Participant Sorts
    let sortData = cloneDeep(dataObject?.sortsArray);

    const participantSorts2 = transformExcelType1Ver2Sorts(
      sortData,
      numStatements,
      participantNames,
      errorObject
    );

    if (participantSorts2.errorObject.hasError) {
      return { errorObject: participantSorts2.errorObject };
    }

    let participantSorts = cloneDeep(participantSorts2.participantSorts);

    if (participantSorts.length !== numberOfParticipants || participantSorts.length === 0) {
      errorObject.hasError = true;
      errorObject.noSortsError = true;
      errorObject.errorMessage = i18n.t('Participant data and Q sort data do not match');
      errorObject.extendedErrorMessage = i18n.t('Check the Q sort data');
      errorObject.errorStackTrace = i18n.t('no stack trace available');
      return { errorObject };
    }

    // Error Checking
    const extremeValueErrorCheckResult = extremeValueErrorCheck(participantSorts2, errorObject);

    if (extremeValueErrorCheckResult.errorObject.hasError) {
      return { errorObject: extremeValueErrorCheckResult.errorObject };
    }

    // QAV#7  Project Statements
    let projectStatements2 = cloneDeep(dataObject.statementsArray);

    let projectStatements = transformExcelType1Ver2Statements(projectStatements2);

    // QAV#8  Create Q sort Pattern Array
    let qSortPatternArray = calcQsortPatternArray(multiplierArray);

    if (qSortPatternArray.length !== projectStatements.length) {
      errorObject.hasError = true;
      errorObject.noSortPatternError = true;
      errorObject.errorMessage = i18n.t(
        'The Q sort pattern input or number of statements is incorrect'
      );
      errorObject.extendedErrorMessage = i18n.t(
        'Check the statements input and the Q sort pattern data'
      );
      errorObject.errorStackTrace = i18n.t('no stack trace available');
      return { errorObject };
    }

    // Error Checking
    const sortErrorCheckT2Result = sortErrorCheckT2(
      qSortPatternArray,
      participantSorts,
      participantNames,
      errorObject
    );

    if (sortErrorCheckT2Result.errorObject.hasError) {
      return { errorObject: sortErrorCheckT2Result.errorObject };
    }

    // Create Statement Num Array (simple array of numbers from 1 to numStatements)
    let statementNumArray = createStatementNumArray(numStatements);

    // Create Sorts Display Text
    let sortsDisplayText = createSortsDisplayText(participantNames, participantSorts);

    // Create Main Data Object
    let mainDataObject = createMainDataObject(participantNames, participantSorts);

    // ** OUTPUT PROCESSING ** //

    const logMessageObj1 = {
      logMessage: `${projectName} ${i18n.t('data loaded from XLSX Type 1 file')}`,
      logType: 'excelInput',
    };

    return {
      projectHistoryArray: [logMessageObj1],
      statements: projectStatements,
      sortsDisplayText: sortsDisplayText,
      projectName: projectName,
      numQsorts: numberOfParticipants,
      numStatements: numStatements,
      qSortPattern: qSortPatternArray,
      mainDataObject: mainDataObject,
      multiplierArray: multiplierArray,
      statementNumArray: statementNumArray,
      respondentNames: participantNames,
      errorObject,
    };
  } catch (error) {
    console.error(error);

    errorObject.hasError = true;
    errorObject.errorMessage = i18n.t('An error occurred while processing the Excel file');
    errorObject.extendedErrorMessage = error?.message ?? String(error);
    errorObject.errorStackTrace = error?.stack ?? i18n.t('no stack trace available');

    return { errorObject };
  }
};

export default formatExcelType1Ver2ForDisplay;
