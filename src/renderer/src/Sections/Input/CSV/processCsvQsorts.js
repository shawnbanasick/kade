import coreState from '../../GlobalState/coreState';
import appState from '../../GlobalState/appState';
import Papa from 'papaparse';
import inputState from '../../GlobalState/inputState';
import projectHistoryState from '../../GlobalState/projectHistoryState';
// import getInputState from '../../GlobalState/getInputState';
import sortsDisplayText from '../logic/sortsDisplayText';
import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
// import throwErrorTemplate from '../throwErrorTemplate';
import filterLines from './filterLines';
import createMainDataObjectArray from './createMainDataObjectArray';
import calcMultiplierArray from './calcMultiplierArray';

const processCsvQsorts = (data) => {
  // todo - integrate this properly
  const hasInputError = false;

  // check if statements are loaded
  const areStatementsLoaded = inputState.getState().areStatementsLoaded;

  // parse file
  const parsedFile = Papa.parse(data);
  const lines3 = parsedFile.data;

  // remove the first (header) line
  lines3.shift();

  // ERROR CHECK 1 - no sorts in file
  if (lines3.length < 2) {
    // throw new Error("Can't find any Q sorts in the file!");
    inputState.setState({ showErrorMessageBar: true });
    inputState.setState({ errorMessage: "Can't find any Q sorts in the file!" });
    inputState.setState({ errorStackTrace: "Error in 'processCsvQsorts' function." });
    inputState.setState({
      extendedErrorMessage:
        'KADE was unable to find any Q sorts listed in the selected file. Please check the file and try again.',
    });
    return;
  }

  // remove empty arrays
  const lines2 = filterLines(lines3);

  // set default dataset value
  const numberSorts = lines2.length;

  // calc to remove empty "" strings from array below
  let maxLength;
  if (lines2.length < 1) {
    throwErrorTemplate(
      'unable to load file data',
      "Couldn't find sorts data - confirm that data begins in row 1, column 1",
      "error in 'processCsvQsorts'"
    );
    return null;
  }

  // todo - check if other data import methods check to see if min value is above zero
  // Construct MAIN DATA OBJECT ARRAY
  let mainDataObjectArray = createMainDataObjectArray(lines2);
  let mainDataObject = [...mainDataObjectArray[0]];
  let respondentNames = [...mainDataObjectArray[1]];

  const sortsDisplayTextArray = sortsDisplayText(mainDataObject);

  if (hasInputError === false) {
    const multiplierArray = calcMultiplierArray([...mainDataObject[0].rawSort]);
    const sampleQsort = [...mainDataObject[0].rawSort];
    const qSortPattern = [...sampleQsort].sort((a, b) => a - b);
    const statementNumArray = Array.from({ length: qSortPattern.length }, (_, i) => i + 1);

    const logMessageObj1 = {
      logMessage: `${data[1]} data loaded from CSV file`,
      logType: 'csvInput',
    };

    // *** SET STATE ***
    projectHistoryState.setState({ projectHistoryArray: [logMessageObj1] });
    coreState.setState({ numQsorts: numberSorts });
    coreState.setState({ qSortPattern: qSortPattern });
    coreState.setState({ multiplierArray: multiplierArray });
    coreState.setState({ mainDataObject: mainDataObject });
    coreState.setState({ sortsDisplayText: sortsDisplayTextArray });
    coreState.setState({ statementNumArray: statementNumArray });
    coreState.setState({ respondentNames: respondentNames });
    inputState.setState({ areQsortsLoaded: true });
    inputState.setState({ isQsortPatternLoaded: true });

    inputState.setState({ dataOrigin: 'csv' });
    inputState.setState({ notifyDataUploadSuccess: true });
    inputState.setState({ isLoadCsvQsortsButtonGreen: true });
    inputState.setState({ isDataAlreadyLoaded: areStatementsLoaded });
    appState.setState({ isInputButtonGreen: areStatementsLoaded });
    appState.setState({ isDataButtonGreen: areStatementsLoaded });
  }
};

export default processCsvQsorts;
