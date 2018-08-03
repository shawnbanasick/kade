import store from "../../../store";
import grabProjectStatements from "./grabProjectStatements";
import calcMultiplierArrayT2 from "./calcMultiplierArrayT2";
import createMainDataObject from "./createMainDataObject";
import calcSortTriangleShapeT2 from "./calcSortTriangleShapeT2";
import grabRespondentNamesAndSorts from "./grabRespondentNamesAndSorts";
import checkUniqueParticipantNames from '../../SortsList/checkUniqueParticipantName';

export default function formatype2ForDisplay(data) {
    // let multiplierArray = [];

    try {
        // store #1
        let projectName1 = data[0][0][1];

        let projectName = projectName1.toString().replace(/,/g, "");

        // store #2 project history array
        let projectHistoryArray = [
            projectName + " data loaded from Excel Type 2 file"
        ];

        // store #3
        let statementsDataT2 = data[1][0];
        let currentStatements = grabProjectStatements(statementsDataT2);
        if (currentStatements.length === 0) {
            throw new Error("Can't find any statements on 'statements' worksheet!");
        }

        // grab respondent names and sorts
        let sortsDataT2 = data[0][0];
        let calcSorts = grabRespondentNamesAndSorts(sortsDataT2);

        let respondentNames = calcSorts[0];
        let sortsDisplayText = calcSorts[1];
        let symmetryCheckArray = calcSorts[2];
        if (symmetryCheckArray.length === 0) {
            throw new Error("Can't find any Q-sorts on the 'sorts' worksheet!");
        }

        // store #4
        let totalNumberSorts = respondentNames.length;

        // calculate sort design array
        let calcSortTriangleT2 = calcSortTriangleShapeT2(data[0][0][3]);
        let copyTriangleShape = calcSortTriangleT2[0];
        if (copyTriangleShape.length < 3) {
            throw new Error("Can't find sort pattern on 'sorts' worksheet!");
        }
        // let testSortTriangleShapeArray = calcSortTriangleT2[1];
        let sortTriangleShape = calcSortTriangleT2[2];

        // store #5 - set Q-sort size (number of statements)
        let originalSortSize = sortTriangleShape.length; // number of statements

        // store #6  -  statement number array
        let statementNumArray = [];
        for (let i = 0; i < currentStatements.length; i++) {
            statementNumArray.push(i + 1);
        }

        //　store #7 - multiplierArray
        let multiplierArray = [];

        multiplierArray = calcMultiplierArrayT2(copyTriangleShape);
        store.setState("multiplierArray", multiplierArray);

        // store #8  -  sort data
        let mainDataObject = createMainDataObject(
            respondentNames,
            symmetryCheckArray
        );

        let participantNames = checkUniqueParticipantNames(respondentNames);

        store.setState({
            projectName: projectName,
            projectHistoryArray: projectHistoryArray,
            multiplierArray: multiplierArray,
            statements: currentStatements,
            numQsorts: totalNumberSorts,
            qSortPattern: sortTriangleShape,
            numStatements: originalSortSize,
            mainDataObject: mainDataObject,
            statementNumArray: statementNumArray,
            sortsDisplayText: sortsDisplayText,
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
