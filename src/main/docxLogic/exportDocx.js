import {
  Document,
  Packer,
  TextRun,
  Paragraph,
  TableOfContents,
  Bookmark,
  HeadingLevel,
} from 'docx';
import getDocParagraphStyles from './getDocParagraphStyles';
import getDocNumberingStyles from './getDocNumberingStyles';
import getSection1Headers from './getSection1Headers';
import getSection1Footers from './getSectionFooters';
import getSection1Properties from './getSection1Properties';
import getDateTime from './getDateTime';
// import saveDocumentToFile from './saveDocumentToFile';
import generateFrontMatter from './generateFrontMatter';
import generateStatements from './generateStatements';
import generateCorrelations from './generateCorrelations';
import generateSorts from './generateSorts';
import generateUnrotFacMatrix from './generateUnrotFacMatrix';
import generateComMatrix from './generateComMatrix';
import generateFacMatrix from './generateFacMatrix';
import generateFreeDist from './generateFreeDist';
import generateFacScrRnks from './generateFacScrRnks';
import generateFacCorr from './generateFacCorr';
import generateFactorScores from './generateFactorScores';
import generateLoadingsTable from './generateLoadingsTable';
import generateDescendingDiff from './generateDescendingDiff';
import generateConDis from './generateConDis';
import generateFacChar from './generateFacChar';
import generateDisting from './generateDisting';
import generateConsensus from './generateConsensus';
import generateRelRanks from './generateRelRanks';
import generatePtSorts from './generatePtSorts';
import generatePtFacScrRnks from './generatePtFacScrRnks';
import generatePtFactorScores from './generatePtFactorScores';
import generatePtDescendDiff from './generatePtDescendDiff';
import generatePtConDis from './generatePtConDis';
import generatePtDisting from './generatePtDisting';
import generatePtConsensus from './generatePtConsensus';
import generatePtRelRanks from './generatePtRelRanks';
import fs from 'fs';
import { dialog } from 'electron';
import currentDate1 from '../../renderer/src/Utils/currentDate1';
import currentTime1 from '../../renderer/src/Utils/currentTime1';

// import outputState from '../../GlobalState/outputState';
// import calcState from '../../GlobalState/calcState';
// import cloneDeep from 'lodash/cloneDeep';
// import newSaveDocumentToFile from './newSaveDocumentToFile';
// import saveDocumentToZip from './saveDocumentToZip';

// tableCompat = MS Word, LibreOffice Writer
// padCompat = Google Docs, Apple Pages
// let filetype = "tableCompat";
// let filetype = "plainText";

