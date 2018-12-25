import store from "../../../../store";
import grabProjectStatements from "./grabProjectStatements";
import calcMultiplierArrayT2 from "./calcMultiplierArrayT2";
import createMainDataObject from "./createMainDataObject";
import calcSortTriangleShapeT2 from "./calcSortTriangleShapeT2";
import grabRespondentNamesAndSorts from "./grabRespondentNamesAndSorts";
import checkUniqueParticipantNames from "../../logic/checkUniqueParticipantName";

export default function formatype2ForDisplay(data) {
  try {
    // store #1
    const projectName1 = data[0][0][1];

    const projectName = projectName1.toString().replace(/,/g, "");

    // store #2 project history array
    const projectHistoryArray = [
      `${projectName} data loaded from Excel Type 2 file`
    ];

    // store #3
    const statementsDataT2 = data[1][0];
    const currentStatements = grabProjectStatements(statementsDataT2);
    if (currentStatements.length === 0) {
      throw new Error("Can't find any statements on 'statements' worksheet!");
    }

    // grab respondent names and sorts
    const sortsDataT2 = data[0][0];
    const calcSorts = grabRespondentNamesAndSorts(sortsDataT2);
    const respondentNames = calcSorts[0];
    const sortsDisplayText = calcSorts[1];
    const symmetryCheckArray = calcSorts[2];
    if (symmetryCheckArray.length === 0) {
      throw new Error("Can't find any Q-sorts on the 'sorts' worksheet!");
    }

    // store #4
    const totalNumberSorts = respondentNames.length;

    // calculate sort design array
    const calcSortTriangleT2 = calcSortTriangleShapeT2(data[0][0][3]);
    const copyTriangleShape = calcSortTriangleT2[0];
    if (copyTriangleShape.length < 3) {
      throw new Error("Can't find sort pattern on 'sorts' worksheet!");
    }
    // let testSortTriangleShapeArray = calcSortTriangleT2[1];
    const sortTriangleShape = calcSortTriangleT2[2];

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
    store.setState({ multiplierArray });

    // store #8  -  sort data
    const mainDataObject = createMainDataObject(
      respondentNames,
      symmetryCheckArray
    );

    const participantNames = checkUniqueParticipantNames(respondentNames);

    store.setState({
      projectName,
      projectHistoryArray,
      multiplierArray,
      statements: currentStatements,
      numQsorts: totalNumberSorts,
      qSortPattern: sortTriangleShape,
      numStatements: originalSortSize,
      mainDataObject,
      statementNumArray,
      sortsDisplayText,
      respondentNames: participantNames
    });
  } catch (error) {
    // console.log(error.message);
    // console.log(error.stack);
    store.setState({
      excelErrorMessage1: error.message,
      showExcelErrorModal: true
    });
  }
}
