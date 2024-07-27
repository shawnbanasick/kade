import {
  TextRun,
  Paragraph,
  HeadingLevel,
  AlignmentType,
  InternalHyperlink,
  ShadingType,
} from 'docx';

const generateFacCorr = (corlData, useHyperlinks, useZebra) => {
  corlData.shift();
  corlData.shift();
  let headerText = corlData.shift();
  corlData.shift();

  let factorList = [...corlData[0]];
  factorList.shift();

  let headerLine = ' '.padEnd(11, ' ');
  // const matrixSize = corlData.length - 5;

  let spacingAfter = 250;
  if (useHyperlinks === true) {
    spacingAfter = 0;
  }

  // create HEADER LINE
  for (let i = 0; i < factorList.length; i++) {
    let partNum = `F${factorList[i].toString().slice(-3).trim()}`;
    let stringPartNum = partNum.padStart(8, ' ');
    headerLine = headerLine + stringPartNum;
  }

  // Create page information
  let corrlsList = [
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
    corrlsList.push(
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
          after: spacingAfter,
        },
      })
    );
  }

  corrlsList.push(
    new Paragraph({
      style: 'bodyStyle1',
      children: [
        new TextRun({
          text: headerLine,
        }),
      ],
    })
  );

  corlData.forEach((item, index) => {
    const childrenLines = [];
    // skip front information
    if (index > 0) {
      item.forEach((entry, entryIndex) => {
        if (entryIndex === 0) {
          childrenLines.push(
            new TextRun({
              text: `${index}. ${entry.replace('  ', ' ').padEnd(10, ' ')}`,
            })
          );
        } else {
          if (index > 0 && index % 2 !== 0 && useZebra === true) {
            childrenLines.push(
              new TextRun({
                text: entry.toString().padStart(8, ' '),
                shading: {
                  type: ShadingType.SOLID,
                  color: 'E2E2E2',
                },
              })
            );
          } else {
            childrenLines.push(new TextRun({ text: entry.toString().padStart(8, ' ') }));
          }
        }
      });

      corrlsList.push(
        new Paragraph({
          style: 'bodyStyle1',
          children: [...childrenLines],
        })
      );
    }
  });

  return corrlsList;
};

export default generateFacCorr;
