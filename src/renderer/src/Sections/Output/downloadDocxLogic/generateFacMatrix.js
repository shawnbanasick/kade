import {
  TextRun,
  Paragraph,
  HeadingLevel,
  ShadingType,
  InternalHyperlink,
  AlignmentType,
} from 'docx';

const generateUnrotFacMatrix = (matrixData, useHyperlinks, useZebra, translatedTextObj) => {
  let expVar = matrixData.pop();
  matrixData.shift();
  matrixData.shift();
  let headerText = matrixData.shift();
  matrixData.shift();

  let matrix = [
    new Paragraph({
      children: [
        new TextRun({
          text: headerText[0],
          bold: true,
        }),
      ],
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
      pageBreakBefore: true,
      spacing: {
        after: 0,
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
      style: 'dist4',
      children: [
        new TextRun({
          text: translatedTextObj['flaggedFactorLoadingsText'],
          bold: true,
        }),
      ],
      spacing: {
        before: 200,
        line: 260,
        after: 200,
      },
    })
  );

  matrixData.forEach((item, index) => {
    const childrenLines = [];

    // HEADER
    if (index === 0) {
      // push header 1
      childrenLines.push(
        new TextRun({
          text: item[0].toString().substring(0, 3).padStart(3, ' '),
          bold: true,
        })
      );
      childrenLines.push(
        new TextRun({
          text: item[1].toString().substring(0, 11).padStart(12, ' '),
          bold: true,
        })
      );
      item.forEach((entry, entryIndex) => {
        if (entryIndex > 1) {
          if (entry !== '') {
            // push headers all
            let facNumber = entry.slice(-2).trim();
            childrenLines.push(
              new TextRun({
                text: ` F${facNumber}`.padStart(8, ' '),
                bold: true,
              })
            );
          }
        }
      });
    } else {
      // ROWS
      item.forEach((entry, entryIndex) => {
        let newEntry;
        if (entryIndex === 0) {
          // push participant number
          if (index > 0 && index % 2 === 0 && useZebra === true) {
            childrenLines.push(
              new TextRun({
                text: `${entry.toString().padStart(3, ' ')} `,
                shading: {
                  type: ShadingType.SOLID,
                  color: 'E2E2E2',
                },
              })
            );
          } else {
            childrenLines.push(
              new TextRun({
                text: `${entry.toString().padStart(3, ' ')} `,
              })
            );
          }
        } else if (entryIndex === 1) {
          let shortPartName = entry.slice(0, 14);
          // push participant name

          if (index > 0 && index % 2 === 0 && useZebra === true) {
            childrenLines.push(
              new TextRun({
                text: `${shortPartName.toString().substring(0, 13).padStart(13, ' ')}`,
                shading: {
                  type: ShadingType.SOLID,
                  color: 'E2E2E2',
                },
              })
            );
          } else {
            childrenLines.push(
              new TextRun({
                text: `${shortPartName.toString().substring(0, 13).padStart(13, ' ')}`,
              })
            );
          }
        } else {
          let highlight = false;
          if (isNaN(item[entryIndex + 1]) && item[entryIndex + 1] !== undefined) {
            highlight = true;
          }

          // push numeric values
          if (isNaN(entry) || entry === '') {
            // catch errors
          } else {
            let entryString = entry.toString();
            if (+entry < 0 && entryString.length < 7) {
              newEntry = entryString + '0';
            } else if (+entry > 0 && entryString.length < 6) {
              newEntry = entryString + '0';
            } else {
              newEntry = entryString;
            }
            if (highlight) {
              childrenLines.push(
                new TextRun({
                  text: `${newEntry.padStart(8, ' ')}`,
                  bold: true,
                  shading: {
                    type: ShadingType.SOLID,
                    color: 'ffdc9d',
                  },
                })
              ); // end push
            } else {
              if (index > 0 && index % 2 === 0 && useZebra === true) {
                childrenLines.push(
                  new TextRun({
                    text: `${newEntry.padStart(8, ' ')}`,
                    shading: {
                      type: ShadingType.SOLID,
                      color: 'E2E2E2',
                    },
                  })
                ); // end push
              } else {
                childrenLines.push(
                  new TextRun({
                    text: `${newEntry.padStart(8, ' ')}`,
                  })
                ); // end push
              }
            }
          }
        }
      });
    }

    matrix.push(
      new Paragraph({
        style: 'dist4',
        children: [...childrenLines],
        spacing: {
          before: 0,
          after: 0,
        },
      })
    );
  });

  let expArray = [];
  expVar.forEach((item, index) => {
    let isBold = false;
    if (index === 0) {
      isBold = true;
      expArray.push(
        new TextRun({
          text: `% Explained Var`, // item,
          bold: isBold,
        })
      );
    } else {
      expArray.push(
        new TextRun({
          text: `${item.toString().padStart(4, ' ')}`,
          bold: isBold,
        })
      );
    }
  });
  matrix.push(
    new Paragraph({
      style: 'dist4',
      children: [...expArray],
      spacing: {
        before: 300,
      },
    })
  );

  return matrix;
};

export default generateUnrotFacMatrix;
