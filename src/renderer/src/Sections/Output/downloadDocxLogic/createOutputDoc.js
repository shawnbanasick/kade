import { Document, TextRun, Paragraph, TableOfContents, Bookmark, HeadingLevel } from 'docx';
import getDocParagraphStyles from './getDocParagraphStyles';
import getDocNumberingStyles from './getDocNumberingStyles';
import getSection1Headers from './getSection1Headers';
import getSection1Footers from './getSectionFooters';
import getSection1Properties from './getSection1Properties';
import getDateTime from './getDateTime';
import saveDocumentToFile from './saveDocumentToFile';
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
import outputState from '../../GlobalState/outputState';
import calcState from '../../GlobalState/calcState';
import saveDocumentToZip from './saveDocumentToZip';

// tableCompat = MS Word, LibreOffice Writer
// padCompat = Google Docs, Apple Pages
// let filetype = "tableCompat";
// let filetype = "plainText";

const generateOutputDoc = (translatedTextObj) => {
  let saveAsZip = outputState.willIncludeDataFiles;

  //let data = dataSource();
  const data = calcState.getState().outputData;

  let projectName = data[0][2][1];
  let version = data[0][19][1];
  let dateTime = getDateTime();

  let updateLinksBool = false;
  if (outputState.willUseHyperlinks === true) {
    updateLinksBool = true;
  }

  // ITERATE REPORT SECTIONS

  let childrenArray = [];

  if (outputState.willUseHyperlinks === true) {
    childrenArray.push(
      new Paragraph({
        heading: HeadingLevel.TITLE,
        children: [
          new Bookmark({
            id: 'anchorForTableOfContents',
            children: [new TextRun(projectName.toString())],
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
        children: [new TextRun(projectName.toString())],
        spacing: {
          after: 300,
        },
      })
    );
  }

  data.forEach((item, index) => {
    let value = item[0][0];

    if (value === 'overview' && outputState.willIncludeOverview === true) {
      let text1 = generateFrontMatter(
        item,
        dateTime,
        outputState.willUseHyperlinks,
        translatedTextObj
      );
      childrenArray.push(...text1);
    }

    if (value === 'statements' && outputState.willIncludeStatements === true) {
      let text2 = generateStatements(item, outputState.willUseHyperlinks);
      childrenArray.push(...text2);
    }

    if (value === 'sorts' && outputState.willIncludeQsorts === true) {
      let text3;
      if (outputState.useTables === true) {
        text3 = generateSorts(item, outputState.willUseHyperlinks);
      } else {
        text3 = generatePtSorts(item, outputState.willUseHyperlinks, outputState.useZebra);
      }
      text3.forEach((item) => {
        childrenArray.push(...item);
      });
    }

    if (value === 'correlations' && outputState.willIncludeCorrMatrix === true) {
      let text3b = generateCorrelations(
        item,
        outputState.useHyperlinks,
        outputState.useZebra,
        outputState.willIncludeThreshold,
        outputState.correlationThreshold
      );
      text3b.forEach((item) => {
        childrenArray.push(...item);
      });
    }
    if (value === 'unrotated' && outputState.willIncludeUnrotFacMatrix === true) {
      let text4 = generateUnrotFacMatrix(item, outputState.willUseHyperlinks, outputState.useZebra);
      childrenArray.push(...text4);
    }

    if (value === 'cumulative' && outputState.willIncludeCumulComm === true) {
      let text5 = generateComMatrix(item, outputState.willUseHyperlinks, outputState.useZebra);
      childrenArray.push(...text5);
    }

    if (value === 'matrix' && outputState.willIncludeFacLoadings === true) {
      let text6 = generateFacMatrix(
        item,
        outputState.willUseHyperlinks,
        outputState.useZebra,
        translatedTextObj
      );
      childrenArray.push(...text6);
    }
    if (value === 'loadingsTable' && outputState.willIncludeFacLoadingsTable === true) {
      let text7 = generateLoadingsTable(
        item,
        outputState.willUseHyperlinks,
        outputState.useZebra,
        translatedTextObj
      );
      childrenArray.push(...text7);
    }

    if (value === 'free' && outputState.willIncludeFreeDist === true) {
      let text8 = generateFreeDist(item, outputState.willUseHyperlinks, outputState.useZebra);
      childrenArray.push(...text8);
    }

    if (value === 'ranks' && outputState.willIncludeFacScoreRanks === true) {
      let text9;
      if (outputState.useTables === true) {
        text9 = generateFacScrRnks(item, outputState.willUseHyperlinks);
      } else {
        text9 = generatePtFacScrRnks(item, outputState.willUseHyperlinks, outputState.useZebra);
      }
      text9.forEach((item) => childrenArray.push(...item));
    }

    if (value === 'scoreCorr' && outputState.willIncludeFacScoreCorr === true) {
      let text10 = generateFacCorr(item, outputState.willUseHyperlinks, outputState.useZebra);
      childrenArray.push(...text10);
    }

    if (value === 'weights' && outputState.willIncludeFactors === true) {
      let text11;
      if (outputState.useTables === true) {
        text11 = generateFactorScores(
          item,
          data[index + 1],
          data[index + 2],
          outputState.willUseHyperlinks,
          translatedTextObj
        );
      } else {
        text11 = generatePtFactorScores(
          item,
          data[index + 1],
          data[index + 2],
          outputState.willUseHyperlinks,
          outputState.useZebra,
          translatedTextObj
        );
      }
      childrenArray.push(...text11);
    }

    if (value === 'descend' && outputState.willIncludeFacDiffs === true) {
      let text12;
      if (outputState.useTables === true) {
        text12 = generateDescendingDiff(item, outputState.willUseHyperlinks);
      } else {
        text12 = generatePtDescendDiff(item, outputState.willUseHyperlinks, outputState.useZebra);
      }
      childrenArray.push(...text12);
    }

    if (value === 'con-dis' && outputState.willIncludeConDis === true) {
      let text13;
      if (outputState.useTables === true) {
        text13 = generateConDis(item, outputState.willUseHyperlinks);
      } else {
        text13 = generatePtConDis(item, outputState.willUseHyperlinks, outputState.useZebra);
      }
      childrenArray.push(...text13);
    }

    if (value === 'facChar' && outputState.willIncludeFacChar === true) {
      let text14 = generateFacChar(
        item,
        data[index + 1],
        outputState.willUseHyperlinks,
        outputState.useZebra,
        translatedTextObj
      );
      childrenArray.push(...text14);
    }

    if (value === 'distinguishing' && outputState.willIncludeDist === true) {
      let text15;
      if (outputState.useTables === true) {
        text15 = generateDisting(item, outputState.willUseHyperlinks, translatedTextObj);
      } else {
        text15 = generatePtDisting(
          item,
          outputState.willUseHyperlinks,
          outputState.useZebra,
          translatedTextObj
        );
      }
      childrenArray.push(...text15);
    }

    if (value === 'consensus' && outputState.willIncludeConsensus === true) {
      let text16;
      if (outputState.useTables === true) {
        text16 = generateConsensus(item, outputState.willUseHyperlinks);
      } else {
        text16 = generatePtConsensus(item, outputState.willUseHyperlinks, outputState.useZebra);
      }
      childrenArray.push(...text16);
    }

    if (value === 'relRanks' && outputState.willIncludeRelRanks === true) {
      let text17;
      if (outputState.useTables === true) {
        text17 = generateRelRanks(item, outputState.willUseHyperlinks);
      } else {
        text17 = generatePtRelRanks(item, outputState.willUseHyperlinks, outputState.useZebra);
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
    saveDocumentToZip(doc, 'KADE_output_file.zip');
  } else {
    saveDocumentToFile(doc, 'KADE_output_file.docx');
  }
};
export default generateOutputDoc;
