import store from "../../../store";
import grabSortsT3 from "./grabSortsT3";
import grabStatementsT3 from "./grabStatementsT3";
import createMainDataObject from "./createMainDataObject";
import calcMultiplierArrayT2 from "./calcMultiplierArrayT2";
import grabRespondentNamesT3 from "./grabRespondentNamesT3";
import checkUniqueParticipantNames from '../../SortsList/checkUniqueParticipantName';

const formatype3ForDisplay = function(data) {
  try {
    // store #1
    let projectNameString = data[0][1][0];
    projectNameString = projectNameString.split(",");
    let projectName = projectNameString[1];

    // store #2
    let projectHistoryArray = [
      projectName + " data loaded from Excel Type 3 file"
    ];

    // store #3 - Q-sort pattern
    let qSortPattern1 = data[0][5][0].toString();
    if (qSortPattern1.length < 18) {
      throw new Error(
        "Can't find Q-sort pattern on 'Analysis Overview' worksheet!"
      );
    }
    console.log("qsortpattern: " + JSON.stringify(qSortPattern1.length));
    let qSortPattern2 = qSortPattern1
      .split("\\")
      .toString()
      .split('"');
    let qSortPattern = qSortPattern2[1].split(",").map(Number);

    // store #4 - multiplierArray
    let multiplierArray = calcMultiplierArrayT2([...qSortPattern]);

    // store #5 - numStatements
    let numStatements = qSortPattern.length; // number of statements

    // store #6 - respondent names
    let respondentNames = grabRespondentNamesT3(data[2]);

    // store #7 - number of sorts
    let numQsorts = respondentNames.length;

    // store #8 - respondent sorts
    let respondentSorts = grabSortsT3(data[2], numStatements);
    if (respondentSorts.length === 0) {
      throw new Error("Cant't find any q-sorts on 'Q-sorts' worksheet!");
    }
    console.log("respondent sorts : " + JSON.stringify(respondentSorts));

    // store #9 - get statements
    let currentStatements = grabStatementsT3(data[1]);
    let errorCheck = currentStatements.filter(
      statement => statement.length > 0
    );
    if (errorCheck.length === 0) {
      throw new Error(
        "Can't find any statements on the 'Statements' worksheet!"
      );
    }

    // store #10 mainDataObject
    let mainDataObject = createMainDataObject(respondentNames, respondentSorts);

    // store #11 statements number array
    let statementNumArray = [];
    for (let i = 0; i < currentStatements.length; i++) {
      statementNumArray.push(i + 1);
    }

    // store #12 - sorts display text
    let sortsDisplayText = [];
    for (let k = 0; k < respondentNames.length; k++) {
      let tempVar =
        mainDataObject[k].name + "," + mainDataObject[k].displaySort;
      sortsDisplayText.push(tempVar);
    }

    let participantNames = checkUniqueParticipantNames(respondentNames);

    store.setState({
      projectName: projectName,
      projectHistoryArray: projectHistoryArray,
      qSortPattern: qSortPattern,
      multiplierArray: multiplierArray,
      numStatements: numStatements,
      respondentNames: participantNames,
      numQsorts: numQsorts,
      statements: currentStatements,
      mainDataObject: mainDataObject,
      statementNumArray: statementNumArray,
      sortsDisplayText: sortsDisplayText
    });
  } catch (error) {
    console.log(error.message);
    console.log(error.stack);
    store.setState({
      excelErrorMessage1: error.message,
      showExcelErrorModal: true
    });
  }
};

export default formatype3ForDisplay;
