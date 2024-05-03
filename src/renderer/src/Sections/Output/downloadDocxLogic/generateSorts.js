import {
  TextRun,
  Paragraph,
  HeadingLevel,
  TableCell,
  AlignmentType,
  VerticalAlign,
  TableRow,
  WidthType,
  Table,
  TableLayoutType,
  InternalHyperlink
} from "docx";
import chunk from "lodash/chunk";

const generateSorts = (sortsData, useHyperlinks) => {
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
  firstRow.push("Std. Dev.");

  let chunkedArray = chunk(sortsData, 10);
  let chunkedArrayLocation = chunkedArray.length - 1;
  let targetLabel = partNumArray[chunkedArrayLocation];
  let clippedTargetLabel = targetLabel.slice(0, -3);
  let newTargetLabel = `${clippedTargetLabel} ${numParts}`;
  partNumArray[chunkedArrayLocation] = newTargetLabel;
  // let lastArray = partNumArray.slice(-1)[0];

  // MAIN DATA LOOP
  let pageArray = [];
  for (let i = 0; i < chunkedArray.length; i++) {
    // INVERT MATRIX
    let newMatrix = chunkedArray[i][0].map((_, colIndex) =>
      chunkedArray[i].map(row => row[colIndex])
    );

    // 2505 total width?
    let length = newMatrix[0].length;
    let columnWidthsArray = new Array(length).fill(285);
    columnWidthsArray.unshift(800);

    // let cutoffLength = newMatrix.length - 2;

    // Header
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

    // statements list
    let rowArray = [];
    newMatrix.forEach((item, index) => {
      //  first column row item (statement number)
      let tempArray = [
        new TableCell({
          children: [
            new Paragraph({
              style: "tableStyle1",
              text: firstRow[index].toString(),
              alignment: AlignmentType.CENTER,
              width: {
                size: 9.09,
                type: WidthType.PERCENTAGE
              },
              layout: TableLayoutType.FIXED
            })
          ],
          verticalAlign: VerticalAlign.CENTER
        })
      ];
      // rest of the row items
      item.forEach((entry, entryIndex) => {
        if (index === 0) {
          entry = entry.toString().replace(/(.{8})/g, "$1 ");
        }

        tempArray.push(
          new TableCell({
            children: [
              new Paragraph({
                style: "tableStyle1",
                text: entry.toString(),
                alignment: AlignmentType.CENTER,
                width: {
                  size: 9.09
                },
                layout: TableLayoutType.FIXED
              })
            ],
            verticalAlign: VerticalAlign.CENTER
          })
        ); // end push
      }); // end forEach

      if (index === 0) {
        rowArray.push(
          new TableRow({
            children: [...tempArray],
            cantSplit: true,
            tableHeader: true
          })
        );
      } else {
        rowArray.push(
          new TableRow({
            children: [...tempArray],
            cantSplit: true
          })
        );
      }
    }); // end forEach

    const table = new Table({
      width: {
        size: 9900,
        type: WidthType.DXA
      },

      indent: {
        size: 0,
        type: WidthType.DXA
      },
      // columnWidths: columnWidthsArray,
      rows: [...rowArray] // end of rows array
    });

    sortsList.push(table);
    pageArray.push(sortsList);
  } // end MAIN PAGING LOOP

  return pageArray;
};

export default generateSorts;
