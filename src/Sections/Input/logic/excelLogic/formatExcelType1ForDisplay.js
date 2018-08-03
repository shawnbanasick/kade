import store from "../../../store";
import { getExcelT1SortText } from "./getExcelT1SortText";
import { getStatementsExcelT1 } from "./getStatementsExcelT1";
import { getRespondentNamesExcelT1 } from "./getRespondentNamesExcelT1";
import { getRespondentSortsExcelT1 } from "./getRespondentSortsExcelT1";
import createMainDataObject from "../excelUploadLogic/createMainDataObject";
import checkUniqueParticipantNames from '../../SortsList/checkUniqueParticipantName';
import { createMultiplierArrayAndTriangleShape } from "./createMultiplierArrayAndTriangleShape";

export function formatExcelType1ForDisplay(data) {
  try {
    // QAV #1  Project Name
    let projectName = data[0][0][1];

    // // QAV #2  -  todo - fix loop function
    let inputData1 = data[0];
    let createMultiplierAndQShapeData = createMultiplierArrayAndTriangleShape(
      inputData1
    );
    let multiplierArray = createMultiplierAndQShapeData[0];
    if (
      Math.min(...multiplierArray) === 0 &&
      Math.max(...multiplierArray) === 0
    ) {
      throw new Error(
        "Can't find the number of sorts for each column on the 'sorts' worksheet!"
      );
    }

    let sortTriangleShape = createMultiplierAndQShapeData[1];

    // QAV #3
    let numStatements = sortTriangleShape.length; // number of statements

    // creates array of objects with sort value and statement number
    let sortData = getExcelT1SortText(inputData1, numStatements);
    if (sortData[1].length === 0 && sortData[2].length === 0) {
      throw new Error("Can't find any Q-sorts on the 'sorts' worksheet!");
    }

    // QAV #4
    let namesData = sortData.shift();
    let respondentNames = getRespondentNamesExcelT1(namesData);

    // QAV #5
    let numQsorts = respondentNames.length;

    // QAV #6   respondent sorts
    let respondentDataSortsPrep = getRespondentSortsExcelT1(
      sortData,
      respondentNames,
      numStatements
    );
    let respondentSorts = respondentDataSortsPrep[0];
    let statementNumArray = respondentDataSortsPrep[1];

    // QAV #7   project statements
    let statementData1 = data[1];
    let statements = getStatementsExcelT1(statementData1);
    if (statements.length === 0) {
      throw new Error(
        "Can't find any statements on the 'statements' worksheet!"
      );
    }

    let sortsDisplayText = respondentNames.map(function(item, i) {
      return item + ": " + respondentSorts[i];
    });

    let mainDataObject = createMainDataObject(respondentNames, respondentSorts);
    let participantNames = checkUniqueParticipantNames(respondentNames);

    store.setState({
      projectHistoryArray: [
        projectName + " data loaded from Excel Type 1 file"
      ],
      statements: statements,
      sortsDisplayText: sortsDisplayText,
      projectName: projectName,
      numQsorts: numQsorts,
      numStatements: numStatements,
      qSortPattern: sortTriangleShape,
      mainDataObject: mainDataObject,
      multiplierArray: multiplierArray,
      statementNumArray: statementNumArray[0],
      respondentNames: participantNames
    });
  } catch (error) {
    console.log(error.message);
    console.log(error.stack);
    store.setState({
      excelErrorMessage1: error.message,
      showExcelErrorModal: true
    });
  }

  return;
}
