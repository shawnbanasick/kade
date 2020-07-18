import grabProjectStatements from "./grabProjectStatements";
import calcMultiplierArrayT2 from "./calcMultiplierArrayT2";
import createMainDataObject from "./createMainDataObject";
import calcSortTriangleShapeT2 from "./calcSortTriangleShapeT2";
import grabRespondentNamesAndSorts from "./grabRespondentNamesAndSorts";
import checkUniqueParticipantNames from "../../logic/checkUniqueParticipantName";
import projectHistoryState from "../../../GlobalState/projectHistoryState";
import coreState from "../../../GlobalState/coreState";
import inputState from "../../../GlobalState/inputState";

export default function formatype2ForDisplay(rawStatementsData, rawSortsData) {
  let noSortPatternError = false;
  let numStatementsMatchError = false;

  try {
    // store #1
    const projectName1 = rawSortsData[0][1];
    // console.log('TCL: exportdefaultfunctionformatype2ForDisplay -> rawSortsData', rawSortsData)
    const projectName = projectName1.toString().replace(/,/g, "");

    // store #2 project history array
    const logMessageObj1 = {
      logMessage: `${projectName} data loaded from Excel Type 2 file`,
      logType: "excel2Input"
    };

    const projectHistoryArray = [logMessageObj1];

    // store #3
    // const statementsDataT2 = rawStatementsData;
    const currentStatements = grabProjectStatements(rawStatementsData[0]);

    // grab respondent names and sorts
    const sortsDataT2 = rawSortsData[0];
    const calcSorts = grabRespondentNamesAndSorts(sortsDataT2);
    const respondentNames = calcSorts[0];
    const sortsDisplayText = calcSorts[1];
    const symmetryCheckArray = calcSorts[2];

    // store #4
    const totalNumberSorts = respondentNames.length;

    // calculate sort design array
    const calcSortTriangleT2 = calcSortTriangleShapeT2(rawSortsData[0][3]);
    const copyTriangleShape = calcSortTriangleT2[0];
    if (copyTriangleShape.length < 3) {
      noSortPatternError = true;
    }
    // let testSortTriangleShapeArray = calcSortTriangleT2[1];
    const sortTriangleShape = calcSortTriangleT2[2];

    // statement number match
    if (currentStatements.length !== sortTriangleShape.length) {
      numStatementsMatchError = true;
    }

    // store #5 - set Q-sort size (number of statements)
    const originalSortSize = sortTriangleShape.length; // number of statements

    // store #6  -  statement number array
    const statementNumArray = [];
    for (let i = 0; i < currentStatements.length; i += 1) {
      statementNumArray.push(i + 1);
    }

    // store #7 - multiplierArray
    let multiplierArray = [];

    multiplierArray = calcMultiplierArrayT2(copyTriangleShape);
    coreState.multiplierArray = multiplierArray;

    // store #8  -  sort data
    const mainDataObject = createMainDataObject(
      respondentNames,
      symmetryCheckArray
    );

    const participantNames = checkUniqueParticipantNames(respondentNames);

    projectHistoryState.projectHistoryArray = projectHistoryArray;
    coreState.projectName = projectName;
    coreState.multiplierArray = multiplierArray;
    coreState.statements = currentStatements;
    coreState.numQsorts = totalNumberSorts;
    coreState.qSortPattern = sortTriangleShape;
    coreState.numStatements = originalSortSize;
    coreState.mainDataObject = mainDataObject;
    coreState.statementNumArray = statementNumArray;
    coreState.sortsDisplayText = sortsDisplayText;
    coreState.respondentNames = participantNames;
  } catch (error) {
    console.log(error.message);
    console.log(error.stack);
    inputState.excelErrorMessage1 = error.message;
    inputState.showExcelErrorModal = true;
  }
  return [noSortPatternError, numStatementsMatchError];
}
