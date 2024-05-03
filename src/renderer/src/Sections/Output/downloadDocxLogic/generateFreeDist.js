import {
  TextRun,
  Paragraph,
  HeadingLevel,
  AlignmentType,
  InternalHyperlink,
  ShadingType
} from "docx";

const generateFreeDist = (matrixData, useHyperlinks, useZebra) => {
  matrixData.shift();
  matrixData.shift();
  let headerText = matrixData.shift();
  matrixData.shift();

  let spacingAfter = 250;
  if (useHyperlinks === true) {
    spacingAfter = 0;
  }

  let matrix = [
    new Paragraph({
      children: [
        new TextRun({
          text: headerText[0],
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

  matrixData.forEach((item, index) => {
    const childrenLines = [];

    // skip front information
    let paddingArray = [13, 15, 10];
    let rowPaddingArray = [3, 21, 7, 10];
    if (index === 0) {
      // HEADER - first line
      item.shift();
      item.forEach((entry, entryIndex) => {
        // push headers all
        childrenLines.push(
          new TextRun({
            text: entry.padStart(paddingArray[entryIndex], " "),
            bold: true
          })
        );
      });
    } else {
      // ROWS
      item.forEach((entry, entryIndex) => {
        if (entry === "") {
          // no error
        } else if (entryIndex === 0) {
          // push participant number

          if (index % 2 !== 0 && useZebra === true) {
            childrenLines.push(
              // first col - Q sort number
              new TextRun({
                text: `${entry.toString().padStart(3, " ")} `,
                shading: {
                  type: ShadingType.SOLID,
                  color: "E2E2E2"
                }
              })
            );
          } else {
            childrenLines.push(
              // first col - Q sort number
              new TextRun({
                text: `${entry.toString().padStart(3, " ")} `
              })
            );
          }
        } else {
          if (index % 2 !== 0 && useZebra === true) {
            // other entries - Name, Mean or St Dev
            childrenLines.push(
              new TextRun({
                text: entry
                  .toString()
                  .substring(0, 14)
                  .padEnd(rowPaddingArray[entryIndex], " "),
                shading: {
                  type: ShadingType.SOLID,
                  color: "E2E2E2"
                }
              })
            ); // end push
          } else {
            // other entries - Name, Mean or St Dev
            childrenLines.push(
              new TextRun({
                text: entry
                  .toString()
                  .substring(0, 14)
                  .padEnd(rowPaddingArray[entryIndex], " ")
              })
            ); // end push
          }
        }
      });
    }
    matrix.push(
      new Paragraph({
        style: "bodyStyle1",
        children: [...childrenLines],
        spacing: {
          before: 0,
          after: 0
        }
      })
    );
  });

  return matrix;
};

export default generateFreeDist;
