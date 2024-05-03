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
  convertInchesToTwip,
  InternalHyperlink
} from "docx";

const generateDescendingDiff = (data, useHyperlinks) => {
  data.shift();
  data.shift();
  let headerText = data.shift();
  data.shift();

  let spacingAfter = 250;
  if (useHyperlinks === true) {
    spacingAfter = 0;
  }

  // PAGE Header Text
  let matrix = [
    new Paragraph({
      children: [
        new TextRun({
          text: headerText[0],
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

  let rowArray = [];
  data.forEach((item, index) => {
    let isHeader = false;
    let location = VerticalAlign.START;
    let isBold = false;

    if (index === 0) {
      isHeader = true;
      location = VerticalAlign.CENTER;
      isBold = true;
    }

    let tempRow = new TableRow({
      tableHeader: isHeader,
      cantSplit: true,
      children: [
        // STATEMENT NUMBER
        new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          children: [
            new Paragraph({
              style: "tableStyle2",
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: item[0].toString(),
                  bold: isBold
                })
              ]
            })
          ],
          width: {
            size: 964,
            type: WidthType.DXA
          },
          margins: {
            top: convertInchesToTwip(0.015),
            bottom: convertInchesToTwip(0.015),
            left: convertInchesToTwip(0.015),
            right: convertInchesToTwip(0.015)
          }
        }),
        // STATEMENT
        new TableCell({
          children: [
            new Paragraph({
              style: "tableStyle2",
              alignment: location,
              children: [
                new TextRun({
                  text: item[1].toString(),
                  bold: isBold
                })
              ]
            })
          ],
          width: {
            size: 5348,
            type: WidthType.DXA
          },
          verticalAlign: VerticalAlign.CENTER
        }),
        // First FACTOR
        new TableCell({
          children: [
            new Paragraph({
              style: "tableStyle2",
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: item[2].toString(),
                  bold: isBold
                })
              ]
            })
          ],
          width: {
            size: 1200,
            type: WidthType.DXA
          },
          verticalAlign: VerticalAlign.CENTER
        }),
        // Second FACTOR
        new TableCell({
          children: [
            new Paragraph({
              style: "tableStyle2",
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: item[3].toString(),
                  bold: isBold
                })
              ]
            })
          ],
          width: {
            size: 1200,
            type: WidthType.DXA
          },
          verticalAlign: VerticalAlign.CENTER
        }),
        // DIFF
        new TableCell({
          children: [
            new Paragraph({
              style: "tableStyle2",
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: item[4].toString(),
                  bold: isBold
                })
              ],
              width: {
                size: 15,
                type: WidthType.PERCENTAGE
              }
            })
          ],
          width: {
            size: 1200,
            type: WidthType.DXA
          },
          verticalAlign: VerticalAlign.CENTER
        })
      ] // end tableRow children
    }); // end tableRow
    rowArray.push(tempRow);
  }); // end for each

  const contributorsTable = new Table({
    columns: 5,
    indent: {
      size: 0,
      type: WidthType.DXA
    },
    columnWidths: [964, 5348, 1200, 1200, 1200],
    rows: [...rowArray] // end of rows array
  });

  matrix.push(contributorsTable);

  return matrix;
};

export default generateDescendingDiff;
