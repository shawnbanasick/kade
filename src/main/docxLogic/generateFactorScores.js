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
  InternalHyperlink,
} from 'docx';
import chunk from 'lodash/chunk';

const generateUnrotFacMatrix = (
  matrixData,
  matrixData2,
  matrixData3,
  useHyperlinks,
  translatedTextObj
) => {
  // let tableWidth;
  matrixData3.shift();
  matrixData3.shift();
  let headerRow = matrixData3.shift();
  matrixData3.shift();
  matrixData2 = matrixData2.slice(4);
  let newMatrixData = matrixData.slice(4);

  let spacingAfter = 250;
  if (useHyperlinks === true) {
    spacingAfter = 0;
  }

  const headerStyle = {
    shading: {
      fill: '#d3d3d3', // Gray background color (replace with appropriate color code)
    },
  };

  // chunk MATRIX 2
  let chunkedMatrix = [];
  let namesArray = [...matrixData2[0]];
  matrixData2.forEach((item) => {
    let temp1 = chunk(item, 12);
    chunkedMatrix.push(temp1);
  });

  let chunkedMatrix3 = [];
  matrixData3.forEach((item) => {
    let temp1 = chunk(item, 12);
    chunkedMatrix3.push(temp1);
  });

  let headerText = headerRow[1];
  headerText = headerText.replace(/  +/g, ' ');

  // PAGE Header Text
  let matrix = [
    new Paragraph({
      children: [
        new TextRun({
          text: `${headerText}`,
          bold: true,
        }),
      ],
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
      pageBreakBefore: true,
      spacing: {
        after: spacingAfter,
      },
    }),
  ];

  if (useHyperlinks === true) {
    matrix.push(
      new Paragraph({
        children: [
          new InternalHyperlink({
            children: [
              new TextRun({
                text: 'Return to TOC',
                style: 'Hyperlink',
              }),
            ],
            anchor: 'anchorForTableOfContents',
          }),
        ],
        alignment: AlignmentType.RIGHT,
        spacing: {
          after: 200,
        },
      })
    );
  }

  /*
   *
   *  RELATIVE WEIGHTS
   *
   */
  // RELATIVE WEIGHTS TABLE HEADER
  matrix.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `${translatedTextObj['contributingText']} - ${translatedTextObj['relativeWeightsText']}`,
          bold: true,
        }),
      ],
      style: 'tableStyle2',
    })
  );

  // WEIGHTS TABLE
  let rowArray = [];
  newMatrixData.forEach((item, index) => {
    let value;
    let location = AlignmentType.START;
    if (index === 0) {
      location = AlignmentType.CENTER;
    }
    let isBold = false;
    if (index > 0) {
      value = item[2].toFixed(2).toString();
    } else {
      value = item[2].toString();
      isBold = true;
    }
    let tempRow = new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              style: 'tableStyle2',
              alignment: location,
              children: [
                new TextRun({
                  text: item[1].toString(),
                  bold: isBold,
                }),
              ],
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
          margins: {
            top: convertInchesToTwip(0.01),
            bottom: convertInchesToTwip(0.01),
            left: convertInchesToTwip(0.01),
            right: convertInchesToTwip(0.01),
          },
        }),
        new TableCell({
          children: [
            new Paragraph({
              style: 'tableStyle1',
              children: [
                new TextRun({
                  text: value,
                  bold: isBold,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
          margins: {
            top: convertInchesToTwip(0.001),
            bottom: convertInchesToTwip(0.001),
            left: convertInchesToTwip(0.001),
            right: convertInchesToTwip(0.001),
          },
        }),
      ], // end tableRow children
    }); // end tableRow
    rowArray.push(tempRow);
  });

  const contributorsTable = new Table({
    width: {
      size: 4100,
      type: WidthType.DXA,
    },
    indent: {
      size: 0,
      type: WidthType.DXA,
    },
    columnWidths: [1500, 585],
    rows: [...rowArray], // end of rows array
  });

  matrix.push(contributorsTable);

  /*
   **
   **
   ** CONTRIBUTOR CORRELATIONS TABLES BEGIN
   **
   **
   */

  // CORRELATIONS TABLES
  let titleText;
  for (let i = 0; i < chunkedMatrix[0].length; i++) {
    if (i === 0) {
      titleText = `${translatedTextObj['contributingText']} - ${translatedTextObj['correlationMatrixTxt']}`;
    } else {
      titleText = `${translatedTextObj['contributingText']} - ${translatedTextObj['correlationMatrixTxt']} - (${translatedTextObj['contTxt']}.)`;
    }

    matrix.push(
      new Paragraph({
        children: [
          new TextRun({
            text: titleText,
            bold: true,
          }),
        ],
        style: 'tableStyle2',
        spacing: {
          before: 500,
        },
      })
    );

    let columnWidthArray = [1100, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300];

    // CORRELATION TABLE
    let rowItemsArray = [];
    chunkedMatrix.forEach((item, index) => {
      let corrlsRowArray = [];
      let isHeader = false;
      let isBold = false;
      // let location = AlignmentType.CENTER;

      if (index === 0) {
        isHeader = true;
        isBold = true;
      }

      // if second iteration, add left column with Participant names
      if (i > 0) {
        corrlsRowArray.push(
          new TableCell({
            children: [
              new Paragraph({
                style: 'tableStyle1',
                alignment: AlignmentType.START,
                children: [
                  new TextRun({
                    text: namesArray[index].toString(),
                    bold: isBold,
                  }),
                ],
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
            shading: headerStyle.shading,
          })
        ); // end corrlsRowArray
      }

      item[i].forEach((entry, entryIndex) => {
        if (i > 0) {
          columnWidthArray.length = item[i].length + 1;
        } else {
          columnWidthArray.length = item[i].length;
        }

        // let tableWidth = 1500 + (item[i].length - 1) * 764;
        if (entryIndex > 0 && index === 0) {
          columnWidthArray.push(300);
        }

        if (+entry === 100 || index === 0) {
          isBold = true;
        } else {
          isBold = false;
        }
        let position;
        let size;
        if (entryIndex === 0 && i === 0) {
          position = AlignmentType.START;
          size = 1500;
        } else {
          position = AlignmentType.CENTER;
          size = 300;
        }
        if (index === 0 && entryIndex === 0) {
          position = AlignmentType.CENTER;
        }

        corrlsRowArray.push(
          new TableCell({
            children: [
              new Paragraph({
                style: 'tableStyle1',
                alignment: position,
                children: [
                  new TextRun({
                    text: entry.toString(),
                    bold: isBold,
                  }),
                ],
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: size,
              type: WidthType.DXA,
            },
            shading: headerStyle.shading,
          })
        ); // end corrlsRowArray push
      });
      rowItemsArray.push(
        new TableRow({
          children: corrlsRowArray,
          tableHeader: isHeader,
          cantSplit: true,
        })
      );
    }); // end correlations table for each

    const correlsTable = new Table({
      width: {
        size: 9800, // tableWidth,
        type: WidthType.DXA,
      },
      indent: {
        size: 0,
        type: WidthType.DXA,
      },
      columnWidths: columnWidthArray,
      rows: [...rowItemsArray], // end of rows array
    });

    matrix.push(correlsTable);
  } // end correlations chunkedMatrix loop

  /*
   **
   **
   ** FACTOR TABLES BEGIN
   **
   **
   */

  let titleText2;
  for (let i = 0; i < chunkedMatrix3[0].length; i++) {
    if (i === 0) {
      titleText2 = translatedTextObj['factorZScoresTxt'];
    } else {
      titleText2 = `${translatedTextObj['factorZScoresTxt']} - (${translatedTextObj['contTxt']}.)`;
    }

    matrix.push(
      new Paragraph({
        children: [
          new TextRun({
            text: titleText2,
            bold: true,
          }),
        ],
        style: 'tableStyle2',
        spacing: {
          before: 500,
        },
      })
    );

    let columnWidthArray = [300, 1500, 500, 300, 300, 300, 300, 300, 300, 300, 300, 300];

    // FACTORS TABLE
    let rowItemsArray = [];
    // let tableWidth;
    chunkedMatrix3.forEach((item, index) => {
      let corrlsRowArray = [];
      let isHeader = false;
      let isBold = false;
      let location3 = AlignmentType.START;
      if (index === 0) {
        isHeader = true;
        isBold = true;
        location3 = AlignmentType.CENTER;
      }

      // OVERFLOW TABLE
      if (i > 0) {
        let newText = item[0][0].toString();
        if (index === 0) {
          newText = newText.replace('Statement Number', 'Num');
        }
        corrlsRowArray.push(
          new TableCell({
            children: [
              new Paragraph({
                style: 'tableStyle1',
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: newText,
                    bold: isBold,
                  }),
                ],
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 300,
              type: WidthType.DXA,
            },
            shading: headerStyle.shading,
          }),
          new TableCell({
            children: [
              new Paragraph({
                style: 'tableStyle1',
                alignment: location3,
                children: [
                  new TextRun({
                    text: item[0][1].toString(),
                    bold: isBold,
                  }),
                ],
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 1500,
              type: WidthType.DXA,
            },
            shading: headerStyle.shading,
          })
        ); // end corrlsRowArray
      }

      // first iteration items
      item[i].forEach((entry, entryIndex) => {
        if (index === 0) {
          entry = entry.replace('Raw Sort ', '').replace('Statement Number', 'Num');
        }
        if (i > 0) {
          columnWidthArray.length = item[i].length + 2;
        } else {
          columnWidthArray.length = item[i].length;
        }

        // let tableWidth = 1500 + (item[i].length - 1) * 764;
        if (entryIndex > 0 && index === 0) {
          columnWidthArray.push(300);
        }
        // columnWidthArray.push(300);

        let position;
        let size;
        // if second entry in first iteration
        if (entryIndex === 1 && i === 0) {
          position = AlignmentType.START;
          size = 1500;
          // second entry and first iteration and first row
        } else {
          position = AlignmentType.CENTER;
          size = 300;
        }
        if (entryIndex === 1 && i === 0 && index === 0) {
          position = AlignmentType.CENTER;
          size = 1500;
        }

        if (i === 0 && index === 0 && entryIndex > 3) {
          entry = entry.toString().replace(/(.{8})/g, '$1 ');
        }

        corrlsRowArray.push(
          new TableCell({
            children: [
              new Paragraph({
                style: 'tableStyle1',
                alignment: position,
                children: [
                  new TextRun({
                    // this is the text for entire table
                    text: entry.toString(),
                    bold: isBold,
                  }),
                ],
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: size,
              type: WidthType.DXA,
            },
            shading: headerStyle.shading,
          })
        ); // end corrlsRowArray push
      });
      rowItemsArray.push(
        new TableRow({
          children: corrlsRowArray,
          tableHeader: isHeader,
          cantSplit: true,
        })
      );
    }); // end correlations table for each

    const correlsTable = new Table({
      width: {
        size: 9900,
        type: WidthType.DXA,
      },
      indent: {
        size: 0,
        type: WidthType.DXA,
      },
      columnWidths: columnWidthArray,
      rows: [...rowItemsArray], // end of rows array
    });

    matrix.push(correlsTable);
  } // end correlations chunkedMatrix loop

  return matrix;
};

export default generateUnrotFacMatrix;
