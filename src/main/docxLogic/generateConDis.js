import {
  TextRun,
  Paragraph,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  VerticalAlign,
  AlignmentType,
  convertInchesToTwip,
  InternalHyperlink,
} from 'docx';

const generateConDis = (data, useHyperlinks) => {
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

  let hyperlink = new Paragraph({
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

  if (useHyperlinks === true) {
    matrix.push(hyperlink);
  }

  let columnWidthArray = [260, 1700];

  // ROW ITERATIONS
  let rowArray = [];
  data.forEach((item, index) => {
    let isHeader = false;
    let location = VerticalAlign.START;
    let isBold = false;

    if (index === 0) {
      isHeader = true;
      location = VerticalAlign.CENTER;
      isBold = true;
    }

    let entryArray = [
      // STATEMENT NUMBER
      new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new Paragraph({
            style: 'tableStyle2',
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: item[0].toString(),
                bold: isBold,
              }),
            ],
          }),
        ],
        // reduce inside gap between cell contents and cell borders
        margins: {
          top: convertInchesToTwip(0.02),
          bottom: convertInchesToTwip(0.02),
          left: convertInchesToTwip(0.02),
          right: convertInchesToTwip(0.02),
        },
      }),
      // STATEMENT
      new TableCell({
        children: [
          new Paragraph({
            style: 'tableStyle2',
            alignment: location,
            children: [
              new TextRun({
                text: item[1].toString(),
                bold: isBold,
              }),
            ],
          }),
        ],
        verticalAlign: VerticalAlign.CENTER,
      }),
    ];

    item.forEach((entry, entryIndex) => {
      if (entryIndex > 1) {
        if (index === 2) {
          columnWidthArray.push(296);
        }

        entryArray.push(
          //FACTOR
          new TableCell({
            children: [
              new Paragraph({
                style: 'tableStyle2',
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: entry.toString(),
                    bold: isBold,
                  }),
                ],
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
          })
        ); // end push
      }
    });

    let tempRow = new TableRow({
      tableHeader: isHeader,
      cantSplit: true,
      children: [...entryArray], // end tableRow children
    }); // end tableRow
    rowArray.push(tempRow);
  }); // end for each

  // to adjust the width of the last column with Z-scores
  columnWidthArray.pop();
  columnWidthArray.push(380);

  // create TABLE
  const contributorsTable = new Table({
    width: {
      size: 9900,
      type: WidthType.DXA,
    },
    indent: {
      size: 0,
      type: WidthType.DXA,
    },
    columnWidths: [...columnWidthArray],
    rows: [...rowArray], // end of rows array
  });

  matrix.push(contributorsTable);

  return matrix;
};

export default generateConDis;
