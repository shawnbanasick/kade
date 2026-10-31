import i18n from 'i18next';

import coreState from '../../GlobalState/coreState';
import appState from '../../GlobalState/appState';
import inputState from '../../GlobalState/inputState';
import projectHistoryState from '../../GlobalState/projectHistoryState';

import sortsDisplayText from '../logic/sortsDisplayText';
import filterLines from '../CSV/filterLines';
import createMainDataObjectArray from '../CSV/createMainDataObjectArray';
import calcMultiplierArray from '../CSV/calcMultiplierArray';
// import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';

const processCsvQsorts = (data) => {
  const hasInputError = false;

  // check if statements are loaded
  const areStatementsLoaded = inputState.getState().areStatementsLoaded;
  const selectedIdMethod = inputState.getState().quinceIdMethod;
  const quinceForcedUnforcedState = inputState.getState().quinceForcedUnforcedState;
  const qSortPattern = coreState.getState().qSortPattern;

  const partIdArray = [];
  const urlUsercodeArray = [];
  const randomIdArray = [];
  const lines3Prep = [];

  data.forEach((row, index) => {
    randomIdArray.push(row.randomId);
    if (
      row.partId === undefined ||
      row.partId === null ||
      row.partId === '' ||
      row.partId === 'null'
    ) {
      partIdArray.push(`part_${index + 1}`);
    } else {
      partIdArray.push(row.partId);
    }
    if (
      row.urlUsercode === undefined ||
      row.urlUsercode === null ||
      row.urlUsercode === '' ||
      row.urlUsercode === 'null'
    ) {
      urlUsercodeArray.push(`part_${index + 1}`);
    } else {
      urlUsercodeArray.push(row.urlUsercode);
    }
    lines3Prep.push(row.sort);
  });

  if (selectedIdMethod === 'partId') {
    coreState.setState({ respondentNames: partIdArray });
    lines3Prep.forEach((sort, index) => {
      sort.unshift(partIdArray[index]);
    });
  }

  if (selectedIdMethod === 'randomId') {
    coreState.setState({ respondentNames: randomIdArray });
    lines3Prep.forEach((sort, index) => {
      sort.unshift(randomIdArray[index]);
    });
  }

  if (selectedIdMethod === 'urlUsercode') {
    coreState.setState({ respondentNames: urlUsercodeArray });
    lines3Prep.forEach((sort, index) => {
      sort.unshift(urlUsercodeArray[index]);
    });
  }

  const lines3 = [...lines3Prep];

  // ERROR CHECK 1 - no sorts in file
  if (lines3.length < 2) {
    // throw new Error("Can't find any Q sorts in the file!");
    inputState.setState({ showErrorMessageBar: true });
    inputState.setState({ errorMessage: i18n.t("Can't find any Q sorts in the file!") });
    inputState.setState({ errorStackTrace: i18n.t("Error in 'processCsvQsorts' function.") });
    inputState.setState({
      extendedErrorMessage: i18n.t(
        'KADE was unable to find any Q sorts listed in the selected file. Please check the file and try again.'
      ),
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
      i18n.t('unable to load file data'),
      i18n.t("Couldn't find sorts data - confirm that data begins in row 1, column 1"),
      i18n.t("error in 'processCsvQsorts'")
    );
    return null;
  }

  // todo - check if other data import methods - confirm min value is above zero
  // Construct MAIN DATA OBJECT ARRAY
  let inputMinValue = 0;
  if (quinceForcedUnforcedState === 'unforced') {
    inputMinValue = Math.min(...qSortPattern);
  }
  let mainDataObjectArray = createMainDataObjectArray(
    lines2,
    quinceForcedUnforcedState,
    inputMinValue
  );
  let mainDataObject = [...mainDataObjectArray[0]];
  let respondentNames = [...mainDataObjectArray[1]];

  const sortsDisplayTextArray = sortsDisplayText(mainDataObject);

  if (hasInputError === false) {
    const multiplierArray = calcMultiplierArray([...mainDataObject[0].rawSort]);
    const sampleQsort = [...mainDataObject[0].rawSort];
    const qSortPattern = [...sampleQsort].sort((a, b) => a - b);
    const statementNumArray = Array.from({ length: qSortPattern.length }, (_, i) => i + 1);

    const logMessageObj1 = {
      logMessage: `${i18n.t('Data loaded from Quince CSV file:')} ${data[1]?.projectName}`,
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

    inputState.setState({ dataOrigin: 'quince csv' });
    inputState.setState({ notifyDataUploadSuccess: true });
    inputState.setState({ isLoadQuinceQsortsButtonGreen: true });
    inputState.setState({ isDataAlreadyLoaded: areStatementsLoaded });
    appState.setState({ isInputButtonGreen: areStatementsLoaded });
    appState.setState({ isDataButtonGreen: areStatementsLoaded });
  }
};

export default processCsvQsorts;
