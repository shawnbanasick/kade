import state from "../../../../store";
import getExcelT1SortText from "./getExcelT1SortText";
import getStatementsExcelT1 from "./getStatementsExcelT1";
import getRespondentNamesExcelT1 from "./getRespondentNamesExcelT1";
import getRespondentSortsExcelT1 from "./getRespondentSortsExcelT1";
import createMainDataObject from "./createMainDataObject";
import checkUniqueParticipantNames from "../../logic/checkUniqueParticipantName";
import createMultiplierArrayAndTriangleShape from "./createMultiplierArrayAndTriangleShape";

export default function formatExcelType1ForDisplay(data) {
  // console.log(JSON.stringify("called"));
  let outOfRangeError = false;
  let noSortsError = false;
  let noSortPatternError = false;
  let hasDuplicateStatementNumbers = false;
  let noHeaderMatchError = false;
  let numStatementsMatchError = false;

  // for sample download worksheet - sometimes adds empty array to start
  if (data[0].length === 0) {
    data.shift();
  }

  try {
    console.log(`3. formatExcelType1ForDisplay called`);

    // QAV #1  Project Name
    const projectName = data[0][0][1];

    // // QAV #2  -  todo - fix loop function
    const inputData1 = data[0];
    const createMultiplierAndQShapeData = createMultiplierArrayAndTriangleShape(
      inputData1
    );
    const multiplierArray = createMultiplierAndQShapeData[0];
    // check for sort pattern error
    if (
      Math.min(...multiplierArray) === 0 &&
      Math.max(...multiplierArray) === 0
    ) {
      noSortPatternError = true;
    }

    const sortTriangleShape = createMultiplierAndQShapeData[1];

    // QAV #3
    const numStatements = sortTriangleShape.length; // number of statements

    // creates array of objects with sort value and statement number
    const sortData = getExcelT1SortText(inputData1, numStatements);

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
    const statementNumArray = respondentDataSortsPrep[1];
    outOfRangeError = respondentDataSortsPrep[2];
    hasDuplicateStatementNumbers = respondentDataSortsPrep[3];

    // QAV #7   project statements
    const statementData1 = data[1];
    const statements = getStatementsExcelT1(statementData1);

    // catch too many / too few statements
    if (statements.length !== numStatements) {
      numStatementsMatchError = true;
    }

    const sortsDisplayText = respondentNames.map(
      (item, i) => `${item} : ${respondentSorts[i]}`
    );

    const mainDataObject = createMainDataObject(
      respondentNames,
      respondentSorts
    );
    const participantNames = checkUniqueParticipantNames(respondentNames);

    state.setState({
      projectHistoryArray: [
        `${projectName} data loaded from Excel Type 1 file`
      ],
      statements,
      sortsDisplayText,
      projectName,
      numQsorts,
      numStatements,
      qSortPattern: sortTriangleShape,
      mainDataObject,
      multiplierArray,
      statementNumArray: statementNumArray[0],
      respondentNames: participantNames
    });
  } catch (error) {
    console.log(error.message);
    console.log(error.stack);
    state.setState({
      excelErrorMessage1: error.message,
      showExcelErrorModal: true
    });
  }
  return [
    outOfRangeError,
    noSortsError,
    noSortPatternError,
    hasDuplicateStatementNumbers,
    noHeaderMatchError,
    numStatementsMatchError
  ];
}
