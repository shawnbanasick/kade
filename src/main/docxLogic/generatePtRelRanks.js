import {
  TextRun,
  Paragraph,
  HeadingLevel,
  AlignmentType,
  InternalHyperlink,
  ShadingType,
} from 'docx';

const generateRelRanks = (data, useHyperlinks, useZebra) => {
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
    if (item[0] === '' && item[1] === '') {
      array1.push(tempArray);
      tempArray = [];
    } else {
      tempArray.push(item);
    }

    if (index === maxLen) {
      array1.push(tempArray);
    }
  });

  let matrix = [
    new Paragraph({
      children: [
        new TextRun({
          text: pageHeader[1],
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

  //
  // BEGIN TABLE
  //
  let colSpace = [4, 34, 4, 4, 4, 4, 4, 4, 4, 4, 4];
  array1.forEach((array, arrayIndex) => {
    // iterate four tables
    // ROW ITERATION
    array.forEach((row, rowIndex) => {
      // iterate table rows
      let corrlsRowArray = [];
      let isBold = false;

      if (rowIndex === 0 || rowIndex === 1) {
        isBold = true;
      } else {
        isBold = false;
      }

      if (rowIndex === 0) {
        row = row.filter(function (e) {
          return e;
        });
      }
      // DYNAMIC ROW ITEMS
      row.forEach((entry, entryIndex) => {
        // iterate row items
        if (rowIndex === 0) {
          entry = entry.toString().trim().replace('  ', ' ');
        } else if (rowIndex === 1) {
          if (entryIndex === 2 || entryIndex > 3) {
            entry = `F${entry.slice(-2).trim()}`.padStart(4, ' ');
          } else if (entryIndex === 3) {
            entry = ` C/D`;
          } else {
            entry = entry
              .toString()
              .trim()
              .substring(0, colSpace[entryIndex] - 1)
              .padStart(colSpace[entryIndex], ' ');
          }
        } else {
          entry = entry
            .toString()
            .trim()
            .substring(0, colSpace[entryIndex] - 1)
            .padStart(colSpace[entryIndex], ' ');
        }

        if (rowIndex > 1 && rowIndex % 2 !== 0 && useZebra === true) {
          corrlsRowArray.push(
            new TextRun({
              text: entry,
              bold: isBold,
              shading: {
                type: ShadingType.SOLID,
                color: 'E2E2E2',
              },
            })
          ); // end corrlsRowArray push
        } else {
          corrlsRowArray.push(
            new TextRun({
              text: entry,
              bold: isBold,
            })
          ); // end corrlsRowArray push
        }
      });

      matrix.push(
        new Paragraph({
          style: 'bodyStyle1',
          children: corrlsRowArray,
          spacing: {
            before: 0,
            after: 0,
          },
        })
      );
    }); // end correlations table for each

    matrix.push(
      new Paragraph({
        style: 'bodyStyle1',
        children: [
          new TextRun({
            text: ' ',
            bold: false,
          }),
        ],
        spacing: {
          before: 0,
          after: 0,
        },
      })
    );
  });
  return matrix;
};

export default generateRelRanks;
