import coreState from "../../GlobalState/coreState";
import appState from "../../GlobalState/appState";
import Papa from "papaparse";
import inputState from "../../GlobalState/inputState";
import getInputState from "../../GlobalState/getInputState";
import sortsDisplayText from "../logic/sortsDisplayText";
import revertLoadButtonsColors from "../DemoData/revertLoadButtonsColors";
import throwErrorTemplate from "../throwErrorTemplate";
import filterLines from "./filterLines";
import createMainDataObjectArray from "./createMainDataObjectArray";

const processBlob = data => {
  // todo - integrate this properly
  const hasInputError = false;

  // parse file
  const parsedFile = Papa.parse(data);
  const lines3 = parsedFile.data;

  // remove the first (header) line
  lines3.shift();

  // ERROR CHECK 1 - no sorts in file
  if (lines3.length < 2) {
    // throw new Error("Can't find any Q sorts in the file!");
    inputState.showErrorMessageBar = true;
    inputState.errorMessage = "Can't find any Q sorts in the file!";
    inputState.errorStackTrace = "Error in 'processCsvQsorts' function.";
    inputState.extendedErrorMessage =
      "KADE was unable to find any Q sorts listed in the selected file. Please check the file and try again.";
    return;
  }

  // remove empty arrays
  const lines2 = filterLines(lines3);

  console.log(JSON.stringify(lines2));

  // set default dataset value
  const numberSorts = lines2.length;

  // calc to remove empty "" strings from array below
  let maxLength;
  if (lines2.length < 1) {
    throwErrorTemplate(
      "unable to load file data",
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

  console.log(JSON.stringify(mainDataObjectArray));

  const sortsDisplayTextArray = sortsDisplayText(mainDataObject);

  if (hasInputError === false) {
    revertLoadButtonsColors("csv");

    inputState.dataOrigin = "csv";
    coreState.numQsorts = numberSorts;
    coreState.respondentNames = respondentNames;
    coreState.mainDataObject = mainDataObject;
    coreState.sortsDisplayText = sortsDisplayTextArray;
    inputState.notifyDataUploadSuccess = true;
    inputState.areQsortsLoaded = true;
    inputState.isLoadCsvQsortsButtonGreen = true;
    appState.isInputButtonGreen = getInputState("areStatementsLoaded");
    appState.isDataButtonGreen = getInputState("areStatementsLoaded");
  }
};

export default processBlob;
