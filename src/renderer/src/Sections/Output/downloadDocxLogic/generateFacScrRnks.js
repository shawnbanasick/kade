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

const generateUnrotFacMatrix = (matrixData, useHyperlinks) => {
  matrixData.shift();
  matrixData.shift();
  const headerText2 = matrixData.shift();
  let headerText = headerText2[1];
  matrixData.shift();

  let matrix;
  let pageArray = [];

  let spacingAfter = 250;
  if (useHyperlinks === true) {
    spacingAfter = 0;
  }

  // calc number of factors
  const numFactors = (matrixData[0].length - 3) / 2;
  let numFactorColumns = numFactors;
  let numColWidths = numFactors;
  if (numColWidths > 4) {
    numColWidths = 4;
  }
  let numLoops = 1;
  if (numFactors > 4) {
    numLoops = 2;
  }

  let varIter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const varIter2 = [1, 2, 11, 12, 13, 14, 15, 16, 17, 18];

  let headerIter = [3, 5, 7, 9];
  let headerIte2 = [11, 13, 15, 17];

  // start MAIN TABLE LOOP
  for (let j = 0; j < numLoops; j++) {
    let rowArray = [];

    // Table 2 shifts
    if (j === 1) {
      headerText = "Factor Scores with Corresponding Ranks   (Cont.)";
      headerIter = [...headerIte2];
      varIter = [...varIter2];
      numFactorColumns = numFactorColumns - 4;
      numColWidths = numFactors - 4;
    }

    let colWidthArray = [1400, 285];
    for (let i = 0; i < numColWidths; i++) {
      colWidthArray.push(350, 305);
    }

    // setup PAGE header
    matrix = [
      new Paragraph({
        children: [
          new TextRun({
            text: headerText,
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

    // setup table header array 1
    let childRowHeader1 = [
      new TableCell({
        children: [
          new Paragraph({
            style: "tableStyle1",
            text: matrixData[1][1],
            alignment: AlignmentType.CENTER
          })
        ],
        verticalAlign: VerticalAlign.CENTER,
        columnSpan: 2
      })
    ];
    // push remaining header array 1 according to # factors
    for (let k = 0; k < numColWidths; k++) {
      childRowHeader1.push(
        new TableCell({
          children: [
            new Paragraph({
              style: "tableStyle1",
              text: matrixData[0][headerIter[k]].toString(),
              alignment: AlignmentType.CENTER
            })
          ],
          columnSpan: 2,
          verticalAlign: VerticalAlign.CENTER
        })
      );
    }

    // setup table header array 2
    let childRowHeader2 = [
      new TableCell({
        children: [
          new Paragraph({
            style: "tableStyle1",
            text: matrixData[0][1],
            alignment: AlignmentType.CENTER
          })
        ],
        verticalAlign: VerticalAlign.CENTER
      }),
      new TableCell({
        children: [
          new Paragraph({
            style: "tableStyle1",
            text: "state. num.",
            alignment: AlignmentType.CENTER
          })
        ],
        verticalAlign: VerticalAlign.CENTER
      })
    ];

    let mShift = 3;
    let mShift2;
    for (let m = 0; m < numColWidths; m++) {
      mShift2 = mShift + 1;
      childRowHeader2.push(
        new TableCell({
          children: [
            new Paragraph({
              style: "tableStyle1",
              text: matrixData[1][mShift].toString(),
              alignment: AlignmentType.CENTER
            })
          ],
          verticalAlign: VerticalAlign.CENTER
        }),
        new TableCell({
          children: [
            new Paragraph({
              style: "tableStyle1",
              text: matrixData[1][mShift2].toString(),
              alignment: AlignmentType.CENTER
            })
          ],
          verticalAlign: VerticalAlign.CENTER
        })
      );
      mShift = mShift + 2;
    }

    rowArray = [
      new TableRow({
        tableHeader: true,
        children: [...childRowHeader1]
      }),

      new TableRow({
        tableHeader: true,
        children: [...childRowHeader2]
      }) // end table row // end table row
    ];

    // setup DATA ROWS
    // keep for loop - ES lint indicates warning with arrow functions
    for (let i = 0; i < matrixData.length; i++) {
      let item = matrixData[i];
      let index = i;
      // matrixData.forEach((item, index) => {
      if (index > 1) {
        // iterate Data row items
        let dataRow = [
          // statements
          new TableCell({
            children: [
              new Paragraph({
                style: "tableStyle1",
                text: item[varIter[0]]
              })
            ],
            margins: {
              top: convertInchesToTwip(0.01),
              bottom: convertInchesToTwip(0.01),
              left: convertInchesToTwip(0.01),
              right: convertInchesToTwip(0.015)
            }
          }),
          // statement number
          new TableCell({
            children: [
              new Paragraph({
                style: "tableStyle1",
                text: item[varIter[1]].toString(),
                alignment: AlignmentType.CENTER
              })
            ],
            verticalAlign: VerticalAlign.CENTER
          })
        ];

        let pShift = 2;
        let pShift1;
        for (let p = 0; p < numColWidths; p++) {
          pShift1 = pShift + 1;
          dataRow.push(
            // factor 1 Z-score
            new TableCell({
              children: [
                new Paragraph({
                  style: "tableStyle1",
                  text: item[varIter[pShift]].toString(),
                  alignment: AlignmentType.END
                })
              ],
              margins: {
                top: convertInchesToTwip(0.01),
                bottom: convertInchesToTwip(0.01),
                left: convertInchesToTwip(0.01),
                right: convertInchesToTwip(0.015)
              },
              verticalAlign: VerticalAlign.CENTER
            }),
            // factor 1 Rank
            new TableCell({
              children: [
                new Paragraph({
                  style: "tableStyle1",
                  text: item[varIter[pShift1]].toString(),
                  alignment: AlignmentType.CENTER
                })
              ],
              verticalAlign: VerticalAlign.CENTER
            })
          );

          pShift = pShift + 2;
        }

        let tempRow = new TableRow({
          cantSplit: true,
          children: [...dataRow]
        });
        rowArray.push(tempRow);
      }
      // });
    }

    const table = new Table({
      width: {
        size: 9900,
        type: WidthType.DXA
      },
      indent: {
        size: 0,
        type: WidthType.DXA
      },
      columnWidths: colWidthArray,
      rows: [...rowArray] // end of rows array
    });

    matrix.push(table);
    pageArray.push(matrix);
  } // end main table looping

  return pageArray;
};

export default generateUnrotFacMatrix;
