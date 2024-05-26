import shiftRawSortsPositive from '../logic/shiftRawSortsPositive';
import checkUniqueParticipantName from '../logic/checkUniqueParticipantNames';
import coreState from '../../GlobalState/coreState';
import projectHistoryState from '../../GlobalState/projectHistoryState';
import inputState from '../../GlobalState/inputState';
import getCoreState from '../../GlobalState/getCoreState';
import flatten from 'lodash/flatten';

// todo - all-app fix - re-calcuate posShiftSorts with user input if unforced sorts present
function displayJsonData(selection) {
  const id = selection;
  const JsonObj = getCoreState('jsonObj');

  let temp1;
  let sort0;
  let sortArray;
  let replaced;
  let tempString1;
  const participantNames = [];
  const qSorts = [];
  const sortsDisplayText = [];
  const sortsAsNumbers = [];
  // let minQsortValueArray;
  let minQsortValueArray2 = [];

  const keys = Object.keys(JsonObj);
  for (let i = 0, iLen = keys.length; i < iLen; i += 1) {
    if (id === 'Id') {
      // create unique id from key
      temp1 = keys[i].slice(-10);
      participantNames.push(temp1);
    } else {
      // use the user-selected value as id
      temp1 = JsonObj[keys[i]][id];
      participantNames.push(temp1);
    }

    // get sort text from json and parse
    sort0 = JsonObj[keys[i]].sort;
    sortArray = `${sort0.split('|')}`;
    const replacedDisplay2 = sortArray.split('+').join('');
    const replacedQAV2 = sortArray.split('+').join(' ');
    const replacedDisplay3 = replacedDisplay2.split(',').join(',');
    const replacedQAV3 = replacedQAV2.split(',').join('');

    qSorts.push(replacedQAV3);
    replaced = replacedDisplay3.split(' 0').join('0');
    tempString1 = `${temp1},${replaced}`;

    // convert strings to numbers
    // const tempArray3 = JSON.parse("[" + replaced + "]"); // throws error with non-numeric
    const array2 = replaced.split(',');
    const tempArray3 = [];
    for (const num of array2) {
      const value = parseInt(num, 10);
      if (isNaN(value)) {
        tempArray3.push(num);
      }
      tempArray3.push(value);
    }

    // create min value array for all sorts
    minQsortValueArray2.push(...tempArray3);
    tempArray3.unshift(temp1);

    sortsAsNumbers.push(tempArray3);
    sortsDisplayText.push(tempString1);
  }

  // const minValue = Math.min(...minQsortValueArray);
  let minValueArray2 = flatten(minQsortValueArray2);
  const minValue = Math.min(...minValueArray2);

  const mainDataObject = [];
  for (let k = 0; k < sortsAsNumbers.length; k += 1) {
    const currentArray = sortsAsNumbers[k];
    const tempObj = {};
    const name = currentArray.shift();

    tempObj.name = name;
    tempObj.rawSort = [...currentArray];

    if (minValue < 0) {
      const posShiftSort = shiftRawSortsPositive([...currentArray], minValue);
      tempObj.posShiftSort = posShiftSort;
    } else {
      tempObj.posShiftSort = [...currentArray];
    }

    tempObj.displaySort = sortsAsNumbers[k].toString();
    mainDataObject.push(tempObj);
  }

  const participantNames2 = checkUniqueParticipantName(participantNames);
  const projectName = getCoreState('projectName');

  const logMessageObj1 = {
    logMessage: `${projectName} data loaded from JSON file`,
    logType: 'jsonInput',
  };

  projectHistoryState.projectHistoryArray = [logMessageObj1];
  coreState.numQsorts = sortsAsNumbers.length;
  coreState.sortsDisplayText = sortsDisplayText;
  coreState.mainDataObject = mainDataObject;
  coreState.respondentNames = participantNames2;
  coreState.multiplierArray = ['not loaded'];
  inputState.showJsonFileLoadedMessage = true;
  inputState.dataOrigin = 'json';
}
export default displayJsonData;
