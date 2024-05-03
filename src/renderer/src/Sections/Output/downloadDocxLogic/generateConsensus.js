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

const generateConsensus = (data, useHyperlinks) => {
  data.shift();
  data.shift();
  let pageHeader = data.shift();
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
  if (data.length >= 3) {
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
  }

  let columnWidthArray = [
    1100,
    180,
    180,
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
  columnWidthArray.length = data[0].length - 2;

  // SIG TABLES START
  let rowItemsArray = [];
  data.forEach((item, index) => {
    item.shift();
    let corrlsRowArray = [];
    let isHeader = false;
    let isBold = false;
    let isSignificant = false;
    let position;
    let size;

    if (index === 0) {
      isHeader = true;
      isBold = true;
    }
    if (item[0] === "*") {
      isSignificant = true;
    }

    let dynamicParagraphStyle = "tableStyle2";
    if (data[0].length > 13) {
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
        if (index === 0) {
          isBold = true;
        } else {
          isBold = false;
        }

        if (entryIndex > 0) {
          if (entryIndex === 1) {
            position = AlignmentType.START;
            size = 1500;
            if (isSignificant) {
              isBold = true;
              entry = "* " + entry.toString();
            }
          } else {
            position = AlignmentType.CENTER;
            size = 300;
            isBold = false;
          }
          if (index === 0 && entryIndex === 1) {
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
        }
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

  if (data.length >= 3) {
    matrix.push(correlsTable);
  }

  if (data.length < 3) {
    matrix.push(
      new Paragraph({
        style: "bodyStyle1",
        children: [
          new TextRun({
            text: "There were no Consensus Statements",
            bold: false
          })
        ],
        spacing: {
          before: 500
        }
      })
    );
  }

  return matrix;
};

export default generateConsensus;
