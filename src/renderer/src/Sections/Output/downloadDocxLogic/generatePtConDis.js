import {
  TextRun,
  Paragraph,
  HeadingLevel,
  ShadingType,
  AlignmentType,
  InternalHyperlink,
} from 'docx';

const generateConDis = (data, useHyperlinks, useZebra) => {
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
  let numFactors = data[0].length - 3;
  const stateSpacingArray = [30, 30, 30, 30, 30, 30, 30, 30, 30];
  let spacingState = stateSpacingArray[numFactors];

  // ROW ITERATIONS
  data.forEach((item, index) => {
    let isBold = false;

    let statement = item[1];
    if (index === 0) {
      isBold = true;
      statement = `${statement}               `;
    }

    let entryArray;

    if (index > 0 && index % 2 === 0 && useZebra === true) {
      entryArray = [
        // STATEMENT NUMBER
        new TextRun({
          text: item[0].toString().padStart(3, ' '),
          bold: isBold,
          shading: {
            type: ShadingType.SOLID,
            color: 'E2E2E2',
          },
        }),

        // STATEMENT
        new TextRun({
          text: statement
            .toString()
            .substring(0, spacingState - 1)
            .padStart(spacingState, ' '),
          bold: isBold,
          shading: {
            type: ShadingType.SOLID,
            color: 'E2E2E2',
          },
        }),
      ];

      item.forEach((entry, entryIndex) => {
        let spacing = 7;
        entry = entry.toString().replace('Ranking', '');

        if (index === 0 && entryIndex < item.length - 1) {
          let frag = entry.slice(-3).trim();
          entry = `F${frag}`;
          spacing = 4;
        } else if (entryIndex < item.length - 1) {
          spacing = 4;
        }

        if (entryIndex > 1) {
          entryArray.push(
            new TextRun({
              text: entry.toString().padStart(spacing, ' '),
              bold: isBold,
              shading: {
                type: ShadingType.SOLID,
                color: 'E2E2E2',
              },
            })
          );
        }
      });
    } else {
      entryArray = [
        // STATEMENT NUMBER
        new TextRun({
          text: item[0].toString().padStart(3, ' '),
          bold: isBold,
        }),

        // STATEMENT
        new TextRun({
          text: statement
            .toString()
            .substring(0, spacingState - 1)
            .padStart(spacingState, ' '),
          bold: isBold,
        }),
      ];

      item.forEach((entry, entryIndex) => {
        let spacing = 7;
        entry = entry.toString().replace('Ranking var.', 'var');

        if (index === 0 && entryIndex < item.length - 1) {
          let frag = entry.slice(-3).trim();
          entry = `F${frag}`;
          spacing = 4;
        } else if (entryIndex < item.length - 1) {
          spacing = 4;
        }

        if (entryIndex > 1) {
          entryArray.push(
            new TextRun({
              text: entry.toString().padStart(spacing, ' '),
              bold: isBold,
            })
          );
        }
      });
    }

    matrix.push(
      new Paragraph({
        children: entryArray,
        style: 'bodyStyle1',
        spacing: {
          before: 0,
          line: 260,
          after: 0,
        },
      })
    );
  }); // end for each

  return matrix;
};

export default generateConDis;
