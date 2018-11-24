import { parseArrayPQM } from "./parseArrayPQM";
import { splitNamesAndSorts } from "./splitNamesAndSorts";
import shiftRawSortsPositive from "./shiftRawSortsPositive";

export function sortsTextToArray(array, numSortStatements, min) {
  // break text array into names text array and sorts text array
  let namesAndSortsArray = splitNamesAndSorts(array, numSortStatements);
  let names = namesAndSortsArray[0];
  let sorts = namesAndSortsArray[1];

  let mainDataArray = [];
  // convert sorts array from text to numeric
  sorts.forEach(function(element, j) {
    let tempObj = {};

    // parse array
    let tempArray = parseArrayPQM(element, numSortStatements);

    // positive shift raw sorts
    let tempArray2 = shiftRawSortsPositive(tempArray, min);

    tempObj.name = names[j];
    tempObj.posShiftSort = tempArray2;
    tempObj.rawSort = tempArray;
    tempObj.displaySort = tempArray.toString();
    mainDataArray.push(tempObj);
  });

  return [names, mainDataArray];
}
