import cloneDeep from "lodash/cloneDeep";
import sortsTextToArray from "./sortsTextToArray";

export default function parsePQMethodFile(dataBlob) {
  // break by new lines
  const arr = dataBlob.split(/\r\n|\r|\n/g);
  // pull out first line
  const array1 = arr.slice(0, arr.length);

  // shift out first line
  const projectTitleString = array1.shift();

  // shift out number of sorts from first line
  const sortNumberString = array1.shift();

  // parsing first line of PQMethod file to set qav variables
  const numberSorts = parseInt(projectTitleString.slice(3, 6), 10); // lipset 9

  const numSortStatements = parseInt(projectTitleString.slice(6, 9), 10); // lipset 33
  const qavProjectName3 = projectTitleString.slice(10, 70);
  const qavProjectName = qavProjectName3.trim();
  // const qavProjectName = PASTE.sanitizeProjectName(qavProjectName2);

  // parsing and coercing second line of PQMethod file
  // warning - array temp1 has an extra "0" entry in position 0
  const temp1b = sortNumberString.replace(/\s\s/g, " ");
  const temp1a = temp1b.split(" ");
  const temp1 = temp1a.map(Number);
  const multiplierArray = temp1.slice(3, temp1.length);
  // get max sort value to use in shift raw sorts to all positive
  const value = temp1.slice(0, 3);
  const min = value.reduce((a, b) => Math.min(a, b));

  // transform sorts text to name and sorts arrays - returns names, sorts, main data array
  const namesSortsMaindataArray = sortsTextToArray(
    array1,
    numSortStatements,
    min
  );

  // todo - fix this if unforced sorts are used in project
  // create Q sort pattern from initial respondent sort
  const sampleSort = cloneDeep(namesSortsMaindataArray[1][0].rawSort);
  const qSortPattern = sampleSort.sort((a, b) => a - b);

  return [
    numberSorts,
    qavProjectName,
    numSortStatements,
    multiplierArray,
    namesSortsMaindataArray,
    qSortPattern
  ];
}
