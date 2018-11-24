import shiftRawSortsPositive from "./shiftRawSortsPositive";

const motivationalToArray = function(array, numSortStatements, min) {
  let respondentNames = [];
  for (let i = 0; i < array.length; i++) {
    let temp1 = array[i].shift();
    respondentNames.push(temp1);
  }

  let mainDataArray = [];
  for (let j = 0; j < array.length; j++) {
    let tempObj = {};
    let tempArray = [...array[j]];
    let posShiftArray = shiftRawSortsPositive(tempArray, min);

    tempObj.name = respondentNames[j];
    tempObj.posShiftSort = posShiftArray;
    tempObj.rawSort = array[j];
    tempObj.displaySort = array[j].toString();
    mainDataArray.push(tempObj);
  }

  return [respondentNames, mainDataArray];
};

export default motivationalToArray;
