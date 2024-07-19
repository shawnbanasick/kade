import { TextRun, Paragraph, HeadingLevel, AlignmentType, InternalHyperlink } from 'docx';

const generateStatements = (statements, useHyperlinks) => {
  let spacingAfter = 250;
  if (useHyperlinks === true) {
    spacingAfter = 0;
  }

  let statementsText = statements[2][1];

  let statementsList = [
    new Paragraph({
      children: [
        new TextRun({
          text: statementsText,
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
    statementsList.push(
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

  for (let i = 3; i < statements.length; i++) {
    let text;
    let tempText = statements[i][1];
    if (tempText !== '') {
      text = new Paragraph({
        text: statements[i][1].trim(),
        numbering: {
          reference: 'my-number-numbering-reference',
          level: 0,
        },
      });
      statementsList.push(text);
    }
  }
  return statementsList;
};

export default generateStatements;
