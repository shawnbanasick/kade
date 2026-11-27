import i18n from 'i18next';
import cloneDeep from 'lodash/cloneDeep';

import getExcelT1SortText from './getExcelT1SortText';
import getStatementsExcelT1 from './getStatementsExcelT1';
import getRespondentNamesExcelT1 from './getRespondentNamesExcelT1';
import getRespondentSortsExcelT1 from './getRespondentSortsExcelT1';
import createMainDataObject from './createMainDataObject';
import checkUniqueParticipantNames from '../../logic/checkUniqueParticipantNames';
import createMultiplierArrayAndTriangleShape from './createMultiplierArrayAndTriangleShape';

export default function formatExcelType1ForDisplay(rawStatementsData, rawSortsData, errorObject) {
  try {
    console.log(`3. formatExcelType1ForDisplay called`);

    // QAV #1  Project Name
    const projectName = rawSortsData[0][1];

    // QAV #2  -  todo - fix loop function
    const inputData1 = cloneDeep(rawSortsData);

    const { multiplierArray, sortTriangleShape } =
      createMultiplierArrayAndTriangleShape(inputData1);

    const checkSum = multiplierArray.reduce((acc, val) => acc + val, 0);

    console.log(`4. multiplierArray: ${multiplierArray}`);
    console.log(`5. sortTriangleShape: ${sortTriangleShape}`);
    console.log(`6. checkSum: ${checkSum}`);

    if (checkSum !== sortTriangleShape?.length) {
      errorObject.hasError = true;
      errorObject.noSortPatternError = true;
      errorObject.errorMessage = i18n.t('The Q sort pattern input is incorrect');
      errorObject.extendedErrorMessage = i18n.t('Check the Q sort pattern data');
      errorObject.errorStackTrace = `${i18n.t('no stack trace available')} (error fet1fd-36)`;
      return { errorObject };
    }

    // check for sort pattern error
    if (Math.min(...multiplierArray) === 0 && Math.max(...multiplierArray) === 0) {
      errorObject.hasError = true;
      errorObject.noSortPatternError = true;
      errorObject.errorMessage = i18n.t('The Q sort pattern input is incorrect');
      errorObject.extendedErrorMessage = i18n.t('Check the Q sort pattern data');
      errorObject.errorStackTrace = `${i18n.t('no stack trace available')} (error fet1fd-46)`;
      return { errorObject };
    }

    if (multiplierArray?.length !== 20) {
      errorObject.hasError = true;
      errorObject.noSortPatternError = true;
      errorObject.errorMessage = i18n.t('The Q sort pattern input is incorrect');
      errorObject.extendedErrorMessage = i18n.t('Check the Q sort pattern data');
      errorObject.errorStackTrace = `${i18n.t('no stack trace available')} (error fet1fd-56)`;
      return { errorObject };
    }

    // QAV #3
    const numStatements = sortTriangleShape?.length; // number of statements

    // creates array of objects with sort value and statement number
    const inputData2 = cloneDeep(rawSortsData);
    const sortData = getExcelT1SortText(inputData2, numStatements);

    console.log(`7. sortData: ${JSON.stringify(sortData[1])}`);

    if (sortData?.[1]?.length === 0 && sortData?.[2]?.length === 0) {
      errorObject.hasError = true;
      errorObject.noSortsError = true;
      errorObject.errorMessage = i18n.t('No Q sorts found');
      errorObject.extendedErrorMessage = i18n.t('Check the Q sort data');
      errorObject.errorStackTrace = `${i18n.t('no stack trace available')} (error fet1fd-80)`;
      return { errorObject };
    }

    // QAV #4
    const namesData = sortData?.shift();
    const respondentNames = getRespondentNamesExcelT1(namesData);

    // test for too many headers
    if (sortData[0]?.length !== respondentNames?.length) {
      errorObject.hasError = true;
      errorObject.noHeaderMatchError = true;
      errorObject.errorMessage = i18n.t('The Q sort data input is incorrect');
      errorObject.extendedErrorMessage = i18n.t('Check the Q sort data');
      errorObject.errorStackTrace = `${i18n.t('no stack trace available')} (error fet1fd-94)`;
      return { errorObject };
    }

    // QAV #5
    const numQsorts = respondentNames?.length;

    // QAV #6   respondent sorts
    const getRespondentSorts = getRespondentSortsExcelT1(
      sortData,
      respondentNames,
      numStatements,
      errorObject
    );

    const respondentSorts = getRespondentSorts?.respondentSorts;

    if (respondentSorts?.[1]?.length !== checkSum) {
      errorObject.hasError = true;
      errorObject.noSortPatternError = true;
      errorObject.errorMessage = i18n.t('The Q sort pattern input is incorrect');
      errorObject.extendedErrorMessage = i18n.t('Check the Q sort pattern data');
      errorObject.errorStackTrace = `${i18n.t('no stack trace available')} (error fet1fd-71)`;
      return { errorObject };
    }

    if (getRespondentSorts?.errorObject?.hasError) {
      errorObject.hasError = true;
      errorObject.errorMessage = getRespondentSorts?.errorObject?.errorMessage;
      errorObject.extendedErrorMessage = getRespondentSorts?.errorObject?.extendedErrorMessage;
      errorObject.errorStackTrace = getRespondentSorts?.errorObject?.errorStackTrace;
      return { errorObject };
    }

    // QAV #7   project statements
    const statementData1 = rawStatementsData;
    const statements = getStatementsExcelT1(statementData1);

    //** TOO MANY / TOO FEW STATEMENTS **//
    if (statements?.length !== numStatements) {
      errorObject.hasError = true;
      errorObject.errorMessage = i18n.t(
        'The number of statements does not match the expected number'
      );
      errorObject.extendedErrorMessage = i18n.t('Check the statements input');
      errorObject.errorStackTrace = i18n.t('no stack trace available');
      return { errorObject };
    }

    const sortsDisplayText = respondentNames?.map((item, i) => `${item} : ${respondentSorts[i]}`);
    const mainDataObject = createMainDataObject(respondentNames, respondentSorts);
    const participantNames = checkUniqueParticipantNames(respondentNames);

    const logMessageObj1 = {
      logMessage: `${projectName} ${i18n.t('data loaded from XLSX Type 1 file')}`,
      logType: 'excelInput',
    };

    return {
      projectHistoryArray: [logMessageObj1],
      statements,
      sortsDisplayText,
      projectName,
      numQsorts,
      numStatements,
      qSortPattern: sortTriangleShape,
      mainDataObject,
      multiplierArray,
      participantNames,
      errorObject,
    };
  } catch (error) {
    console.error(error);
    console.log(error.message);
    console.log(error.stack);
    errorObject.hasError = true;
    errorObject.errorMessage = i18n.t('There was an unexpected XSLX data input error');
    errorObject.errorStackTrace = i18n.t('no stack trace available');
    errorObject.extendedErrorMessage = i18n.t('Check the format of the file and try again');
    return { errorObject };
  }
}
