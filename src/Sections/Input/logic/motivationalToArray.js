import shiftRawSortsPositive from "./shiftRawSortsPositive";

const motivationalToArray = (array, numSortStatements, min) => {
  const respondentNames = [];
  for (let i = 0; i < array.length; i += 1) {
    const temp1 = array[i].shift();
    respondentNames.push(temp1);
  }

  const mainDataArray = [];
  for (let j = 0; j < array.length; j += 1) {
    const tempObj = {};
    const tempArray = [...array[j]];
    const posShiftArray = shiftRawSortsPositive(tempArray, min);

    tempObj.name = respondentNames[j];
    tempObj.posShiftSort = posShiftArray;
    tempObj.rawSort = array[j];
    tempObj.displaySort = array[j].toString();
    mainDataArray.push(tempObj);
  }

  return [respondentNames, mainDataArray];
};

export default motivationalToArray;
