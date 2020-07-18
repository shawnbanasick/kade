import coreState from "../../GlobalState/coreState";
import appState from "../../GlobalState/appState";
import Papa from "papaparse";
import shiftRawSortsPositive from "../logic/shiftRawSortsPositive";
import inputState from "../../GlobalState/inputState";
import sortsDisplayText from "../logic/sortsDisplayText";
import revertLoadButtonsColors from "../DemoData/revertLoadButtonsColors";
import calcMultiplierArrayT2 from "../Excel/excelLogic/calcMultiplierArrayT2";
import checkUniqueParticipantNames from "../logic/checkUniqueParticipantName";

const processBlob = data => {
  // todo - integrate this properly
  const hasInputError = false;

  // parse file
  const parsedFile = Papa.parse(data);
  const lines3 = parsedFile.data;
  let qSortPatternArray;

  // remove the first (header) line
  lines3.shift();

  // parsing first line of PQMethod file to set qav variables
  if (lines3.length < 2) {
    // throw new Error("Can't find any Q sorts in the file!");
    inputState.errorMessage = "Can't find any Q sorts in the file!";
    inputState.showErrorMessageBar = true;
    inputState.errorStackTrace = "Error in 'processCsvQsorts' function.";
    inputState.extendedErrorMessage =
      "KADE was unable to find any Q sorts listed in the selected file. Please check the file and try again.";
    return;
  }

  // filter out null arrays and calc max, min
  const lines2 = [];
  for (let z = 0; z < lines3.length; z += 1) {
    const testValue = lines3[z][0];
    if (testValue) {
      lines2.push(lines3[z]);
    }
  }
  // set default dataset value
  const numberSorts = lines2.length;

  // calc to remove empty "" strings from array below
  let maxLength = lines2[0].length;
  for (let i = 0; i < lines2[0].length - 1; i += 1) {
    const value1 = lines2[0][i];
    if (value1 === "") {
      maxLength = i;
      break;
    }
  }
  // todo - check if other data import methods check to see if min value is above zero
  // before doing positive shift for raw sorts
  let minValue;
  let arrayShiftedPositive;
  const mainDataObject = [];
  const respondentNames = [];

  for (let j = 0; j < lines2.length; j += 1) {
    lines2[j].length = maxLength;
    const tempObj = {};

    // get name
    const name = lines2[j].shift();

    // end loop if no data
    if (!name) {
      break;
    }

    // set property name
    tempObj.name = name;

    // add to names array
    respondentNames.push(name);

    // convert to numbers format
    const asNumbers = lines2[j].map(Number);

    // grab min value to use with shift positive
    if (j === 0) {
      minValue = Math.min(...asNumbers);
    }

    // grab last for for copy to qSortPattern
    qSortPatternArray = asNumbers.slice();

    if (minValue < 1) {
      arrayShiftedPositive = shiftRawSortsPositive(asNumbers, minValue);
    } else {
      arrayShiftedPositive = [...asNumbers];
    }
    tempObj.posShiftSort = arrayShiftedPositive;
    tempObj.rawSort = asNumbers;
    tempObj.displaySort = lines2[j].toString();
    mainDataObject.push(tempObj);
  }

  qSortPatternArray.sort((a, b) => a - b);

  const multiplierArray = calcMultiplierArrayT2([...qSortPatternArray]);

  const sortsDisplayTextArray = sortsDisplayText(mainDataObject);

  const participantNames = checkUniqueParticipantNames(respondentNames);

  if (hasInputError === false) {
    revertLoadButtonsColors("csv");

    coreState.numQsorts = numberSorts;
    coreState.qSortPattern = qSortPatternArray;
    coreState.respondentNames = participantNames;
    coreState.mainDataObject = mainDataObject;
    coreState.sortsDisplayText = sortsDisplayTextArray;
    coreState.multiplierArray = multiplierArray;
    inputState.dataOrigin = "csv";
    inputState.sortsLoaded = true;
    inputState.notifyDataUploadSuccess = true;
    inputState.areQsortsLoaded = true;
    inputState.isLoadCsvQsortsButtonGreen = true;
    appState.isInputButtonGreen = inputState.areStatementsLoaded;
    appState.isDataButtonGreen = inputState.areStatementsLoaded;
  }
};

export default processBlob;
