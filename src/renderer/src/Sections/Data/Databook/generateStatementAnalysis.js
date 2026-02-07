import { HeadingLevel, Paragraph, TextRun } from 'docx';
import { cloneDeep } from 'es-toolkit';
import { extractStatementAnalysisData } from './extractStatementAnalysisData';
import { calcStatementAnalysisStats } from './calcStatementAnalysisStats';

/**
 * Creates document header paragraph
 */
const createHeaderParagraph = (statementAnalysisLangObj) => {
  return new Paragraph({
    children: [
      new TextRun({
        text: statementAnalysisLangObj.statementStatistics,
        bold: true,
        size: 40,
      }),
    ],
    pageBreakBefore: true,
    heading: HeadingLevel.HEADING_1,
    thematicBreak: true,
  });
};

/**
 * Generates Word document paragraphs for participant Q-sort statements
 *
 * @param {Array} data - Array of participant data containing r20 sort values
 * @param {string} statements - Newline-separated string of statements
 * @param {Array} qSortHeaderNumbers - Array of Q-sort header numbers
 * @param {Object} statementAnalysisLangObj - Language object for labels
 * @returns {Array} Array of Paragraph objects for Word document
 */
const generateStatementAnalysis = (
  data,
  statementsArray,
  qSortHeaderNumbers,
  statementAnalysisLangObj
) => {
  try {
    // Parse statements
    // const statementsArray = statements
    //   .split('\n')
    //   .map((s) => s.trim())
    //   .filter(Boolean);

    // Create working copy of data
    const workingData = cloneDeep(data);
    let min = Infinity;
    let max = -Infinity;
    for (const str of qSortHeaderNumbers) {
      const num = Number(str);
      if (!isNaN(num) && isFinite(num)) {
        if (num < min) min = num;
        if (num > max) max = num;
      }
    }

    // Initialize result with header
    const allParagraphs = [createHeaderParagraph(statementAnalysisLangObj)];
    const statementSortValues = extractStatementAnalysisData([...workingData]);
    const stats = calcStatementAnalysisStats(statementSortValues, max, min);

    console.log('stats', JSON.stringify(stats, null, 2));

    const sortStatsByAveragePrep = [...stats];
    const sortStatsByAverage = sortStatsByAveragePrep.sort((a, b) => b.average - a.average);
    const sortStatsByStDvPrep = [...stats];
    const sortStatsByMaxPrep = [...stats];
    const sortStatsByMinPrep = [...stats];
    const sortStatsByStDv = sortStatsByStDvPrep.sort(
      (a, b) => a.standardDeviation - b.standardDeviation
    );
    const sortStatsByZeroPrep = [...stats];
    const sortStatsByZero = sortStatsByZeroPrep.sort((a, b) => b.zeroCount - a.zeroCount);
    const sortStatsByMax = sortStatsByMaxPrep.sort((a, b) => b.maxCount - a.maxCount);
    const sortStatsByMin = sortStatsByMinPrep.sort((a, b) => b.minCount - a.minCount);

    try {
      allParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${statementAnalysisLangObj.qSortValue} - ${statementAnalysisLangObj.highestToLowestAverage}`,
              bold: true,
              font: {
                name: 'Arial',
                hint: 'eastAsia',
                eastAsia: 'Microsoft YaHei',
              },
              size: 20,
            }),
          ],
          spacing: { before: 400 },
          heading: HeadingLevel.HEADING_2,
          //   indent: { left: 200 },
        })
      );

      sortStatsByAverage?.forEach((object, index) => {
        allParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${index + 1}.  s${String(object.order).padStart(
                  2,
                  '0'
                )}   (${object.average.toFixed(2)}):  ${statementsArray[object.order - 1]}`,
                bold: false,
                font: {
                  name: 'Arial',
                  hint: 'eastAsia',
                  eastAsia: 'Microsoft YaHei',
                },
                size: 20,
              }),
            ],
            spacing: { before: 0 },
            indent: { left: 1800, hanging: 1600 },
          })
        );
      });

      allParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${statementAnalysisLangObj.qSortValueStability}`,
              bold: true,
              font: {
                name: 'Arial',
                hint: 'eastAsia',
                eastAsia: 'Microsoft YaHei',
              },
              size: 20,
            }),
          ],
          spacing: { before: 400 },
          heading: HeadingLevel.HEADING_2,
          //   indent: { left: 200 },
        })
      );

      sortStatsByStDv?.forEach((object, index) => {
        allParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${index + 1}. s${String(object.order).padStart(
                  2,
                  '0'
                )} (${object.standardDeviation.toFixed(2)}, ${object.average.toFixed(2)}): ${
                  statementsArray[object.order - 1]
                }`,
                bold: false,
                font: {
                  name: 'Arial',
                  hint: 'eastAsia',
                  eastAsia: 'Microsoft YaHei',
                },
                size: 20,
              }),
            ],
            spacing: { before: 0 },
            indent: { left: 2200, hanging: 2000 },
          })
        );
      });

      // MAX COUNT
      allParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${statementAnalysisLangObj.statementsWithAHighCountOfMax} "${max}" (${statementAnalysisLangObj.countPercent})`,
              bold: true,
              font: {
                name: 'Arial',
                hint: 'eastAsia',
                eastAsia: 'Microsoft YaHei',
              },
              size: 20,
            }),
          ],
          spacing: { before: 400 },
          heading: HeadingLevel.HEADING_2,
        })
      );

      let previousValueMax = '';
      let testValueMax = '';
      let objectMax;
      for (let i = 0; i < sortStatsByMax.length; i++) {
        objectMax = sortStatsByMax[i];
        testValueMax = (objectMax.maxCount / objectMax.count).toFixed(2);
        if (i > 9 && previousValueMax !== testValueMax) {
          break;
        }

        // skip cases when count is ZERO
        if (objectMax.maxCount > 0) {
          allParagraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${i + 1}. s${String(objectMax.order).padStart(2, '0')} (${
                    objectMax.maxCount
                  }, ${(objectMax.maxCount / objectMax.count).toFixed(2)}): ${
                    statementsArray[objectMax.order - 1]
                  }`,
                  bold: false,
                  font: {
                    name: 'Arial',
                    hint: 'eastAsia',
                    eastAsia: 'Microsoft YaHei',
                  },
                  size: 20,
                }),
              ],
              spacing: { before: 0 },
              indent: { left: 2000, hanging: 1800 },
            })
          );
        }
        previousValueMax = testValueMax;
      }

      // MIN COUNT
      allParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${statementAnalysisLangObj.statementsWithAHighCountOfMin} "${min}" (${statementAnalysisLangObj.countPercent})`,
              bold: true,
              font: {
                name: 'Arial',
                hint: 'eastAsia',
                eastAsia: 'Microsoft YaHei',
              },
              size: 20,
            }),
          ],
          spacing: { before: 400 },
          heading: HeadingLevel.HEADING_2,
        })
      );

      let previousValueMin = '';
      let testValueMin = '';
      let objectMin;
      for (let i = 0; i < sortStatsByMin.length; i++) {
        objectMin = sortStatsByMin[i];
        testValueMin = (objectMin.minCount / objectMin.count).toFixed(2);
        if (i > 9 && previousValueMin !== testValueMin) {
          break;
        }
        // skip cases when count is ZERO
        if (objectMin.minCount > 0) {
          allParagraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${i + 1}. s${String(objectMin.order).padStart(2, '0')} (${
                    objectMin.minCount
                  }, ${(objectMin.minCount / objectMin.count).toFixed(2)}): ${
                    statementsArray[objectMin.order - 1]
                  }`,
                  bold: false,
                  font: {
                    name: 'Arial',
                    hint: 'eastAsia',
                    eastAsia: 'Microsoft YaHei',
                  },
                  size: 20,
                }),
              ],
              spacing: { before: 0 },
              indent: { left: 2000, hanging: 1800 },
            })
          );
        }
        previousValueMin = testValueMin;
      }

      // ZERO COUNT
      if (+sortStatsByZero[0].zeroCount > 0) {
        allParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${statementAnalysisLangObj.statementsWithAHighCountOfZero} (${statementAnalysisLangObj.countPercent})`,
                bold: true,
                font: {
                  name: 'Arial',
                  hint: 'eastAsia',
                  eastAsia: 'Microsoft YaHei',
                },
                size: 20,
              }),
            ],
            spacing: { before: 400 },
            heading: HeadingLevel.HEADING_2,
          })
        );

        let previousValue = '';
        let testValue = '';
        let object;
        for (let i = 0; i < sortStatsByZero.length; i++) {
          object = sortStatsByZero[i];
          testValue = (object.zeroCount / object.count).toFixed(2);
          if (i > 9 && previousValue !== testValue) {
            break;
          }
          // skip cases when count is ZERO
          if (object.zeroCount > 0) {
            allParagraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${i + 1}. s${String(object.order).padStart(2, '0')} (${
                      object.zeroCount
                    }, ${(object.zeroCount / object.count).toFixed(2)}): ${
                      statementsArray[object.order - 1]
                    }`,
                    bold: false,
                    font: {
                      name: 'Arial',
                      hint: 'eastAsia',
                      eastAsia: 'Microsoft YaHei',
                    },
                    size: 20,
                  }),
                ],
                spacing: { before: 0 },
                indent: { left: 2000, hanging: 1800 },
              })
            );
          }
          previousValue = testValue;
        }
      }
    } catch (error) {
      console.error(`Error processing participant statements`, error);

      // Add error paragraph
      allParagraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `Error processing Participant Statements}: ${
                error instanceof Error ? error.message : 'Unknown error'
              }`,
              bold: true,
              color: 'FF0000', // Red color for errors
            }),
          ],
          spacing: { before: 400 },
        })
      );
    }

    return allParagraphs;
  } catch (error) {
    console.error('Error in wordPartStatements:', error);

    // Return error paragraph
    return [
      new Paragraph({
        children: [
          new TextRun({
            text: `Critical Error: ${
              error instanceof Error ? error.message : 'Unknown error occurred'
            }`,
            bold: true,
            color: 'FF0000',
          }),
        ],
      }),
    ];
  }
};

export { generateStatementAnalysis };
