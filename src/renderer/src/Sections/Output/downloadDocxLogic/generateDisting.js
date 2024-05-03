import {
  TextRun,
  Paragraph,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  VerticalAlign,
  AlignmentType,
  TABLE_HEADER_FILL,
  InternalHyperlink
} from "docx";

const generateDisting = (data, useHyperlinks, translatedTextObj) => {
  data.shift();
  data.shift();
  let pageHeader = data.shift();
  data.shift();

  let topText = data.shift();
  data.shift();
  let topText2 = data.shift();
  data.shift();
  data.shift();

  let spacingAfter = 250;
  if (useHyperlinks === true) {
    spacingAfter = 0;
  }

  let matrix = [
    new Paragraph({
      children: [
        new TextRun({
          text: pageHeader[0],
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
    matrix.push(
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

  matrix.push(
    new Paragraph({
      style: "bodyStyle1",
      children: [
        new TextRun({
          text: topText[0].toString(),
          bold: false
        })
      ]
    })
  );
  matrix.push(
    new Paragraph({
      style: "bodyStyle1",
      children: [
        new TextRun({
          text: topText2[0].toString(),
          bold: false
        })
      ]
    })
  );

  // PROCESS DATA to remove significance columns
  let newData2 = [];
  data.forEach((item, index) => {
    let tempArray = [];
    item.shift();
    item.forEach((entry, entryIndex) => {
      if (entryIndex > 2) {
        if (entry === "*") {
          tempArray[entryIndex - 1] =
            tempArray[entryIndex - 1].toString() + "*";
        }
      }
      tempArray.push(entry);
    });
    newData2.push(tempArray);
  });

  let newData = [];
  newData2.forEach((item, index) => {
    let tempArray2 = [];
    item.forEach((entry, entryIndex) => {
      if (
        entryIndex === 4 ||
        entryIndex === 7 ||
        entryIndex === 10 ||
        entryIndex === 13 ||
        entryIndex === 16 ||
        entryIndex === 19 ||
        entryIndex === 22 ||
        entryIndex === 25
      ) {
      } else {
        tempArray2.push(entry);
      }
    });
    newData.push(tempArray2);
  });

  let columnWidthArray = [
    1100,
    200,
    200,
    320,
    200,
    320,
    200,
    320,
    200,
    320,
    200,
    320,
    200,
    320,
    200,
    320,
    200,
    320
  ];

  // trim array
  columnWidthArray.length = newData[0].length;

  let hasNoDistinguishingText = false;
  if (newData.length === 2) {
    hasNoDistinguishingText = true;
  }

  // SIG TABLES START
  let rowItemsArray = [];
  newData.forEach((item, index) => {
    let corrlsRowArray = [];
    let isHeader = false;
    let isBold = false;
    let position;
    let size;

    if (index === 0 || index === 1) {
      isHeader = true;
      isBold = true;
    }

    let dynamicParagraphStyle = "tableStyle2";
    if (newData[0].length > 13) {
      dynamicParagraphStyle = "tableStyle8";
    }

    if (index === 0) {
      item.forEach((entry0, entryIndex0) => {
        if (entryIndex0 === 0) {
          position = AlignmentType.START;
          size = 1100;
        } else {
          position = AlignmentType.CENTER;
          size = 200;
        }

        if (entryIndex0 % 2 !== 0) {
          corrlsRowArray.push(
            new TableCell({
              children: [
                new Paragraph({
                  style: dynamicParagraphStyle,
                  alignment: position,
                  children: [
                    new TextRun({
                      text: entry0.toString(),
                      bold: isBold
                    })
                  ]
                })
              ],
              verticalAlign: VerticalAlign.CENTER,
              columnSpan: 2,
              width: {
                size: size,
                type: WidthType.DXA
              }
            })
          ); // end corrlsRowArray push
        }
      });
    } else {
      // DYNAMIC ROW ITEMS
      item.forEach((entry, entryIndex) => {
        let testVal;
        if (entryIndex > 2) {
          testVal = entry.toString().slice(-1);
        }
        if (index === 0 || index === 1 || testVal === "*") {
          isBold = true;
        } else {
          isBold = false;
        }

        if (entryIndex === 0) {
          position = AlignmentType.START;
          size = 1500;
        } else {
          position = AlignmentType.CENTER;
          size = 300;
        }
        if (index === 1 && entryIndex === 0) {
          position = AlignmentType.CENTER;
        }

        corrlsRowArray.push(
          new TableCell({
            children: [
              new Paragraph({
                style: dynamicParagraphStyle,
                alignment: position,
                children: [
                  new TextRun({
                    text: entry.toString(),
                    bold: isBold
                  })
                ]
              })
            ],
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: size,
              type: WidthType.DXA
            },
            shading: {
              fill: TABLE_HEADER_FILL
            }
          })
        ); // end corrlsRowArray push
      });
    }

    rowItemsArray.push(
      new TableRow({
        children: corrlsRowArray,
        tableHeader: isHeader,
        cantSplit: true
      })
    );
  }); // end correlations table for each

  if (hasNoDistinguishingText === false) {
    const correlsTable = new Table({
      width: {
        size: 9800, // tableWidth,
        type: WidthType.DXA
      },
      indent: {
        size: 0,
        type: WidthType.DXA
      },
      columnWidths: columnWidthArray,
      rows: [...rowItemsArray] // end of rows array
    });

    matrix.push(correlsTable);
  } else {
    const correlsTable = new Table({
      width: {
        size: 9800, // tableWidth,
        type: WidthType.DXA
      },
      indent: {
        size: 0,
        type: WidthType.DXA
      },
      columnWidths: columnWidthArray,
      rows: [...rowItemsArray] // end of rows array
    });

    matrix.push(
      correlsTable,
      new Paragraph({
        text: translatedTextObj.noDistinguishingText,
        style: "bodyStyle1",
        spacing: {
          before: 200,
          after: 0
        }
      })
    );
  }

  return matrix;
};

export default generateDisting;
