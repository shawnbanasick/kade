import {
  TextRun,
  Paragraph,
  HeadingLevel,
  AlignmentType,
  InternalHyperlink,
  ShadingType
} from "docx";
import chunk from "lodash/chunk";

const generatePtFactorScores = (
  matrixData,
  matrixData2,
  matrixData3,
  useHyperlinks,
  useZebra,
  translatedTextObj
) => {
  try {
    matrixData3.shift();
    matrixData3.shift();
    let headerRow = matrixData3.shift();
    matrixData3.shift();
    matrixData2 = matrixData2.slice(4);
    let newMatrixData = matrixData.slice(4);

    let spacingAfter = 250;
    if (useHyperlinks === true) {
      spacingAfter = 0;
    }

    // chunk MATRIX 2
    let chunkedMatrix = [];
    // let namesArray = [...matrixData2[0]];
    matrixData2.forEach(item => {
      let temp1 = chunk(item, 12);
      chunkedMatrix.push(temp1);
    });

    let chunkedMatrix3 = [];
    //  let namesArray3 = [...matrixData3[0]];
    matrixData3.forEach(item => {
      let temp1 = chunk(item, 12);
      chunkedMatrix3.push(temp1);
    });

    let headerText = headerRow[1];
    headerText = headerText.replace(/  +/g, " ");

    // PAGE Header Text
    let matrix = [
      new Paragraph({
        children: [
          new TextRun({
            text: `${headerText}`,
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

    /*
     *
     *  RELATIVE WEIGHTS
     *
     */
    // RELATIVE WEIGHTS TABLE HEADER
    matrix.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${translatedTextObj["contributingText"]} - ${translatedTextObj["relativeWeightsText"]}`,
            bold: true
          })
        ],
        style: "bodyStyle1"
      })
    );

    let maxNameLen = 0;
    newMatrixData.forEach((item, index) => {
      if (index > 0) {
        let nameLen = item[1].length;
        if (nameLen > maxNameLen) {
          maxNameLen = nameLen;
        }
      }
    });

    // WEIGHTS TABLE
    let qsNamesArray = [];
    let rowArray = [];
    for (let i = 0; i < newMatrixData.length; i++) {
      let index = i;
      let item = newMatrixData[i];
      let value;
      if (index > 0) {
        value = item[2].toFixed(2).toString();
      } else {
        value = item[2].toString();
      }

      let name = item[1]
        .toString()
        .substring(0, maxNameLen + 7)
        .trim()
        .padStart(maxNameLen + 5, " ");

      if (index > 0) {
        name = item[1]
          .toString()
          .substring(0, maxNameLen)
          .trim()
          .padStart(maxNameLen + 3, " ");
        let qsName = `QS${item[0]}`.padEnd(5, " ");
        name = qsName + name;
        qsNamesArray.push(`QS${item[0]}`);
      }

      if (index === 0) {
        let name1 = item[0].toString().padStart(4, " ");
        let name2 = item[1].padStart(maxNameLen + 4, " ");
        name = name1 + name2;
      }

      // relative weights rows
      let tempRow;
      if (index % 2 !== 0 && useZebra === true) {
        tempRow = new Paragraph({
          style: "bodyStyle1",
          children: [
            new TextRun({
              text: name,
              shading: {
                type: ShadingType.SOLID,
                color: "E2E2E2"
              }
            }),
            new TextRun({
              text: value.trim().padStart(8, " "),
              shading: {
                type: ShadingType.SOLID,
                color: "E2E2E2"
              }
            })
          ],
          spacing: {
            before: 0,
            line: 260,
            after: 0
          }
        });
      } else {
        tempRow = new Paragraph({
          style: "bodyStyle1",
          children: [
            new TextRun({
              text: name
            }),
            new TextRun({
              text: value.trim().padStart(8, " ")
            })
          ],
          spacing: {
            before: 0,
            line: 260,
            after: 0
          }
        });
      }
      rowArray.push(tempRow);
    }

    matrix.push(...rowArray);
    let corNamesArray = [...qsNamesArray];

    /*
     **
     **
     ** CONTRIBUTOR CORRELATIONS TABLES BEGIN
     **
     **
     */

    // CORRELATIONS TABLES
    let titleText;
    for (let i = 0; i < chunkedMatrix[0].length; i++) {
      if (i === 0) {
        titleText = `${translatedTextObj["contributingText"]} - ${translatedTextObj["correlationMatrixTxt"]}`;
      } else {
        titleText = `${translatedTextObj["contributingText"]} - ${translatedTextObj["correlationMatrixTxt"]} (${translatedTextObj["contTxt"]})`;
      }

      matrix.push(
        new Paragraph({
          children: [
            new TextRun({
              text: titleText,
              bold: true
            })
          ],
          style: "bodyStyle1",
          spacing: {
            before: 300,
            line: 260,
            after: 0
          }
        })
      );

      // CORRELATION TABLE
      let rowItemsArray = [];
      for (let index = 0; index < chunkedMatrix.length; index++) {
        let item = chunkedMatrix[index];
        let corrlsRowArray = [];
        let isBold = false;
        // let location = AlignmentType.CENTER;

        if (index === 0) {
          isBold = false;
        }

        //
        // SECOND CHUNK
        //
        if (i > 0) {
          // corNamesArray = corNamesArray.slice(11);

          let textVal1 = `${qsNamesArray[index - 1]}`;
          if (index === 0) {
            textVal1 = " ".padStart(6, " ");
          }

          if (index % 2 !== 0 && useZebra === true) {
            // first column
            corrlsRowArray.push(
              new TextRun({
                text: textVal1
                  .toString()
                  .substring(0, 5)
                  .trim()
                  .padStart(6, " "),
                shading: {
                  type: ShadingType.SOLID,
                  color: "E2E2E2"
                }
              })
            ); // end corrlsRowArray push
          } else {
            // first column
            corrlsRowArray.push(
              new TextRun({
                text: textVal1
                  .toString()
                  .substring(0, 5)
                  .trim()
                  .padStart(6, " ")
              })
            ); // end corrlsRowArray push
          }

          let corrNameChunkArray = [0, 11, 23, 35, 47, 59, 71];
          // all column row iterations
          for (let entryIndex = 0; entryIndex < item[i].length; entryIndex++) {
            let entry = item[i][entryIndex];

            if (index === 0) {
              entry = corNamesArray[corrNameChunkArray[i] + entryIndex];
            }

            let paddingValue = 5;
            if (index > 0 && +entry === 100) {
              isBold = true;
            } else {
              isBold = false;
            }
            if (index % 2 !== 0 && useZebra === true) {
              corrlsRowArray.push(
                new TextRun({
                  text: entry
                    .toString()
                    .substring(0, paddingValue)
                    .trim()
                    .padStart(paddingValue, " "),
                  shading: {
                    type: ShadingType.SOLID,
                    color: "E2E2E2"
                  },
                  bold: isBold
                })
              ); // end corrlsRowArray push
            } else {
              if (entry !== undefined) {
                corrlsRowArray.push(
                  new TextRun({
                    text: entry
                      .toString()
                      .substring(0, paddingValue)
                      .trim()
                      .padStart(paddingValue, " "),
                    bold: isBold
                  })
                ); // end corrlsRowArray push
              }
            }
          }
        } else {
          //
          // FIRST CHUNK
          //
          // row iterations
          // item[i].forEach((entry, entryIndex) => {
          for (let entryIndex = 0; entryIndex < item[i].length; entryIndex++) {
            let entry = item[i][entryIndex];
            let paddingValue = 5;
            if (+entry === 100) {
              isBold = true;
            } else {
              isBold = false;
            }

            if (index === 0) {
              entry = `${qsNamesArray[index - 1]}`;
              if (entryIndex === 0) {
                entry = ``.padStart(4, " ");
              }
              if (entryIndex > 0) {
                entry = `${qsNamesArray[entryIndex - 1]}`;
              }
            }

            if (entryIndex > 0) {
              paddingValue = 5;
            }

            // first column
            if (entryIndex === 0) {
              if (index > 0) {
                entry = `${qsNamesArray[index - 1]}`;
              }
              if (index % 2 !== 0 && useZebra === true) {
                corrlsRowArray.push(
                  new TextRun({
                    text: entry
                      .toString()
                      .substring(0, paddingValue)
                      .trim()
                      .padStart(paddingValue, " "),
                    shading: {
                      type: ShadingType.SOLID,
                      color: "E2E2E2"
                    }
                  })
                ); // end corrlsRowArray push
              } else {
                corrlsRowArray.push(
                  new TextRun({
                    text: entry
                      .toString()
                      .substring(0, paddingValue)
                      .trim()
                      .padStart(paddingValue, " ")
                  })
                ); // end corrlsRowArray push
              }
            }

            // other columns
            if (entryIndex > 0) {
              if (index % 2 !== 0 && useZebra === true) {
                corrlsRowArray.push(
                  new TextRun({
                    text: entry
                      .toString()
                      .substring(0, paddingValue)
                      .trim()
                      .padStart(paddingValue, " "),
                    bold: isBold,
                    shading: {
                      type: ShadingType.SOLID,
                      color: "E2E2E2"
                    }
                  })
                ); // end corrlsRowArray push
              } else {
                corrlsRowArray.push(
                  new TextRun({
                    text: entry
                      .toString()
                      .substring(0, paddingValue)
                      .trim()
                      .padStart(paddingValue, " "),
                    bold: isBold
                  })
                ); // end corrlsRowArray push
              }
            }
          }
        }
        rowItemsArray.push(
          new Paragraph({
            children: corrlsRowArray,
            style: "bodyStyle1",
            spacing: {
              before: 0,
              line: 260,
              after: 0
            }
          })
        );
      } // end correlations table for each

      matrix.push(...rowItemsArray);
    } // end correlations chunkedMatrix loop

    /*
     **
     **
     ** FACTOR TABLES BEGIN
     **
     **
     */
    let titleText2;
    for (let i = 0; i < chunkedMatrix3[0].length; i++) {
      if (i === 0) {
        titleText2 = `${translatedTextObj["factorZScoresTxt"]}`;
      } else {
        titleText2 = `${translatedTextObj["factorZScoresTxt"]} - (${translatedTextObj["contTxt"]})`;
      }

      matrix.push(
        new Paragraph({
          children: [
            new TextRun({
              text: titleText2,
              bold: true
            })
          ],
          style: "bodyStyle1",
          spacing: {
            before: 500
          }
        })
      );

      // FACTORS TABLE
      let rowItemsArray = [];
      let substringArray = [3, 20, 6, 3, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
      for (let r = 0; r < chunkedMatrix3.length; r++) {
        let item = chunkedMatrix3[r];
        let index = r;

        let corrlsRowArray = [];
        let isBold = false;
        if (index === 0) {
          isBold = false;
        }
        // for names chunking
        let headerNames = [...qsNamesArray];
        let qsNamesArray2;

        // OVERFLOW TABLE
        if (i > 0) {
          substringArray = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
          // setup names array chunking
          let nameChunkArray = [0, 8, 20, 32, 44, 56, 68, 80, 92];
          let newText = item[0][0].toString().padStart(2, " ");
          if (index === 0) {
            if (i === 0) {
              qsNamesArray2 = [...headerNames.slice(nameChunkArray[i])];
            } else {
              qsNamesArray2 = [...headerNames.slice(nameChunkArray[i])];
            }
            newText = newText.replace("Statement Number", "Nm");
          }

          if (index % 2 !== 0 && useZebra === true) {
            // newText = "Statement Number", "Nm"
            // item[0][1] = participant names
            // with color
            corrlsRowArray.push(
              new TextRun({
                text: newText,
                bold: isBold,
                shading: {
                  type: ShadingType.SOLID,
                  color: "E2E2E2"
                }
              }),
              new TextRun({
                text: item[0][1]
                  .toString()
                  .substring(0, 15)
                  .trim()
                  .padStart(16, " "),
                bold: isBold,
                shading: {
                  type: ShadingType.SOLID,
                  color: "E2E2E2"
                }
              })
            );
          } else {
            // newText = "Statement Number", "Nm"
            // item[0][1] = participant names
            // no color
            corrlsRowArray.push(
              new TextRun({
                text: newText,
                bold: isBold
              }),
              new TextRun({
                text: item[0][1]
                  .toString()
                  .substring(0, 15)
                  .trim()
                  .padStart(16, " "),
                bold: isBold
              })
            ); // end corrlsRowArray
          }

          // rest of row items
          for (let s = 0; s < item[i].length; s++) {
            let entry = item[i][s];
            let entryIndex = s;

            // if very first iteration -> headers
            if (index === 0) {
              entry = entry
                .replace("Raw Sort ", "")
                .replace("Statement Number", "Nm")
                .replace("Q Sort Value", "QSV")
                .replace("Z-score", "Zscr");
            }

            if (index === 0) {
              entry = `${qsNamesArray2[entryIndex]}`;
            }

            if (index % 2 !== 0 && useZebra === true) {
              corrlsRowArray.push(
                new TextRun({
                  text: entry
                    .toString()
                    .trim()
                    .substring(0, substringArray[entryIndex])
                    .padStart(substringArray[entryIndex] + 1, " "),
                  bold: isBold,
                  shading: {
                    type: ShadingType.SOLID,
                    color: "E2E2E2"
                  }
                })
              ); // end corrlsRowArray push
            } else {
              corrlsRowArray.push(
                new TextRun({
                  text: entry
                    .toString()
                    .trim()
                    .substring(0, substringArray[entryIndex])
                    .padStart(substringArray[entryIndex] + 1, " "),
                  bold: isBold
                })
              ); // end corrlsRowArray push
            }
          } // end overflow table for each
        } else {
          // not overflow table
          // first iteration items
          for (let t = 0; t < item[i].length; t++) {
            let entry = item[i][t];
            let entryIndex = t;

            if (index === 0) {
              entry = entry
                .replace("Raw Sort ", "")
                .replace("Statement Number", "Nm")
                .replace("Q Sort Value", "QSV")
                .replace("Z-score", "Zscr");
            }

            if (entryIndex > 3 && index === 0) {
              entry = `${qsNamesArray[entryIndex - 4]}`;
            }

            if (index % 2 !== 0 && useZebra === true) {
              corrlsRowArray.push(
                new TextRun({
                  text: entry
                    .toString()
                    .trim()
                    .substring(0, substringArray[entryIndex])
                    .padStart(substringArray[entryIndex] + 1, " "),
                  bold: isBold,
                  shading: {
                    type: ShadingType.SOLID,
                    color: "E2E2E2"
                  }
                })
              ); // end corrlsRowArray push
            } else {
              corrlsRowArray.push(
                new TextRun({
                  text: entry
                    .toString()
                    .trim()
                    .substring(0, substringArray[entryIndex])
                    .padStart(substringArray[entryIndex] + 1, " "),
                  bold: isBold
                })
              ); // end corrlsRowArray push
            }
          }
        }

        rowItemsArray.push(
          new Paragraph({
            children: corrlsRowArray,
            style: "bodyStyle1",
            spacing: {
              before: 0,
              line: 260,
              after: 0
            }
          })
        );
      } // end correlations table for each

      matrix.push(...rowItemsArray);
    } // end correlations chunkedMatrix loop
    return matrix;
  } catch (error) {
    console.log(error);
    alert("Error generating factor scores");
  }
};

export default generatePtFactorScores;
