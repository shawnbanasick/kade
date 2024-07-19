import {
  TextRun,
  Paragraph,
  HeadingLevel,
  AlignmentType,
  ShadingType,
  InternalHyperlink,
} from 'docx';

const generateDisting = (data, useHyperlinks, useZebra, translatedTextObj) => {
  data.shift();
  data.shift();
  let pageHeader = data.shift();
  data.shift();

  let topText = data.shift();
  data.shift();
  let topText2 = data.shift();
  data.shift();
  data.shift();

  let fontSizeStyle = 'dist8';
  let colSpace = [10, 4, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7];

  if (data[0].length < 27) {
    fontSizeStyle = 'dist6';
    colSpace = [10, 4, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7];
  }
  if (data[0].length < 21) {
    fontSizeStyle = 'dist4';
    colSpace = [30, 4, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7];
  }

  let spacingAfter = 250;
  if (useHyperlinks === true) {
    spacingAfter = 0;
  }

  let matrix = [
    new Paragraph({
      children: [
        new TextRun({
          text: pageHeader[0],
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

  matrix.push(
    new Paragraph({
      style: fontSizeStyle,
      children: [
        new TextRun({
          text: topText[0].toString(),
          bold: false,
        }),
      ],
    })
  );
  matrix.push(
    new Paragraph({
      style: fontSizeStyle,
      children: [
        new TextRun({
          text: topText2[0].toString(),
          bold: false,
        }),
      ],
    })
  );

  // PROCESS DATA to remove significance columns
  let newData2 = [];
  data.forEach((item, index) => {
    let tempArray = [];
    item.shift();
    item.forEach((entry, entryIndex) => {
      if (entryIndex > 2) {
        if (entry === '*') {
          tempArray[entryIndex - 1] = tempArray[entryIndex - 1].toString() + '*';
        }
      }
      tempArray.push(entry);
    });
    newData2.push(tempArray);
  });

  //
  //  BEGIN TABLE
  //
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

  let hasNoDistinguishingText = false;
  if (newData.length === 2) {
    hasNoDistinguishingText = true;
  }

  // SIG TABLES START
  newData.forEach((item, index) => {
    let corrlsRowArray = [];
    let isBold = false;

    if (index === 0 || index === 1) {
      isBold = true;
    }

    /*     let dynamicParagraphStyle = "tableStyle2";
    if (newData[0].length > 13) {
      dynamicParagraphStyle = "tableStyle8";
    }
 */
    if (index === 0) {
      item.forEach((entry0, entryIndex0) => {
        if (entryIndex0 === 0 || entryIndex0 === 1) {
          entry0 = `      `;
        } else {
          entry0 = `F${entry0.slice(-3).trim()}`;
        }
        // if (entryIndex0 % 2 !== 0) {
        corrlsRowArray.push(
          new TextRun({
            text: entry0
              .toString()
              .substring(0, colSpace[entryIndex0] - 1)
              .padStart(colSpace[entryIndex0], ' '),
            bold: isBold,
          })
        ); // end corrlsRowArray push
        // }
      });
    } else {
      // DYNAMIC ROW ITEMS

      item.forEach((entry, entryIndex) => {
        let testVal;
        if (entryIndex > 2) {
          testVal = entry.toString().slice(-1);
        }
        if (index === 0 || index === 1 || testVal === '*') {
          isBold = true;
        } else {
          isBold = false;
        }

        if (index > 1 && index % 2 !== 0 && useZebra === true) {
          corrlsRowArray.push(
            new TextRun({
              text: entry
                .toString()
                .substring(0, colSpace[entryIndex] - 1)
                .padStart(colSpace[entryIndex], ' '),
              bold: isBold,
              shading: {
                type: ShadingType.SOLID,
                color: 'E2E2E2',
              },
            })
          ); // end corrlsRowArray push
        } else {
          corrlsRowArray.push(
            new TextRun({
              text: entry
                .toString()
                .substring(0, colSpace[entryIndex] - 1)
                .padStart(colSpace[entryIndex], ' '),
              bold: isBold,
            })
          ); // end corrlsRowArray push
        }
        if (hasNoDistinguishingText === true) {
          corrlsRowArray = [
            new TextRun({
              text: translatedTextObj.noDistinguishingText,
              bold: true,
            }),
          ];
        }
      });
    }

    if (hasNoDistinguishingText === false) {
      matrix.push(
        new Paragraph({
          children: corrlsRowArray,
          style: fontSizeStyle,
          spacing: {
            before: 0,
            after: 0,
          },
        })
      );
    } else {
      matrix.push(
        new Paragraph({
          children: corrlsRowArray,
          style: fontSizeStyle,
          spacing: {
            before: 200,
            after: 0,
          },
        })
      );
    }
  }); // end correlations table for each
  return matrix;
};

export default generateDisting;
