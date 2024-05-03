import coreState from "../../GlobalState/coreState";
import appState from "../../GlobalState/appState";
// import Papa from "papaparse";
import shiftRawSortsPositive from "../logic/shiftRawSortsPositive";
import inputState from "../../GlobalState/inputState";
import getInputState from "../../GlobalState/getInputState";
import sortsDisplayText from "../logic/sortsDisplayText";
import revertLoadButtonsColors from "../DemoData/revertLoadButtonsColors";
import calcMultiplierArrayT2 from "../Excel/excelLogic/calcMultiplierArrayT2";
import checkUniqueParticipantNames from "../logic/checkUniqueParticipantNames";
// import { ToastContainer, toast, Slide } from "react-toastify";
import { toast } from "react-toastify";

function notifyWarning() {
  toast.warn("Select Participant Id to complete Sheets import", {
    autoClose: false
  });
}

const processBlob = data => {
  // todo - integrate this properly
  const hasInputError = false;

  let newData = JSON.parse(JSON.stringify(data));

  let newDataArray2 = newData.split("\r\n");

  let newDataArray = newDataArray2.map((item, index) => {
    let tempArray1 = item.split(",");
    return tempArray1;
  });

  // parse file
  // const parsedFile = Papa.parse(data);
  newDataArray.shift();

  let sortData2 = newDataArray[0].filter(n => n);

  // let sortData = [...sortData2].pop();
  [...sortData2].pop();

  // const lines3 = parsedFile.data;
  const lines3 = newDataArray;

  // parsing first line of PQMethod file to set qav variables
  if (lines3.length < 2) {
    // throw new Error("Can't find any Q sorts in the file!");
    inputState.errorMessage = "Can't find any Q sorts in the file";
    inputState.showErrorMessageBar = true;
    inputState.errorStackTrace = "Error in 'processSheetsCsv' function.";
    inputState.extendedErrorMessage =
      "KADE was unable to find any Q sorts listed in the selected file. Please restart the app (click 'View', then 'Force Restart'), check the file, and try again.";
    return;
  }

  // remove any empty strings
  const newArray2 = newDataArray.map(item => {
    let element = item.filter(item => {
      return item !== "";
    });
    return element;
  });

  // remove any empty arrays
  const newArray = newArray2.filter(item => {
    return item.length !== 0;
  });

  let csvPartIdArray = [];
  let csvRandomIdArray = [];
  let csvUrlUsercodeArray = [];
  let labelStrippedArray = [];

  newArray.forEach(item => {
    console.log(item);
    csvPartIdArray.push(item[1].replace("partId:", "").trim());
    csvRandomIdArray.push(item[2].replace("randomId:", "").trim());
    csvUrlUsercodeArray.push(item[3].replace("urlUsercode:", "").trim());
    labelStrippedArray.push(
      item
        .pop()
        .replace("sort:", "")
        .trim()
    );
  });

  inputState.csvPartIdArray = csvPartIdArray;
  inputState.csvRandomIdArray = csvRandomIdArray;
  inputState.csvUrlUsercodeArray = csvUrlUsercodeArray;

  console.log(JSON.stringify(csvPartIdArray));
  console.log(JSON.stringify(csvRandomIdArray));
  console.log(JSON.stringify(csvUrlUsercodeArray));
  console.log(JSON.stringify(labelStrippedArray));

  let respondentNames = [...csvRandomIdArray];

  // create QAV variable - sorts array
  const sortsArray = labelStrippedArray.map(item => {
    let tempArray = item.split("|");
    let returnArray = tempArray.map(entry => {
      return +entry;
    });
    return returnArray;
  });

  console.log(JSON.stringify(sortsArray));

  // throw error if can't find names
  if (!sortsArray[0][1]) {
    // throw new Error("Can't find participant names or Q sorts in the file!");
    inputState.errorMessage = "Can't find the respondent names in the file!";
    inputState.showErrorMessageBar = true;
    inputState.errorStackTrace = "Error in 'processSheetsCsv' function.";
    inputState.extendedErrorMessage =
      "KADE returned a null value when trying to find the respondent names in the selected file. Please restart the app (click 'View', then 'Force Restart'), check the file format, and try again.The file should have participant names or ids in column 1 and sorts data in column 2.";
    return;
  }

  // throw error if can't find sorts
  if (!sortsArray[0][0]) {
    // throw new Error("Can't find participant names or Q sorts in the file!");
    inputState.errorMessage = "Can't find the Q sorts in the file!";
    inputState.showErrorMessageBar = true;
    inputState.errorStackTrace = "Error in 'processSheetsCsv' function.";
    inputState.extendedErrorMessage =
      "KADE returned a null value when trying to find the Q sorts in the selected file. Please restart the app (click 'View', then 'Force Restart'), check the file format, and try again.The file should have participant names or ids in column 1 and sorts data in column 2.";
    return;
  }

  // create QAV variable - total sorts in project
  const numberSorts = sortsArray.length;

  // get min value for POS SHIFT (FORCED CASE)
  let minValue = 1;
  sortsArray.forEach(element => {
    let tempMinValue = Math.min(...element);
    if (tempMinValue < minValue) {
      minValue = tempMinValue;
    }
  });

  // create QAV variable - q sort pattern array
  const tempPatternArray = [...sortsArray[0]];
  const qSortPatternArray = tempPatternArray.sort((a, b) => a - b);

  // create QAV variable - multiplier Array
  const multiplierArray = calcMultiplierArrayT2([...qSortPatternArray]);

  // create QAV variable - positive shifted sort values
  let arrayShiftedPositive;
  if (minValue < 1) {
    // make the shift to pos.
    arrayShiftedPositive = sortsArray.map(item => {
      let tempShiftArray = shiftRawSortsPositive(item, minValue);
      return tempShiftArray;
    });
  } else {
    // deep copy sortsArray
    arrayShiftedPositive = JSON.parse(JSON.stringify(sortsArray));
  }

  // create QAV variable - participant names
  const participantNames = checkUniqueParticipantNames(respondentNames);
  console.log(participantNames);

  // create MAIN DATA OBJECT
  let mainDataObjectArray = sortsArray.map((item, index) => {
    let tempObj = {};
    let tempArray = [...item];
    tempObj.name = participantNames[index];
    tempObj.posShiftSort = arrayShiftedPositive[index];
    tempObj.rawSort = [...tempArray];
    tempObj.displaySort = tempArray.toString();
    return tempObj;
  });

  console.log(JSON.stringify(mainDataObjectArray));

  // for display in DATA section
  const sortsDisplayTextArray = sortsDisplayText([...mainDataObjectArray]);

  if (hasInputError === false) {
    revertLoadButtonsColors("json");
    coreState.numQsorts = numberSorts;
    coreState.qSortPattern = qSortPatternArray;
    coreState.respondentNames = participantNames;
    coreState.mainDataObject = mainDataObjectArray;
    coreState.sortsDisplayText = sortsDisplayTextArray;
    coreState.multiplierArray = multiplierArray;
    inputState.dataOrigin = "sheets";
    inputState.areQsortsLoaded = true;
    inputState.isLoadSheetsCsvButtonGreen = true;
    appState.isInputButtonGreen = getInputState("areStatementsLoaded");
    appState.isDataButtonGreen = getInputState("areStatementsLoaded");
    inputState.disabledFirebaseButton = true;
    notifyWarning();
  }
};

export default processBlob;
