import {
  TextRun,
  Paragraph,
  HeadingLevel,
  ShadingType,
  AlignmentType,
  InternalHyperlink
} from "docx";

const generateLoadingsTable = (
  matrixData,
  useHyperlinks,
  useZebra,
  translatedTextObj
) => {
  matrixData.shift();
  matrixData.shift();
  let headerText = matrixData.shift();
  matrixData.shift();

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
        after: 0
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

  matrix.push(
    new Paragraph({
      style: "bodyStyle1",
      children: [
        new TextRun({
          text: translatedTextObj["flaggedFactorLoadingsText"],
          bold: true
        })
      ]
    })
  );

  let colSpace = [3, 9, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8];

  matrixData.forEach((item, index) => {
    const childrenLines = [];
    // HEADER
    if (index === 0) {
      // push header 1
      childrenLines.push(
        new TextRun({
          text: item[0]
            .toString()
            .substring(0, 3)
            .trim(),
          bold: true
        }),
        new TextRun({
          text: item[1].toString().padStart(10, " "),
          bold: true
        })
      );
      item.forEach((entry, entryIndex) => {
        if (entryIndex > 1) {
          if (entryIndex === 2) {
            // if is "Factor Group"
            childrenLines.push(
              new TextRun({
                text: `FG`.padStart(5, " "),
                bold: true
              })
            );
          } else if (entryIndex % 2 !== 0) {
            // skip unneeded entries
          } else if (entry !== "") {
            // push headers all
            let facNumber = entry
              .toString()
              .slice(-3)
              .trim();
            childrenLines.push(
              new TextRun({
                text: `${facNumber}`.padStart(8, " "),
                bold: true
              })
            );
          }
        } // end of entryIndex > 1
      });
    } else {
      // DATA ROW VALUES
      item.forEach((entry, entryIndex) => {
        if (entryIndex === 1) {
          entry = entry.slice(0, 8);
        }
        let newEntry;

        if (entryIndex < 3) {
          if (index > 0 && index % 2 === 0 && useZebra === true) {
            childrenLines.push(
              new TextRun({
                text: `${entry
                  .toString()
                  .substring(0, colSpace[entryIndex] - 1)
                  .trim()
                  .padStart(colSpace[entryIndex], " ")}`,
                shading: {
                  type: ShadingType.SOLID,
                  color: "E2E2E2"
                }
              })
            );
          } else {
            childrenLines.push(
              new TextRun({
                text: `${entry
                  .toString()
                  .substring(0, colSpace[entryIndex] - 1)
                  .trim()
                  .padStart(colSpace[entryIndex], " ")}`
              })
            );
          }
        } else {
          let highlight = false;
          if (
            isNaN(item[entryIndex + 1]) &&
            item[entryIndex + 1] !== undefined
          ) {
            highlight = true;
          }
          // push numeric values
          if (isNaN(entry) || entry === "") {
            // catch multilingual error
          } else {
            let entryString = entry.toString();
            if (+entry < 0 && entryString.length < 7) {
              newEntry = entryString + "0";
            } else if (+entry > 0 && entryString.length < 6) {
              newEntry = entryString + "0";
            } else {
              newEntry = entryString;
            }

            if (highlight) {
              childrenLines.push(
                new TextRun({
                  text: `${newEntry.padStart(8, " ")}`,
                  bold: true,
                  shading: {
                    type: ShadingType.SOLID,
                    color: "ffdc9d"
                  }
                })
              ); // end push
            } else {
              if (index > 0 && index % 2 === 0 && useZebra === true) {
                childrenLines.push(
                  new TextRun({
                    text: `${newEntry.padStart(8, " ")}`,
                    shading: {
                      type: ShadingType.SOLID,
                      color: "E2E2E2"
                    }
                  })
                ); // end push
              } else {
                childrenLines.push(
                  new TextRun({
                    text: `${newEntry.padStart(8, " ")}`
                  })
                ); // end push
              }
            }
          }
        }
      });
    }

    matrix.push(
      new Paragraph({
        style: "ptQsorts",
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

export default generateLoadingsTable;
