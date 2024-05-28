import grabSortsT3 from './grabSortsT3';
import grabStatementsT3 from './grabStatementsT3';
import createMainDataObject from '../../Excel/excelLogic/createMainDataObject';
import calcMultiplierArrayT2 from '../../Excel/excelLogic/calcMultiplierArrayT2';
import grabRespondentNamesT3 from './grabRespondentNamesT3';
import checkUniqueParticipantNames from '../../logic/checkUniqueParticipantNames';
import projectHistoryState from '../../../GlobalState/projectHistoryState';
import coreState from '../../../GlobalState/coreState';
import inputState from '../../../GlobalState/inputState';

function formatype3ForDisplay(data) {
  try {
    // store #1
    let projectName = '';
    let projectNameString = data[0][2][0];
    if (projectNameString) {
      projectNameString = projectNameString.split(',');
      projectName = projectNameString[1];
    }

    // store #2
    const logMessageObj1 = {
      logMessage: `${projectName} data loaded from Excel Type 3 file`,
      logType: 'excel3Input',
    };
    const projectHistoryArray = [logMessageObj1];

    // store #3 - Q-sort pattern
    const qSortPattern1 = data[0][6][0].toString();
    if (qSortPattern1.length < 18) {
      throw new Error("Can't find Q-sort pattern on 'Analysis Overview' worksheet!");
    }

    const qSortPattern2 = qSortPattern1.split('"');
    const qSortPattern = qSortPattern2[1].split(',').map(Number);

    // store #4 - multiplierArray
    const multiplierArray = calcMultiplierArrayT2([...qSortPattern]);

    // store #5 - numStatements
    const numStatements = qSortPattern.length; // number of statements

    // store #6 - respondent names
    const respondentNames = grabRespondentNamesT3(data[2]);

    // store #7 - number of sorts
    const numQsorts = respondentNames.length;

    // store #8 - respondent sorts
    const respondentSorts = grabSortsT3(data[2], numStatements);
    if (respondentSorts.length === 0) {
      throw new Error("Cant't find any q-sorts on 'Q-sorts' worksheet!");
    }

    // store #9 - get statements
    const currentStatements = grabStatementsT3(data[1]);
    const errorCheck = currentStatements.filter((statement) => statement.length > 0);
    if (errorCheck.length === 0) {
      throw new Error("Can't find any statements on the 'Statements' worksheet!");
    } else {
      inputState.setState({ statementsLoaded: true });
    }

    // store #10 mainDataObject
    const mainDataObject = createMainDataObject(respondentNames, respondentSorts);

    // store #11 statements number array
    const statementNumArray = [];
    for (let i = 0; i < currentStatements.length; i += 1) {
      statementNumArray.push(i + 1);
    }

    // store #12 - sorts display text
    const sortsDisplayText = [];
    for (let k = 0; k < respondentNames.length; k += 1) {
      const tempVar = `${mainDataObject[k].name} , ${mainDataObject[k].displaySort}`;
      sortsDisplayText.push(tempVar);
    }

    const participantNames = checkUniqueParticipantNames(respondentNames);

    projectHistoryState.setState({ projectHistoryArray: projectHistoryArray });
    coreState.setState({ projectName: projectName });
    coreState.setState({ qSortPattern: qSortPattern });
    coreState.setState({ multiplierArray: multiplierArray });
    coreState.setState({ numStatements: numStatements });
    coreState.setState({ respondentNames: participantNames });
    coreState.setState({ numQsorts: numQsorts });
    coreState.setState({ statements: currentStatements });
    coreState.setState({ mainDataObject: mainDataObject });
    coreState.setState({ statementNumArray: statementNumArray });
    coreState.setState({ sortsDisplayText: sortsDisplayText });
    inputState.setState({ areQsortsLoaded: true });
    inputState.setState({ isQsortPatternLoaded: true });
    inputState.setState({ statementsLoaded: true });
  } catch (error) {
    console.log(error.message); //
    console.log(error.stack);
    inputState.setState({ excelErrorMessage1: error.message });
    inputState.setState({ showExcelErrorModal: true });
  }
}

export default formatype3ForDisplay;
