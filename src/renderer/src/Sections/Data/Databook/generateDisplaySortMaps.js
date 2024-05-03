import uniq from "lodash/uniq";
import zip from "lodash/zip";
import { v4 as uuidv4 } from "uuid";
import calcMultiplierArrayT2 from "../../Input/Excel/excelLogic/calcMultiplierArrayT2";
import isEqual from "lodash/isEqual";
import i18n from "i18next";

const compareSecondColumn = (a, b) => {
  if (a[1] === b[1]) {
    return 0;
  } else {
    return a[1] < b[1] ? -1 : 1;
  }
};

const reorderByFirstColumn = (a, b) => {
  if (a[1] === b[1]) {
    if (a[0] < [0]) {
      return 1;
    } else {
      return -1;
    }
  }
};

const generateSortMaps = (
  qSortPattern,
  mainDataObject,
  statementNumArray,
  multiplierArray
) => {
  // ex => [-4, -3, -2, -1, 0, 1, 2, 3, 4]
  const newArray = uniq(qSortPattern);
  let paragraphStrings = [];

  let newString = "";
  const newArray2 = [...newArray];
  for (let r = 0; r < newArray2.length; r++) {
    if (newArray2[r] < 0) {
      newString = newString + "| " + newArray2[r] + " ";
    } else {
      newString = newString + "|  " + newArray2[r] + " ";
    }
  }

  newString = newString + "|";

  let respondentArray;
  let unforcedParticipantNamesArray = [];
  let numUnforcedParts = 0;

  if (mainDataObject !== undefined) {
    // iterate through all particpant Q sorts
    for (let m = 0; m < mainDataObject.length; m++) {
      respondentArray = [...mainDataObject[m].rawSort];

      let thisMultiplierArray2 = [...mainDataObject[m].rawSort].sort(
        (a, b) => a - b
      );

      // to deal with unforced Q sorts - triangle shape may vary
      let thisMultiplierArray = calcMultiplierArrayT2([
        ...thisMultiplierArray2
      ]);

      let unforcedTest = isEqual(multiplierArray, thisMultiplierArray);

      let invalidCharacterText = true;
      if (
        respondentArray.includes(undefined) ||
        respondentArray.includes(null) ||
        respondentArray.includes(NaN)
      ) {
        invalidCharacterText = false;
      }

      // MODIFY NAME STRING
      let nameString = mainDataObject[m].name;
      if (!invalidCharacterText) {
        nameString = `${nameString}     ** ${i18n.t("Input Error")} **`;
        numUnforcedParts = numUnforcedParts + 1;
      } else if (!unforcedTest) {
        nameString = `${nameString}     ** ${i18n.t("Unforced Q sort")} **`;
        numUnforcedParts = numUnforcedParts + 1;
      }
      unforcedParticipantNamesArray.push(nameString);

      // get max value of the multiplier array
      let maxValue = Math.max(...thisMultiplierArray);
      let zippedArray2 = zip(statementNumArray, respondentArray);
      zippedArray2.sort(compareSecondColumn);

      // copy over
      let zippedArray = JSON.parse(JSON.stringify(zippedArray2));

      zippedArray.sort(reorderByFirstColumn);

      let tempArray = [];
      let tempObject = {};

      // iterate rows to max triangle height
      for (let i = 0; i < maxValue; i++) {
        // iterate through cols
        let textString = ``;
        let isMidRow = false;
        for (let j = 0; j < newArray.length; j++) {
          let columnCheck = false;
          // go through entire zipped array
          for (let k = 0; k < zippedArray.length; k++) {
            // get comparison arrays
            let currentArray = zippedArray[k];
            let comparisonArray = zippedArray[k + 1];

            // if the sort value equals the current col value
            if (currentArray[1] === newArray[j]) {
              // the comparison array is not undefined (when the array is the last one)
              if (comparisonArray !== undefined) {
                if (currentArray[1] !== comparisonArray[1]) {
                  // adjust spacing if triple digit statement numbers
                  if (currentArray[1] > 99) {
                    let string1 = `${currentArray[0]} `;
                    let string2 = string1.padStart(4, " ");
                    textString = textString + string2;
                    // remove from next pass
                    currentArray[1] = 999;
                    columnCheck = true;
                    isMidRow = true;
                  } else {
                    let string1 = `${currentArray[0]} `;
                    let string2 = string1.padStart(5, " ");
                    textString = textString + string2;
                    currentArray[1] = 999;
                    columnCheck = true;
                    isMidRow = true;
                  }
                }
              } else {
                // if it is undefined (end of array)
                if (currentArray[1] > 99) {
                  let string1 = `${currentArray[0]} `;
                  let string2 = string1.padStart(4, " ");
                  textString = textString + string2;
                  currentArray[1] = 999;
                  columnCheck = true;
                  isMidRow = true;
                } else {
                  let string1 = `${currentArray[0]} `;
                  let string2 = string1.padStart(5, " ");
                  textString = textString + string2;
                  currentArray[1] = 999;
                  columnCheck = true;
                  isMidRow = true;
                }
              }
            }
          }
          // if there is no entry for that row in the column
          if (columnCheck === false) {
            if (isMidRow === true) {
              textString = textString + `     `;
            } else {
              textString = `     ` + textString;
            }
          }
        }
        tempArray.push(textString);
      }
      tempArray.unshift(newString);
      tempObject.sortArray = tempArray;
      tempObject.key = uuidv4();
      paragraphStrings.push(tempObject);
    }
  }

  return [paragraphStrings, unforcedParticipantNamesArray, numUnforcedParts];
};

export default generateSortMaps;