const generateOutputDoc = async (dataContent) => {
  const data = dataContent.data; // cloneDeep(calcState.getState().outputData);

  // let projectName = 'lipset';
  let projectName = data[0][2][1];
  let version = data[0][19][1];
  let dateTime = getDateTime();
  const docOptions = dataContent.docOptions;
  const translatedTextObj = { ...dataContent.translatedTextObj };
  const {
    saveAsZip,
    willUseHyperlinks,
    willIncludeOverview,
    willIncludeStatements,
    willIncludeQsorts,
    useTables,
    useZebra,
    willIncludeCorrMatrix,
    willIncludeThreshold,
    correlationThreshold,
    useHyperlinks,
    willIncludeUnrotFacMatrix,
    willIncludeCumulComm,
    willIncludeFacLoadings,
    willIncludeFacLoadingsTable,
    willIncludeFreeDist,
    willIncludeFacScoreRanks,
    willIncludeFacScoreCorr,
    willIncludeFactors,
    willIncludeFacDiffs,
    willIncludeConDis,
    willIncludeFacChar,
    willIncludeDist,
    willIncludeConsensus,
    willIncludeRelRanks,
  } = docOptions;

  let updateLinksBool = false;
  if (willUseHyperlinks === true) {
    updateLinksBool = true;
  }

  // ITERATE REPORT SECTIONS

  let childrenArray = [];

  if (willUseHyperlinks === true) {
    childrenArray.push(
      new Paragraph({
        heading: HeadingLevel.TITLE,
        children: [
          new Bookmark({
            id: 'anchorForTableOfContents',
            children: [new TextRun(projectName)],
          }),
        ],
        spacing: {
          after: 300,
        },
      }),
      new TableOfContents('Summary', {
        hyperlink: true,
        headingStyleRange: '1-5',
      })
    );
  } else {
    childrenArray.push(
      new Paragraph({
        heading: HeadingLevel.TITLE,
        children: [new TextRun(projectName)],
        spacing: {
          after: 300,
        },
      })
    );
  }

  data.forEach((item, index) => {
    let value = item[0][0];

    if (value === 'overview' && willIncludeOverview === true) {
      let text1 = generateFrontMatter(item, dateTime, willUseHyperlinks, translatedTextObj);
      childrenArray.push(...text1);
    }

    if (value === 'statements' && willIncludeStatements === true) {
      let text2 = generateStatements(item, willUseHyperlinks);
      childrenArray.push(...text2);
    }

    if (value === 'sorts' && willIncludeQsorts === true) {
      let text3;
      if (useTables === true) {
        text3 = generateSorts(item, willUseHyperlinks);
      } else {
        text3 = generatePtSorts(item, willUseHyperlinks, useZebra);
      }
      text3.forEach((item) => {
        childrenArray.push(...item);
      });
    }

    if (value === 'correlations' && willIncludeCorrMatrix === true) {
      let text3b = generateCorrelations(
        item,
        useHyperlinks,
        useZebra,
        willIncludeThreshold,
        correlationThreshold,
        dataContent.partNumArray
      );
      text3b.forEach((item) => {
        childrenArray.push(...item);
      });
    }
    if (value === 'unrotated' && willIncludeUnrotFacMatrix === true) {
      let text4 = generateUnrotFacMatrix(item, willUseHyperlinks, useZebra);
      childrenArray.push(...text4);
    }

    if (value === 'cumulative' && willIncludeCumulComm === true) {
      let text5 = generateComMatrix(item, willUseHyperlinks, useZebra);
      childrenArray.push(...text5);
    }

    if (value === 'matrix' && willIncludeFacLoadings === true) {
      let text6 = generateFacMatrix(item, willUseHyperlinks, useZebra, translatedTextObj);
      childrenArray.push(...text6);
    }
    if (value === 'loadingsTable' && willIncludeFacLoadingsTable === true) {
      let text7 = generateLoadingsTable(item, willUseHyperlinks, useZebra, translatedTextObj);
      childrenArray.push(...text7);
    }

    if (value === 'free' && willIncludeFreeDist === true) {
      let text8 = generateFreeDist(item, willUseHyperlinks, useZebra);
      childrenArray.push(...text8);
    }

    if (value === 'ranks' && willIncludeFacScoreRanks === true) {
      let text9;
      if (useTables === true) {
        text9 = generateFacScrRnks(item, willUseHyperlinks);
      } else {
        text9 = generatePtFacScrRnks(item, willUseHyperlinks, useZebra);
      }
      text9.forEach((item) => childrenArray.push(...item));
    }

    if (value === 'scoreCorr' && willIncludeFacScoreCorr === true) {
      let text10 = generateFacCorr(item, willUseHyperlinks, useZebra);
      childrenArray.push(...text10);
    }

    if (value === 'weights' && willIncludeFactors === true) {
      let text11;
      if (useTables === true) {
        text11 = generateFactorScores(
          item,
          data[index + 1],
          data[index + 2],
          willUseHyperlinks,
          translatedTextObj
        );
      } else {
        text11 = generatePtFactorScores(
          item,
          data[index + 1],
          data[index + 2],
          willUseHyperlinks,
          useZebra,
          translatedTextObj
        );
      }
      childrenArray.push(...text11);
    }

    if (value === 'descend' && willIncludeFacDiffs === true) {
      let text12;
      if (useTables === true) {
        text12 = generateDescendingDiff(item, willUseHyperlinks);
      } else {
        text12 = generatePtDescendDiff(item, willUseHyperlinks, useZebra);
      }
      childrenArray.push(...text12);
    }

    if (value === 'con-dis' && willIncludeConDis === true) {
      let text13;
      if (useTables === true) {
        text13 = generateConDis(item, willUseHyperlinks);
      } else {
        text13 = generatePtConDis(item, willUseHyperlinks, useZebra);
      }
      childrenArray.push(...text13);
    }

    if (value === 'facChar' && willIncludeFacChar === true) {
      let text14 = generateFacChar(
        item,
        data[index + 1],
        willUseHyperlinks,
        useZebra,
        translatedTextObj
      );
      childrenArray.push(...text14);
    }

    if (value === 'distinguishing' && willIncludeDist === true) {
      let text15;
      if (useTables === true) {
        text15 = generateDisting(item, willUseHyperlinks, translatedTextObj);
      } else {
        text15 = generatePtDisting(item, willUseHyperlinks, useZebra, translatedTextObj);
      }
      childrenArray.push(...text15);
    }

    if (value === 'consensus' && willIncludeConsensus === true) {
      let text16;
      if (useTables === true) {
        text16 = generateConsensus(item, willUseHyperlinks);
      } else {
        text16 = generatePtConsensus(item, willUseHyperlinks, useZebra);
      }
      childrenArray.push(...text16);
    }

    if (value === 'relRanks' && willIncludeRelRanks === true) {
      let text17;
      if (useTables === true) {
        text17 = generateRelRanks(item, willUseHyperlinks);
      } else {
        text17 = generatePtRelRanks(item, willUseHyperlinks, useZebra);
      }
      childrenArray.push(...text17);
    }
  });

  childrenArray.push(
    new Paragraph({
      style: 'bodyStyle1',
      children: [
        new TextRun({
          text: 'END OUTPUT',
          bold: true,
        }),
      ],
      spacing: {
        before: 300,
      },
    })
  );

  let doc = new Document({
    compatibility: {
      growAutofit: false,
      doNotAutofitConstrainedTables: true,
    },
    features: {
      updateFields: updateLinksBool,
    },
    styles: getDocParagraphStyles(),
    numbering: getDocNumberingStyles(),
    sections: [
      {
        properties: getSection1Properties(),
        headers: getSection1Headers(projectName),
        footers: getSection1Footers(dateTime, version),
        children: [...childrenArray],
      },
    ],
  });
  if (saveAsZip === true) {
    // saveDocumentToZip(doc, 'KADE_output_file.zip');
  } else {
    const timeStamp = `${currentDate1()}_${currentTime1()}`;
    let nameFile = `KADE_results_${projectName}_${timeStamp}.docx`;

    Packer.toBuffer(doc).then(async (doc) => {
      const { canceled, filePath } = await dialog.showSaveDialog({
        defaultPath: nameFile,
      });

      if (!canceled && filePath) {
        try {
          fs.writeFileSync(filePath, doc, (err) => {
            if (err) {
              console.error('Error saving file:', err);
            } else {
              console.log('File saved successfully');
            }
          });
          dialog.showMessageBoxSync({
            title: 'KADE',
            type: 'info',
            message: `File saved to:`,
            detail: `${filePath}`,
            buttons: ['OK'],
          });
        } catch (err) {
          console.error('Error saving file:', err);
        }
      }
    });
  }
};
export default generateOutputDoc;
