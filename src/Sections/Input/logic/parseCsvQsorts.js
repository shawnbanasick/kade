import { sortsTextToArray } from "../uploadLogic/sortsTextToArray";
import cloneDeep from "lodash/cloneDeep";

export function parseCsvQsorts(array) {
    // remove the first (header) line
    array.shift();

    // parsing first line of PQMethod file to set qav variables
    var numberSorts = array.length;

    var numSortStatements = array[0].length - 1;

    // transform sorts text to name and sorts arrays - returns names, sorts, main data array
    let namesSortsMaindataArray = sortsTextToArray(
        array1,
        numSortStatements,
        min
    );

    // todo - fix this if unforced sorts are used in project
    // create Q sort pattern from initial respondent sort
    let sampleSort = cloneDeep(namesSortsMaindataArray[1][0]["rawSort"]);
    let qSortPattern = sampleSort.sort(function(a, b) {
        return a - b;
    });

    return [
        numberSorts,
        qavProjectName,
        numSortStatements,
        pyramidShapeNumbers,
        namesSortsMaindataArray,
        qSortPattern
    ];
}
