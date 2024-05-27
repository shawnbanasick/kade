import getExcelT1SortText from './getExcelT1SortText';
import getStatementsExcelT1 from './getStatementsExcelT1';
import getRespondentNamesExcelT1 from './getRespondentNamesExcelT1';
import getRespondentSortsExcelT1 from './getRespondentSortsExcelT1';
import createMainDataObject from './createMainDataObject';
import checkUniqueParticipantNames from '../../logic/checkUniqueParticipantNames';
import createMultiplierArrayAndTriangleShape from './createMultiplierArrayAndTriangleShape';
import projectHistoryState from '../../../GlobalState/projectHistoryState';
import i18n from 'i18next';
import coreState from '../../../GlobalState/coreState';
import inputState from '../../../GlobalState/inputState';
import cloneDeep from 'lodash/cloneDeep';

export default function formatExcelType1ForDisplay(rawStatementsData, rawSortsData) {
  let outOfRangeError = false;
  let noSortsError = false;
  let noSortPatternError = false;
  let hasDuplicateStatementNumbers = false;
  let noHeaderMatchError = false;
  let numStatementsMatchError = false;
  let missingStatementNumberError = false;

  const updateStatements = coreState((state) => state.updateStatements);
  const updateSortsDisplayText = coreState((state) => state.updateSortsDisplayText);
  const updateProjectName = coreState((state) => state.updateProjectName);
  const updateNumQsorts = coreState((state) => state.updateNumQsorts);
  const updateNumStatements = coreState((state) => state.updateNumStatements);
  const updateQSortPattern = coreState((state) => state.updateQSortPattern);
  const updateMainDataObject = coreState((state) => state.updateMainDataObject);
  const updateMultiplierArray = coreState((state) => state.updateMultiplierArray);
  const updateRespondentNames = coreState((state) => state.updateRespondentNames);
  const updateAreQsortsLoaded = inputState((state) => state.updateAreQsortsLoaded);
  const updateIsQsortPatternLoaded = inputState((state) => state.updateIsQsortPatternLoaded);
  const updateExcelErrorMessage1 = inputState((state) => state.updateExcelErrorMessage1);
  const updateShowExcelErrorModal = inputState((state) => state.updateShowExcelErrorModal);
  const updateStatementsLoaded = inputState((state) => state.updateStatementsLoaded);

  try {
    console.log(`3. formatExcelType1ForDisplay called`);

    // QAV #1  Project Name
    const projectName = rawSortsData[0][1];

    // QAV #2  -  todo - fix loop function
    const inputData1 = cloneDeep(rawSortsData);
    const createMultiplierAndQShapeData = createMultiplierArrayAndTriangleShape(inputData1);
    const multiplierArray = createMultiplierAndQShapeData[0];
    // check for sort pattern error
    if (Math.min(...multiplierArray) === 0 && Math.max(...multiplierArray) === 0) {
      noSortPatternError = true;
    }

    const sortTriangleShape = createMultiplierAndQShapeData[1];

    // QAV #3
    const numStatements = sortTriangleShape.length; // number of statements

    // creates array of objects with sort value and statement number
    const inputData2 = rawSortsData.slice();
    const sortData = getExcelT1SortText(inputData2, numStatements);

    if (sortData[1].length === 0 && sortData[2].length === 0) {
      noSortsError = true;
    }

    // QAV #4
    const namesData = sortData.shift();
    const respondentNames = getRespondentNamesExcelT1(namesData);

    // test for too many headers
    if (sortData[0].length !== respondentNames.length) {
      noHeaderMatchError = true;
    }

    // QAV #5
    const numQsorts = respondentNames.length;

    // QAV #6   respondent sorts
    const respondentDataSortsPrep = getRespondentSortsExcelT1(
      sortData,
      respondentNames,
      numStatements
    );
    const respondentSorts = respondentDataSortsPrep[0];
    // const statementNumArray = respondentDataSortsPrep[1];
    outOfRangeError = respondentDataSortsPrep[2];
    hasDuplicateStatementNumbers = respondentDataSortsPrep[3];
    missingStatementNumberError = respondentDataSortsPrep[4];

    // QAV #7   project statements
    const statementData1 = rawStatementsData;
    const statements = getStatementsExcelT1(statementData1);

    // catch too many / too few statements
    if (statements.length !== numStatements) {
      numStatementsMatchError = true;
    } else {
      updateStatementsLoaded(true);
    }

    const sortsDisplayText = respondentNames.map((item, i) => `${item} : ${respondentSorts[i]}`);

    const mainDataObject = createMainDataObject(respondentNames, respondentSorts);
    const participantNames = checkUniqueParticipantNames(respondentNames);

    const logMessageObj1 = {
      logMessage: `${projectName} ${i18n.t('data loaded from XLSX Type 1 file')}`,
      logType: 'excelInput',
    };

    projectHistoryState.projectHistoryArray = [logMessageObj1];

    updateStatements(statements);
    updateSortsDisplayText(sortsDisplayText);
    updateProjectName(projectName);
    updateNumQsorts(numQsorts);
    updateNumStatements(numStatements);
    updateQSortPattern(sortTriangleShape);
    updateMainDataObject(mainDataObject);
    updateMultiplierArray(multiplierArray);
    updateRespondentNames(participantNames);
    updateAreQsortsLoaded(true);
    updateIsQsortPatternLoaded(true);
  } catch (error) {
    console.log(error.message);
    console.log(error.stack);
    updateExcelErrorMessage1(error.message);
    updateShowExcelErrorModal(true);
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
}
