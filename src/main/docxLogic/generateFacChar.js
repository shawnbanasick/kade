import {
  TextRun,
  Paragraph,
  HeadingLevel,
  AlignmentType,
  InternalHyperlink,
  ShadingType,
} from 'docx';

const generateFacChar = (data, data2, useHyperlinks, useZebra, translatedTextObj) => {
  data.shift();
  data.shift();
  let pageHeader = data.shift();
  data.shift();

  data2.shift();
  data2.shift();
  let sectionHeader = data2.shift();
  data2.shift();

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
      style: 'dist4',
      children: [
        new TextRun({
          text: `Factors`.padStart(37, ' '),
          bold: true,
        }),
      ],
      spacing: {
        before: 500,
      },
    })
  );

  let index0PaddingArray = [32, 7, 7, 7, 7, 7, 7, 7, 7];
  data.forEach((item, index) => {
    let tempArray = [];
    if (index === 0) {
      item.shift();
      item.forEach((entry, entryIndex) => {
        entry = `F${entry.toString().slice(-2).trim()}`;
        tempArray.push(
          new TextRun({
            text: entry.padStart(index0PaddingArray[entryIndex], ' '),
            bold: true,
          })
        );
      });
    }
    if (index > 0) {
      item.forEach((entry, entryIndex) => {
        if (entryIndex === 0) {
          entry = entry.toString().trim().padEnd(26, ' ');
        } else {
          entry = entry.toString().padStart(index0PaddingArray[entryIndex], ' ');
        }

        let tempText;
        if (index % 2 !== 0 && useZebra === true) {
          tempText = new TextRun({
            text: entry,
            shading: {
              type: ShadingType.SOLID,
              color: 'E2E2E2',
            },
          });
        } else {
          tempText = new TextRun({
            text: entry,
          });
        }
        tempArray.push(tempText);
      });
    }
    matrix.push(
      new Paragraph({
        style: 'dist4',
        children: tempArray,
      })
    );
  });

  // STANDARD ERRORS TEXT
  matrix.push(
    new Paragraph({
      style: 'dist4',
      children: [
        new TextRun({
          text: sectionHeader[0],
          bold: true,
        }),
      ],
      spacing: {
        before: 800,
      },
    }),
    new Paragraph({
      style: 'dist4',
      children: [
        new TextRun({
          text: `(${translatedTextObj['diagonalText']})`,
          bold: false,
        }),
      ],
    })
  );

  let data2PaddingArray = [15, 7, 7, 7, 7, 7, 7, 7, 7];
  data2.forEach((item, index) => {
    let tempArray = [];
    if (index === 0) {
      item.shift();
      item.forEach((entry, entryIndex) => {
        entry = `F${entry.toString().slice(-2).trim()}`;
        tempArray.push(
          new TextRun({
            text: entry.padStart(data2PaddingArray[entryIndex], ' '),
            bold: true,
          })
        );
      });
    }
    if (index > 0) {
      item.forEach((entry, entryIndex) => {
        if (entryIndex === 0) {
          entry = entry.toString().padEnd(10, ' ');
          entry = entry.replace(`  `, ` `);
        } else {
          entry = entry.toString();
          if (entry.length < 5) {
            entry = entry + '0';
          }
          entry = entry.padStart(data2PaddingArray[entryIndex], ' ');
        }

        let tempText2;
        if (index % 2 !== 0 && useZebra === true) {
          tempText2 = new TextRun({
            text: entry,
            shading: {
              type: ShadingType.SOLID,
              color: 'E2E2E2',
            },
          });
        } else {
          tempText2 = new TextRun({
            text: entry,
          });
        }
        tempArray.push(tempText2);
      });
    }
    matrix.push(
      new Paragraph({
        style: 'dist4',
        children: tempArray,
      })
    );
  });

  return matrix;
};

export default generateFacChar;
