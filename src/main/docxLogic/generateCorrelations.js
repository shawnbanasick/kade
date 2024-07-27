import {
  TextRun,
  ShadingType,
  Paragraph,
  HeadingLevel,
  InternalHyperlink,
  AlignmentType,
} from 'docx';
// import outputState from '../../GlobalState/outputState';
import cloneDeep from 'lodash/cloneDeep';

// import dataSource from "./dataSource";
import chunk from 'lodash/chunk';

const generateCorrelations = (item, useHyperlinks, useZebra, useHightlights, threshold) => {
  const iShiftArray = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210];
  const partNumArray = [
    '1 - 15',
    '16 - 30',
    '31 - 45',
    '46 - 60',
    '61 - 75',
    '76 - 90',
    '91 - 105',
    '106 - 120',
    '121 - 135',
    '136 - 150',
    '151 - 165',
    '166 - 180',
    '181 - 195',
    '196 - 210',
    '211 - 225',
    '226 - 240',
    '241 - 255',
    '256 - 270',
    '271 - 285',
    '286 - 300',
    '301 - 315',
    '316 - 330',
    '331 - 345',
    '346 - 360',
    '361 - 375',
    '376 - 390',
    '391 - 405',
    '406 - 420',
    '421 - 435',
    '436 - 450',
    '451 - 465',
    '466 - 480',
    '481 - 495',
    '496 - 510',
  ];
  const threshold2 = threshold;
  const posColor = '77de51';
  // const posColor2 = posColor;
  const negColor = 'de9e51';
  // const negColor2 = negColor;
  let correlationsText = item[2][0];

  // remove Excel headers
  item.shift();
  item.shift();
  item.shift();
  item.shift();

  let allNamesArray = item.shift();
  // remove "participant" and replace with translation
  allNamesArray.shift();
  let partHeaderText = 'part.'; // change to translations

  let headerLine2 = partHeaderText.padStart(7, ' ');
  let headerLine = headerLine2.padEnd(14, ' ');

  let numParts = item.length;

  // chunk
  let chunkedArray = chunk(item, 15);
  let chunkedArrayLocation = chunkedArray.length - 1;
  let targetLabel = partNumArray[chunkedArrayLocation];

  let newTargetLabel = '';
  if (numParts < 15) {
    let clippedTargetLabel = targetLabel.slice(0, -3);
    newTargetLabel = `${clippedTargetLabel} ${numParts}`;
    partNumArray[chunkedArrayLocation] = newTargetLabel;
  } else {
    newTargetLabel = `${targetLabel} ${numParts}`;
  }

  /*
   *
   *      MAIN DATA LOOP
   *
   */
  let pageArray = [];
  for (let i = 0; i < chunkedArray.length; i++) {
    // INVERT MATRIX
    let newMatrix = chunkedArray[i][0].map((_, colIndex) =>
      chunkedArray[i].map((row) => row[colIndex])
    );

    // pull names
    newMatrix.shift();

    // truncate names and insert into newMatrix
    newMatrix.forEach((item, index) => {
      let name = allNamesArray[index];
      name = name.substring(0, 8);
      item.unshift(name);
    });

    let newHeaderLine = headerLine;
    // create HEADER LINE
    for (let j = 0; j < chunkedArray[i].length; j++) {
      let partNum = j + 1 + iShiftArray[i];
      let stringPartNum = partNum.toString().padStart(4, ' ');
      newHeaderLine = newHeaderLine + stringPartNum;
    }

    // Create PAGE HEADER
    let corrlsList = [
      new Paragraph({
        children: [
          new TextRun({
            text: `${correlationsText} ${partNumArray[i]}`,
            bold: true,
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        thematicBreak: true,
        pageBreakBefore: true,
        spacing: {
          after: 200,
        },
      }),
    ];
    // Create optional HYPERLINK
    let hyperLink = new Paragraph({
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
    });

    // HEADERLINE
    let newHeaderLineText = new Paragraph({
      style: 'correlationsStyle',
      children: [
        new TextRun({
          text: newHeaderLine,
          bold: true,
        }),
      ],
    });
    // end headers

    if (useHyperlinks === true) {
      corrlsList.push(hyperLink);
    }

    // add header after optional hyperlinks
    corrlsList.push(newHeaderLineText);

    // LOOP Thru MATRIX ROWS
    newMatrix.forEach((item, index) => {
      const childrenLines = [];
      // skip front information
      if (item) {
        // LOOP Thru ROW ITEMS
        item.forEach((entry, entryIndex) => {
          if (entryIndex === 0) {
            childrenLines.push(
              new TextRun({
                text: `${(index + 1).toString().padStart(4, ' ')}. ${entry.padEnd(8, ' ')}`,
                bold: true,
              })
            );
          } else {
            if (+entry > threshold && entryIndex + iShiftArray[i] !== index + 1 && useHightlights) {
              childrenLines.push(
                new TextRun({
                  text: entry.toString().padStart(4, ' '),
                  shading: {
                    type: ShadingType.SOLID,
                    color: posColor, // brick (dark - very high positive)
                  },
                })
              );
            } else if (
              +entry > threshold2 &&
              entryIndex + iShiftArray[i] !== index + 1 &&
              useHightlights
            ) {
              childrenLines.push(
                new TextRun({
                  text: entry.toString().padStart(4, ' '),
                  shading: {
                    type: ShadingType.SOLID,
                    color: posColor, // rose (light - high positive)
                  },
                })
              );
            } else if (
              +entry < -threshold &&
              entryIndex + iShiftArray[i] !== index + 1 &&
              useHightlights
            ) {
              childrenLines.push(
                new TextRun({
                  text: entry.toString().padStart(4, ' '),
                  shading: {
                    type: ShadingType.SOLID,
                    color: negColor, // dark orange
                  },
                })
              );
            } else if (
              +entry < -threshold2 &&
              entryIndex + iShiftArray[i] !== index + 1 &&
              useHightlights
            ) {
              childrenLines.push(
                new TextRun({
                  text: entry.toString().padStart(4, ' '),
                  shading: {
                    type: ShadingType.SOLID,
                    color: negColor, // light orange
                  },
                })
              );
              // DIAGONAL ENTRY
            } else if (entryIndex + iShiftArray[i] === index + 1) {
              if (index > 0 && index % 2 !== 0 && useZebra === true) {
                childrenLines.push(
                  new TextRun({
                    text: entry.toString().padStart(4, ' '),
                    bold: true,
                    shading: {
                      type: ShadingType.SOLID,
                      color: 'E2E2E2',
                    },
                  })
                );
              } else {
                childrenLines.push(
                  new TextRun({
                    text: entry.toString().padStart(4, ' '),
                    bold: true,
                  })
                );
              }
            } else {
              // REGULAR CELLS
              if (index > 0 && index % 2 !== 0 && useZebra === true) {
                childrenLines.push(
                  new TextRun({
                    text: entry.toString().padStart(4, ' '),
                    shading: {
                      type: ShadingType.SOLID,
                      color: 'E2E2E2',
                    },
                  })
                );
              } else {
                childrenLines.push(
                  new TextRun({
                    text: entry.toString().padStart(4, ' '),
                  })
                );
              }
            }
          }
        });
        corrlsList.push(
          new Paragraph({
            style: 'correlationsStyle',
            children: [...childrenLines],
            spacing: {
              before: 0,
              line: 260,
              after: 0,
            },
          })
        );
      }
    });
    pageArray.push(corrlsList);
  }

  return pageArray;
};

export default generateCorrelations;
