import {
  TextRun,
  Paragraph,
  HeadingLevel,
  AlignmentType,
  InternalHyperlink,
  ShadingType,
} from 'docx';

const generatePtFacScrRnks = (matrixData, useHyperlinks, useZebra) => {
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
  const numFactors = (matrixData[4].length - 3) / 2;
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
      headerText = headerText + `   (Cont.)`;
      headerIter = [...headerIte2];
      varIter = [...varIter2];
      numFactorColumns = numFactorColumns - 4;
      numColWidths = numFactors - 4;
    }

    let colWidthArray = [1700, 285];
    for (let i = 0; i < numColWidths; i++) {
      colWidthArray.push(300, 300);
    }

    // setup PAGE header
    matrix = [
      new Paragraph({
        children: [
          new TextRun({
            text: headerText,
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

    // setup table header array 1
    let childRowHeader1 = [
      // first column spacing
      new TextRun({
        text: matrixData[1][1].toString().padEnd(39, ' '),
        bold: true,
      }),
    ];
    // push remaining header array 1 according to # factors
    for (let k = 0; k < numColWidths; k++) {
      let entry = `F${matrixData[0][headerIter[k]].slice(-3).trim()}`;
      childRowHeader1.push(
        new TextRun({
          text: entry.padStart(5, ' '),
          bold: true,
        }),
        new TextRun({
          text: entry.padStart(5, ' '),
          bold: true,
        })
      );
    }

    // setup table header array 2
    let childRowHeader2 = [
      new TextRun({
        text: matrixData[0][1].toString().trim().padStart(22, ' '),
        bold: true,
      }),

      new TextRun({
        text: 'Nm'.toString().trim().padStart(17, ' '),
        bold: true,
      }),
    ];

    let mShift = 3;
    for (let m = 0; m < numColWidths; m++) {
      childRowHeader2.push(
        new TextRun({
          text: `Zscr`.padStart(6, ' '),
          bold: true,
        }),

        new TextRun({
          text: `Rnk`.padStart(4, ' '),
          bold: true,
        })
      );
      mShift = mShift + 2;
    }

    rowArray = [
      new Paragraph({
        style: 'dist4',
        children: [...childRowHeader1],
        spacing: {
          after: 0,
          line: 260,
        },
      }),

      new Paragraph({
        style: 'dist4',
        children: [...childRowHeader2],
        spacing: {
          before: 0,
          line: 260,
        },
      }),
    ];

    // setup DATA ROWS
    // keep for loop - ES lint indicates warning with arrow functions
    for (let i = 0; i < matrixData.length; i++) {
      let item = matrixData[i];
      let index = i;
      //     matrixData.forEach((item, index) => {
      if (index > 1) {
        // iterate Data row items
        let dataRow = [
          // statements
          new TextRun({
            text: item[varIter[0]].toString().substring(0, 35).trim().padEnd(36, ' '),
          }),
          new TextRun({
            text: item[varIter[1]].toString().substring(0, 4).trim().padStart(3, ' '),
          }),
        ];

        let pShift = 2;
        let pShift1;
        for (let p = 0; p < numColWidths; p++) {
          pShift1 = pShift + 1;
          dataRow.push(
            // factor 1 Z-score
            new TextRun({
              text: item[varIter[pShift]].toString().trim().padStart(6, ' '),
            }),

            // factor 1 Rank
            new TextRun({
              text: item[varIter[pShift1]].toString().trim().padStart(4, ' '),
            })
          );
          pShift = pShift + 2;
        }

        if (index > 0 && index % 2 === 0 && useZebra === true) {
          rowArray.push(
            new Paragraph({
              style: 'dist4',
              children: [...dataRow],
              shading: {
                type: ShadingType.SOLID,
                color: 'E2E2E2',
              },
              spacing: {
                before: 0,
                after: 0,
              },
            })
          );
        } else {
          rowArray.push(
            new Paragraph({
              style: 'dist4',
              children: [...dataRow],
              spacing: {
                before: 0,
                after: 0,
              },
            })
          );
        }
      }
      //});
    }

    matrix.push(...rowArray);
    pageArray.push(matrix);
  } // end main table looping

  return pageArray;
};

export default generatePtFacScrRnks;
