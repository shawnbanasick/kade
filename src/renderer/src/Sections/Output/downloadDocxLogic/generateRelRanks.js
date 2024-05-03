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
  InternalHyperlink
} from "docx";

const generateRelRanks = (data, useHyperlinks) => {
  data.shift();
  data.shift();
  let pageHeader = data.shift();
  data.shift();

  let spacingAfter = 250;
  if (useHyperlinks === true) {
    spacingAfter = 0;
  }

  // process and CHUNK data
  let array1 = [];
  let tempArray = [];
  let maxLen = data.length - 1;
  data.forEach((item, index) => {
    if (item[0] === "" && item[1] === "") {
      array1.push(tempArray);
      tempArray = [];
    } else {
      tempArray.push(item);
    }

    if (index === maxLen) {
      array1.push(tempArray);
    }
  });

  let highestArray = [...array1[0]];

  let matrix = [
    new Paragraph({
      children: [
        new TextRun({
          text: pageHeader[1],
          bold: true
        })
      ],
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
      pageBreakBefore: true,
      spacing: {
        after: spacingAfter
      }
    })
  ];

  if (useHyperlinks === true) {
    matrix.push(
      new Paragraph({
        children: [
          new InternalHyperlink({
            children: [
              new TextRun({
                text: "Return to TOC",
                style: "Hyperlink"
              })
            ],
            anchor: "anchorForTableOfContents"
          })
        ],
        alignment: AlignmentType.RIGHT,
        spacing: {
          after: 200
        }
      })
    );
  }

  let columnWidthArray = [
    188,
    1080,
    278,
    278,
    278,
    278,
    278,
    278,
    278,
    278,
    278
  ];

  // trim array
  const arrayLength = highestArray[1].length;
  columnWidthArray.length = arrayLength;

  array1.forEach((array, arrayIndex) => {
    // ROW ITERATION
    let rowItemsArray = [];
    array.forEach((row, rowIndex) => {
      let corrlsRowArray = [];
      let isHeader = false;
      let isBold = false;
      let position;
      let beforeSpacing = 0;
      let afterSpacing = 0;
      let columnSpanNum = 1;

      let dynamicParagraphStyle = "tableStyle2";
      if (data[0].length > 13) {
        dynamicParagraphStyle = "tableStyle8";
      }

      if (rowIndex === 0 || rowIndex === 1) {
        isBold = true;
        isHeader = true;
      } else {
        isBold = false;
      }

      if (rowIndex === 0) {
        row = row.filter(function (e) {
          return e;
        });
        // row.push("", "", "", "", "");
        beforeSpacing = 150;
        afterSpacing = 150;
      }

      // DYNAMIC ROW ITEMS
      row.forEach((entry, entryIndex) => {
        if (entryIndex === 1 && rowIndex !== 1) {
          position = AlignmentType.START;
        } else {
          position = AlignmentType.CENTER;
        }
        if (rowIndex === 0 && entryIndex === 0) {
          position = AlignmentType.CENTER;
          columnSpanNum = arrayLength;
        }
        corrlsRowArray.push(
          new TableCell({
            children: [
              new Paragraph({
                style: dynamicParagraphStyle,
                alignment: position,
                children: [
                  new TextRun({
                    text: entry.toString(),
                    bold: isBold
                  })
                ],
                spacing: {
                  before: beforeSpacing,
                  after: afterSpacing
                }
              })
            ],
            verticalAlign: VerticalAlign.CENTER,
            columnSpan: columnSpanNum
          })
        ); // end corrlsRowArray push
      });

      rowItemsArray.push(
        new TableRow({
          children: corrlsRowArray,
          tableHeader: isHeader,
          cantSplit: true
        })
      );
    }); // end correlations table for each

    let correlsTable = new Table({
      width: {
        size: 9800, // tableWidth,
        type: WidthType.DXA
      },
      indent: {
        size: 0,
        type: WidthType.DXA
      },
      columnWidths: columnWidthArray,
      rows: [...rowItemsArray] // end of rows array
    });

    matrix.push(correlsTable);
    matrix.push(
      new Paragraph({
        style: "bodyStyle1",
        children: [
          new TextRun({
            text: " ",
            bold: false
          })
        ]
      })
    );
  });

  return matrix;
};

export default generateRelRanks;
