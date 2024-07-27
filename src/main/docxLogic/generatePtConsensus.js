import {
  TextRun,
  Paragraph,
  HeadingLevel,
  AlignmentType,
  InternalHyperlink,
  ShadingType,
} from 'docx';

const generateConsensus = (data, useHyperlinks, useZebra) => {
  data.shift();
  data.shift();
  let pageHeader = data.shift();
  let topText = data.shift();

  data.shift();
  let topText2 = data.shift();
  data.shift();
  data.shift();

  let fontSizeStyle = 'dist8';
  let colSpace = [10, 4, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7];

  if (data[0].length < 20) {
    fontSizeStyle = 'dist6';
    colSpace = [10, 4, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7];
  }
  if (data[0].length < 16) {
    fontSizeStyle = 'dist4';
    colSpace = [30, 4, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 7];
  }

  let topText3 = topText[0].replace('Those', 'Statements');

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

  if (data.length > 3) {
    matrix.push(
      new Paragraph({
        style: fontSizeStyle,
        children: [
          new TextRun({
            text: topText3,
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
  }

  //
  // CONSENSUS TABLES START
  //
  //   let rowItemsArray = [];

  data.forEach((item, index) => {
    item.shift();
    let corrlsRowArray = [];
    let isBold = false;
    let isSignificant = false;

    if (index === 0) {
      isBold = true;
    }
    if (item[0] === '*') {
      isSignificant = true;
    }

    if (index === 0) {
      item.shift();
      item.forEach((entry0, entryIndex0) => {
        if (entryIndex0 === 0 || entryIndex0 === 1) {
          entry0 = `      `;
        } else {
          entry0 = `F${entry0.slice(-3).trim()}`;
        }

        if (data.length > 3) {
          corrlsRowArray.push(
            new TextRun({
              text: entry0
                .toString()
                .substring(0, colSpace[entryIndex0] - 1)
                .padStart(colSpace[entryIndex0], ' '),

              bold: isBold,
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

        if (index === 1) {
          entry = entry.replace('Q-SV', 'QSV').replace('Z-score', 'Zscr');
          isBold = true;
        }

        if (entryIndex > 0) {
          if (entryIndex === 1) {
            if (isSignificant) {
              isBold = true;
              entry = '* ' + entry.toString();
            }
          }

          if (data.length >= 3) {
            if (index > 1 && index % 2 !== 0 && useZebra === true) {
              corrlsRowArray.push(
                new TextRun({
                  text: entry
                    .toString()
                    .substring(0, colSpace[entryIndex - 1] - 1)
                    .padStart(colSpace[entryIndex - 1], ' '),
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
                    .substring(0, colSpace[entryIndex - 1] - 1)
                    .padStart(colSpace[entryIndex - 1], ' '),
                  bold: isBold,
                })
              ); // end corrlsRowArray push
            }
          }
        }
      });
    }

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
  }); // end correlations table for each

  if (data.length < 3) {
    matrix.push(
      new Paragraph({
        style: fontSizeStyle,
        children: [
          new TextRun({
            text: 'There were no Consensus Statements',
            bold: false,
          }),
        ],
        spacing: {
          before: 500,
        },
      })
    );
  }

  return matrix;
};

export default generateConsensus;
