import {
  TextRun,
  Paragraph,
  HeadingLevel,
  AlignmentType,
  InternalHyperlink,
  ShadingType,
} from 'docx';

const generateUnrotFacMatrix = (matrixData, useHyperlinks, useZebra) => {
  matrixData.shift();
  matrixData.shift();
  let headerText = matrixData.shift();
  matrixData.shift();

  let expVar = matrixData.pop();
  let eigenVal = matrixData.pop();

  // remove empty array at end
  matrixData.pop();

  let spacingAfter = 250;
  if (useHyperlinks === true) {
    spacingAfter = 0;
  }

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

  let colSpacing = [3, 15, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8];

  matrixData.forEach((item, index) => {
    const childrenLines = [];
    // header row
    if (index === 0) {
      childrenLines.push(
        new TextRun({
          text: item[0].toString().padStart(3, ' '),
          bold: true,
        }),
        new TextRun({
          text: item[1].toString().padStart(15, ' '),
          bold: true,
        })
      );
      item.forEach((entry, entryIndex) => {
        // push headers all
        if (entryIndex > 1) {
          childrenLines.push(
            new TextRun({
              text: `Fac. ${entry.toString().slice(-2).trim()}`.padStart(8, ' '),
              bold: true,
            })
          );
        }
      });
    } else {
      item.forEach((entry, entryIndex) => {
        let newEntry;

        // push numeric values
        let entryString = entry.toString();
        if (+entry < 0 && entryString.length < 7) {
          newEntry = entryString + '0';
        } else if (+entry > 0 && entryString.length < 6 && entryIndex > 0) {
          newEntry = entryString + '0';
          if (+newEntry > 0) {
            newEntry = newEntry.toString().padEnd(6, '0');
          } else {
            newEntry = newEntry.toString().padEnd(5, '0');
          }
        } else {
          newEntry = entryString;
        }

        if (index > 0 && index % 2 === 0 && useZebra === true) {
          childrenLines.push(
            new TextRun({
              text: `${newEntry
                .substring(0, colSpacing[entryIndex] - 1)
                .padStart(colSpacing[entryIndex], ' ')}`,
              shading: {
                type: ShadingType.SOLID,
                color: 'E2E2E2',
              },
            })
          );
        } else {
          childrenLines.push(
            new TextRun({
              text: `${newEntry.padStart(colSpacing[entryIndex], ' ')}`,
            })
          );
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

  let eigenText = new TextRun({
    text: eigenVal[1].toString().substring(0, 18).padStart(18, ' '),
    bold: true,
  });
  let eigenArray = [eigenText];
  eigenVal.forEach((item, index) => {
    if (index > 1) {
      item = item.toFixed(4);
      eigenArray.push(
        new TextRun({
          text: `${item.toString().padStart(8, ' ')}`,
        })
      );
    }
  });
  matrix.push(
    new Paragraph({
      style: 'dist4',
      children: [...eigenArray],
      spacing: {
        before: 250,
      },
    })
  );

  let expVarText = new TextRun({
    text: `       % exp. var.`,
    bold: true,
  });
  let expArray = [expVarText];
  expVar.forEach((item, index) => {
    if (index > 1) {
      expArray.push(
        new TextRun({
          text: `${item.toString().padStart(8, ' ')}`,
        })
      );
    }
  });
  matrix.push(
    new Paragraph({
      style: 'dist4',
      children: [...expArray],
    })
  );

  return matrix;
};

export default generateUnrotFacMatrix;
