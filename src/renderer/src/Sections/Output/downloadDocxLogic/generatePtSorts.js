import {
  TextRun,
  Paragraph,
  HeadingLevel,
  ShadingType,
  InternalHyperlink,
  AlignmentType
} from "docx";
import chunk from "lodash/chunk";

const generatePtSorts = (sortsData, useHyperlinks, useZebra) => {
  sortsData.shift();
  sortsData.shift();
  let headerText = sortsData.shift();
  sortsData.shift();

  let spacingAfter = 250;
  if (useHyperlinks === true) {
    spacingAfter = 0;
  }

  const partNumArray = [
    "1 - 10",
    "11 - 20",
    "21 - 30",
    "31 - 40",
    "41 - 50",
    "51 - 60",
    "61 - 70",
    "71 - 80",
    "81 - 90",
    "91 - 100",
    "101 - 110",
    "111 - 120",
    "121 - 130",
    "131 - 140",
    "141 - 150",
    "151 - 160",
    "161 - 170",
    "171 - 180",
    "181 - 190",
    "191 - 200",
    "201 - 210",
    "211 - 220",
    "221 - 230",
    "231 - 240",
    "241 - 250",
    "251 - 260",
    "261 - 270",
    "271 - 280",
    "281 - 290",
    "291 - 300",
    "301 - 310",
    "311 - 320",
    "321 - 330",
    "331 - 340",
    "341 - 350",
    "351 - 360",
    "361 - 370",
    "371 - 380",
    "381 - 390",
    "391 - 400",
    "401 - 410",
    "411 - 420",
    "421 - 430",
    "431 - 440",
    "441 - 450",
    "451 - 460",
    "461 - 470",
    "471 - 480",
    "481 - 490",
    "491 - 500"
  ];

  let numParts = sortsData.length - 1;
  let firstRow = sortsData.shift();
  // POP OFF last row and prep for re-insertion
  firstRow.pop();
  firstRow.push("StDv");

  // chunk and set last part. number
  let chunkedArray = chunk(sortsData, 10);
  let chunkedArrayLocation = chunkedArray.length - 1;
  let targetLabel = partNumArray[chunkedArrayLocation];
  let clippedTargetLabel = targetLabel.slice(0, -3);
  let newTargetLabel = `${clippedTargetLabel} ${numParts}`;
  partNumArray[chunkedArrayLocation] = newTargetLabel;

  /*
   *
   *      MAIN DATA LOOP
   *
   */
  let pageArray = [];
  for (let i = 0; i < chunkedArray.length; i++) {
    // INVERT MATRIX
    let newMatrix = chunkedArray[i][0].map((_, colIndex) =>
      chunkedArray[i].map(row => row[colIndex])
    );

    let length = newMatrix.length - 2;

    // PAGE Header
    let sortsList = [
      new Paragraph({
        children: [
          new TextRun({
            text: `${headerText[0]}  ${partNumArray[i]}`,
            bold: true
          })
        ],
        heading: HeadingLevel.HEADING_1,
        thematicBreak: true,
        pageBreakBefore: true,
        spacing: {
          after: spacingAfter
        }
      })
    ];

    if (useHyperlinks === true) {
      sortsList.push(
        new Paragraph({
          children: [
            new InternalHyperlink({
              children: [
                new TextRun({
                  text: "Return to TOC",
                  style: "Hyperlink"
                })
              ],
              anchor: "anchorForTableOfContents"
            })
          ],
          alignment: AlignmentType.RIGHT,
          spacing: {
            after: 200
          }
        })
      );
    }

    // statements / sorts list items
    newMatrix.forEach((item, index) => {
      let isBold = false;
      if (index === 0) {
        isBold = true;
      }
      if (index >= length) {
        isBold = true;
      }

      let tempArray;

      if (index > 0 && index % 2 === 0 && index < length && useZebra === true) {
        //  first column row item (statement number)
        tempArray = [
          new TextRun({
            text: firstRow[index]
              .toString()
              .substring(0, 4)
              .trim()
              .padEnd(4, " "),
            bold: isBold,
            shading: {
              type: ShadingType.SOLID,
              color: "E2E2E2"
            }
          })
        ];
        // rest of the row items
        item.forEach((entry, entryIndex) => {
          if (index !== 0) {
            isBold = false;
          }
          tempArray.push(
            new TextRun({
              text: entry
                .toString()
                .substring(0, 7)
                .trim()
                .padStart(8, " "),
              bold: isBold,
              shading: {
                type: ShadingType.SOLID,
                color: "E2E2E2"
              }
            })
          ); // end push
        }); // end forEach
      } else {
        //  first column row item (statement number)
        tempArray = [
          new TextRun({
            text: firstRow[index]
              .toString()
              .substring(0, 4)
              .trim()
              .padEnd(4, " "),
            bold: isBold
          })
        ];
        // rest of the row items
        item.forEach((entry, entryIndex) => {
          if (index !== 0) {
            isBold = false;
          }
          tempArray.push(
            new TextRun({
              text: entry
                .toString()
                .substring(0, 7)
                .trim()
                .padStart(8, " "),
              bold: isBold
            })
          ); // end push
        }); // end forEach
      }

      sortsList.push(
        new Paragraph({
          style: "ptQsorts",
          children: [...tempArray],
          spacing: {
            before: 0,
            line: 260,
            after: 0
          }
        })
      );
    }); // end forEach

    pageArray.push(sortsList);
  } // end MAIN CHUNKING PAGE LOOP
  return pageArray;
};

export default generatePtSorts;
