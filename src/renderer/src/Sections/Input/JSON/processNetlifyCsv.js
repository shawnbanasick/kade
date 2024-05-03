import coreState from "../../GlobalState/coreState";
import appState from "../../GlobalState/appState";
import Papa from "papaparse";
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

  // Copy and Parse the data
  let newData = JSON.parse(JSON.stringify(data));
  const newDataArray2 = Papa.parse(newData);

  let partIdArray = [];
  let urlUsercodeArray = [];
  let randomIdArray = [];
  let netlifySortsArray = [];

  for (let i = 1; i < newDataArray2.data.length; i++) {
    // Get participant sorts
    if (newDataArray2.data[i][0].length > 50) {
      let string1 = newDataArray2.data[i][0].split("| sort:|");
      let sortArray2 = string1[1].split("|");
      let sortArray = sortArray2.map(item => {
        return parseInt(item, 10);
      });
      sortArray = sortArray.filter(a => !isNaN(a));
      netlifySortsArray.push(sortArray);
      let split2 = string1[0].split("| urlUsercode:|");

      // Get url usercode
      let split3 = split2[1].split("|");
      let urlUsercode = split3[0].trim();
      urlUsercodeArray.push(urlUsercode);

      // Get randomId
      let split4 = split2[0].split("| randomId:|");
      let randomId = split4[1].trim();
      randomIdArray.push(randomId);

      // Get partId
      let split5 = split4[0].split("| partId:|");
      let partId = split5[1].trim();
      if (partId === "") {
        partId = "not-set";
      }
      partIdArray.push(partId);
    }
  }

  inputState.csvPartIdArray = partIdArray;
  inputState.csvUrlUsercodeArray = urlUsercodeArray;
  inputState.csvRandomIdArray = randomIdArray;

  // 1. QAV - respondent names
  let respondentNamesArray = [...randomIdArray];

  // 2. QAV - number of sorts
  const numberSorts = netlifySortsArray.length;

  // min values for POS SHIFT
  let minValue = 1;
  netlifySortsArray.forEach(element => {
    let tempMinValue = Math.min(...element);
    if (tempMinValue < minValue) {
      minValue = tempMinValue;
    }
  });

  // 3. QAV - q sort pattern array
  const tempPatternArray = [...netlifySortsArray[0]];
  const qSortPatternArray = tempPatternArray.sort((a, b) => a - b);

  // 4. QAV - multiplier array
  const multiplierArray = calcMultiplierArrayT2([...qSortPatternArray]);

  // create QAV variable - positive shifted sort values
  let arrayShiftedPositive;
  if (minValue < 1) {
    // make the shift to pos.
    arrayShiftedPositive = netlifySortsArray.map(item => {
      let tempShiftArray = shiftRawSortsPositive(item, minValue);
      return tempShiftArray;
    });
  } else {
    // deep copy sortsArray
    arrayShiftedPositive = JSON.parse(JSON.stringify(netlifySortsArray));
  }

  // create QAV variable - participant names
  const participantNames = checkUniqueParticipantNames(respondentNamesArray);

  // create MAIN DATA OBJECT
  let mainDataObjectArray = netlifySortsArray.map((item, index) => {
    let tempObj = {};
    let tempArray = [...item];
    tempObj.name = participantNames[index];
    tempObj.posShiftSort = arrayShiftedPositive[index];
    tempObj.rawSort = [...tempArray];
    tempObj.displaySort = tempArray.toString();
    return tempObj;
  });

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
    inputState.dataOrigin = "netlify";
    inputState.areQsortsLoaded = true;
    inputState.isLoadNetlifyCsvButtonGreen = true;
    appState.isInputButtonGreen = getInputState("areStatementsLoaded");
    appState.isDataButtonGreen = getInputState("areStatementsLoaded");
    inputState.disabledFirebaseButton = true;
    notifyWarning();
  }
};

export default processBlob;
