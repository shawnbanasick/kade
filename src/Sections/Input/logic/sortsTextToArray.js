import parseArrayPQM from "./parseArrayPQM";
import splitNamesAndSorts from "./splitNamesAndSorts";
import shiftRawSortsPositive from "./shiftRawSortsPositive";

export default function sortsTextToArray(array, numSortStatements, min) {
  // break text array into names text array and sorts text array
  const namesAndSortsArray = splitNamesAndSorts(array, numSortStatements);
  const names = namesAndSortsArray[0];
  const sorts = namesAndSortsArray[1];

  const mainDataArray = [];
  // convert sorts array from text to numeric
  sorts.forEach((element, j) => {
    const tempObj = {};

    // parse array
    const tempArray = parseArrayPQM(element, numSortStatements);

    // positive shift raw sorts
    const tempArray2 = shiftRawSortsPositive(tempArray, min);

    tempObj.name = names[j];
    tempObj.posShiftSort = tempArray2;
    tempObj.rawSort = tempArray;
    tempObj.displaySort = tempArray.toString();
    mainDataArray.push(tempObj);
  });

  return [names, mainDataArray];
}
