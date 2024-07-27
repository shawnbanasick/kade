import {
  TextRun,
  Paragraph,
  HeadingLevel,
  AlignmentType,
  InternalHyperlink,
  ShadingType,
} from 'docx';

const generateDescendingDiff = (data, useHyperlinks, useZebra) => {
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

  // BEGIN TABLE
  data.forEach((item, index) => {
    let isBold = false;
    if (index === 0) {
      isBold = true;
      item[0] = 'Nm';
      item[4] = 'Diff';
    }

    let tempRow;
    if (index > 0 && index % 2 === 0 && useZebra === true) {
      tempRow = [
        new TextRun({
          text: item[0].toString().padStart(4, ' '),
          bold: isBold,
          shading: {
            type: ShadingType.SOLID,
            color: 'E2E2E2',
          },
        }),

        // STATEMENT
        new TextRun({
          text: item[1].toString().substring(0, 45).padStart(46, ' '),
          bold: isBold,
          shading: {
            type: ShadingType.SOLID,
            color: 'E2E2E2',
          },
        }),

        // First FACTOR
        new TextRun({
          text: item[2].toString().padStart(9, ' '),
          bold: isBold,
          shading: {
            type: ShadingType.SOLID,
            color: 'E2E2E2',
          },
        }),

        // Second FACTOR
        new TextRun({
          text: item[3].toString().padStart(8, ' '),
          bold: isBold,
          shading: {
            type: ShadingType.SOLID,
            color: 'E2E2E2',
          },
        }),

        // DIFF
        new TextRun({
          text: item[4].toString().padStart(8, ' '),
          bold: isBold,
          shading: {
            type: ShadingType.SOLID,
            color: 'E2E2E2',
          },
        }),
      ];
    } else {
      tempRow = [
        new TextRun({
          text: item[0].toString().padStart(4, ' '),
          bold: isBold,
        }),

        // STATEMENT
        new TextRun({
          text: item[1].toString().substring(0, 45).padStart(46, ' '),
          bold: isBold,
        }),

        // First FACTOR
        new TextRun({
          text: item[2].toString().padStart(9, ' '),
          bold: isBold,
        }),

        // Second FACTOR
        new TextRun({
          text: item[3].toString().padStart(8, ' '),
          bold: isBold,
        }),

        // DIFF
        new TextRun({
          text: item[4].toString().padStart(8, ' '),
          bold: isBold,
        }),
      ];
    }
    matrix.push(
      new Paragraph({
        children: tempRow,
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

export default generateDescendingDiff;
