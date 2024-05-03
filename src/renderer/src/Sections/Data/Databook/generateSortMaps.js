import uniq from "lodash/uniq";
import zip from "lodash/zip";
import { Paragraph, HeadingLevel, UnderlineType, TextRun } from "docx";
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
  respondentNames,
  mainDataObject,
  statementNumArray,
  multiplierArray,
  translationObject
) => {
  const newArray = uniq(qSortPattern);

  const generatedString = [
    new Paragraph({
      children: [
        new TextRun({
          text: `${translationObject.partQsorts}`,
          bold: true
        })
      ],
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
      spacing: {
        before: 400,
        after: 400
      }
    })
  ];

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
  let displayStringsArray = [];

  if (mainDataObject !== undefined) {
    for (let m = 0; m < mainDataObject.length; m++) {
      respondentArray = mainDataObject[m].rawSort;

      let thisMultiplierArray2 = [...mainDataObject[m].rawSort].sort(
        (a, b) => a - b
      );

      // to deal with unforced Q sorts - triangle shape may vary
      let thisMultiplierArray = calcMultiplierArrayT2([
        ...thisMultiplierArray2
      ]);

      let unforcedTest = isEqual(multiplierArray, thisMultiplierArray);
      let nameString = mainDataObject[m].name;
      if (!unforcedTest) {
        nameString = `${nameString}     ** ${i18n.t("Unforced Q sort")} **`;
        unforcedParticipantNamesArray.push(nameString);
      } else {
        unforcedParticipantNamesArray.push(nameString);
      }

      let maxValue = Math.max(...thisMultiplierArray);

      let zippedArray2 = zip(statementNumArray, respondentArray);
      zippedArray2.sort(compareSecondColumn);
      let zippedArray = JSON.parse(JSON.stringify(zippedArray2));
      zippedArray.sort(reorderByFirstColumn);

      let paragraphStrings = [];
      // for all possible pyramid rows
      for (let i = 0; i < maxValue; i++) {
        // iterate pyramid height
        let textString = ``;
        let isMidRow = false;
        for (let j = 0; j < newArray.length; j++) {
          // iterate through cols
          let columnCheck = false;
          for (let k = 0; k < zippedArray.length; k++) {
            // get comparison arrays
            let currentArray = zippedArray[k];
            let comparisonArray = zippedArray[k + 1];
            // if the sort value equals the col value
            if (currentArray[1] === newArray[j]) {
              // the comparison array is not undefined
              if (comparisonArray !== undefined) {
                // if the array is the last one
                if (currentArray[1] !== comparisonArray[1]) {
                  if (currentArray[1] > 99) {
                    let string1 = `${currentArray[0]} `;
                    let string2 = string1.padStart(4, " ");
                    textString = textString + string2;
                    currentArray[1] = 999;
                    isMidRow = true;
                    columnCheck = true;
                  } else {
                    let string1 = `${currentArray[0]} `;
                    let string2 = string1.padStart(5, " ");
                    textString = textString + string2;
                    currentArray[1] = 999;
                    isMidRow = true;
                    columnCheck = true;
                  }
                }
              } else {
                // if it is undefined (end of line)
                if (currentArray[1] > 99) {
                  let string1 = `${currentArray[0]} `;
                  let string2 = string1.padStart(4, " ");
                  textString = textString + string2;
                  currentArray[1] = 999;
                  isMidRow = true;
                  columnCheck = true;
                } else {
                  let string1 = `${currentArray[0]} `;
                  let string2 = string1.padStart(5, " ");
                  textString = textString + string2;
                  currentArray[1] = 999;
                  isMidRow = true;
                  columnCheck = true;
                }
              }
            }
          }
          if (columnCheck === false) {
            if (isMidRow === true) {
              textString = textString + `     `;
            } else {
              textString = `     ` + textString;
            }
          }
        }
        paragraphStrings.push(textString);
      }

      // Q sort Paragraphs Participant Names
      let p1 = new Paragraph({
        children: [
          new TextRun({
            text: `${m + 1}. ${unforcedParticipantNamesArray[m]}`,
            bold: true
          })
        ],
        heading: HeadingLevel.HEADING_6,
        spacing: {
          after: 100,
          before: 500
        }
      });

      // Q sort Paragraphs Header values with underline
      let p2 = new Paragraph({
        children: [
          new TextRun({
            text: newString,
            underline: { type: UnderlineType.SINGLE }
          })
        ]
      });

      generatedString.push(p1, p2);

      // Q sort Paragraphs - Sort Values
      for (let m = 0; m < paragraphStrings.length; m++) {
        let text = new Paragraph({
          text: paragraphStrings[m]
        });
        generatedString.push(text);
      }

      // End of Doc - Q Sorts as flat arrays
      let text = new Paragraph({
        text: `${mainDataObject[m].name}: ${mainDataObject[m].displaySort}`,
        indent: {
          start: 600,
          hanging: 500
        },
        spacing: {
          after: 100,
          before: 500
        }
      });
      displayStringsArray.push(text);
    }
  }
  generatedString.push(...displayStringsArray);
  return generatedString;
};

export default generateSortMaps;
