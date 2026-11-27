import i18n from 'i18next';

import grabProjectStatements from './grabProjectStatements';
import calcMultiplierArrayT2 from './calcMultiplierArrayT2';
import createMainDataObject from './createMainDataObject';
import calcSortTriangleShapeT2 from './calcSortTriangleShapeT2';
import grabRespondentNamesAndSorts from './grabRespondentNamesAndSorts';
import checkUniqueParticipantNames from '../../logic/checkUniqueParticipantNames';

export default function formatExcelType2ForDisplay(rawStatementsData, rawSortsData, errorObject) {
  try {
    // store #1
    const projectName1 = rawSortsData[0][1];
    const projectName = projectName1.toString().replace(/,/g, '');

    // store #2 project history array
    const logMessageObj1 = {
      logMessage: `${projectName} data loaded from XLSX Type 2 file`,
      logType: 'excel2Input',
    };

    const projectHistoryArray = [logMessageObj1];

    // store #3
    const currentStatements = grabProjectStatements(rawStatementsData[0]);

    // grab respondent names and sorts
    const sortsDataT2 = rawSortsData[0];
    const calcSorts = grabRespondentNamesAndSorts(sortsDataT2);
    const respondentNames = calcSorts[0];
    const sortsDisplayText = calcSorts[1];
    const symmetryCheckArray = calcSorts[2];

    // store #4
    const totalNumberSorts = respondentNames?.length;

    // calculate sort design array
    const calcSortTriangleT2 = calcSortTriangleShapeT2(rawSortsData[0][3]);
    const copyTriangleShape = calcSortTriangleT2[0];
    if (copyTriangleShape?.length < 3) {
      errorObject.hasError = true;
      errorObject.errorMessage = i18n.t('The Q sort pattern is invalid');
      errorObject.errorStackTrace = i18n.t('no stack trace available');
      errorObject.extendedErrorMessage = i18n.t('Check the Q sort pattern data');
      return { errorObject };
    }
    const sortTriangleShape = calcSortTriangleT2[2];

    // statement number match
    if (currentStatements?.length !== sortTriangleShape?.length) {
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

    // store #5 - set Q-sort size (number of statements)
    const originalSortSize = sortTriangleShape?.length; // number of statements

    // store #6  -  statement number array
    const statementNumArray = [];
    for (let i = 0; i < currentStatements?.length; i += 1) {
      statementNumArray.push(i + 1);
    }

    // store #7 - multiplierArray
    let multiplierArray = [];

    multiplierArray = calcMultiplierArrayT2(copyTriangleShape);

    // store #8  -  sort data
    const mainDataObject = createMainDataObject(respondentNames, symmetryCheckArray);

    const participantNames = checkUniqueParticipantNames(respondentNames);

    console.log('projectName', projectName);
    console.log('projectHistoryArray', projectHistoryArray);
    console.log('currentStatements', currentStatements);
    console.log('totalNumberSorts', totalNumberSorts);
    console.log('sortTriangleShape', sortTriangleShape);
    console.log('originalSortSize', originalSortSize);
    console.log('statementNumArray', statementNumArray);
    console.log('multiplierArray', multiplierArray);
    console.log('mainDataObject', mainDataObject);
    console.log('sortsDisplayText', sortsDisplayText);
    console.log('respondentNames', respondentNames);

    return {
      projectHistoryArray: projectHistoryArray,
      projectName: projectName,
      multiplierArray: multiplierArray,
      statements: currentStatements,
      numQsorts: totalNumberSorts,
      qSortPattern: sortTriangleShape,
      numStatements: originalSortSize,
      mainDataObject: mainDataObject,
      statementNumArray: statementNumArray,
      sortsDisplayText: sortsDisplayText,
      respondentNames: participantNames,
      errorObject: errorObject,
    };
  } catch (error) {
    console.log(error.message);
    console.log(error.stack);
    errorObject.errorMessage = i18n.t('There was an unexpected XSLX data input error');
    errorObject.errorStackTrace = i18n.t('no stack trace available');
    errorObject.extendedErrorMessage = i18n.t('Check the format of the file and try again');
    return { errorObject };
  }
}
