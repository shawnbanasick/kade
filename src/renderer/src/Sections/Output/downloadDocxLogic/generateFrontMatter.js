import { Paragraph, HeadingLevel, TextRun } from 'docx';

const generateFrontMatter = (dataFrag, datetime, filetype, translatedTextObj) => {
  // let projectName = dataFrag[2][1];
  let hasPageBreak = true;
  if (filetype !== 'tableCompat') {
    hasPageBreak = false;
  }
  //let dataFrag = [...data[0]];

  let numStatements = dataFrag[4][1];
  let numStatementsText = dataFrag[4][0];
  let numParticipants = dataFrag[8][1];
  let numParticipantsText = dataFrag[8][0];
  let statementsParticipants = `${numStatementsText}${numStatements}, ${numParticipantsText}${numParticipants}`;

  let qSortPattern = dataFrag[6][1];
  let qSortPatternText = dataFrag[6][0];

  // project log array creation
  let projectLogArray = [];
  for (let i = 21; i < dataFrag.length; i++) {
    let tempText1 = dataFrag[i][1];
    let tempText = new Paragraph({
      text: `${tempText1}`,
      spacing: {
        after: 100,
      },
    });
    projectLogArray.push(tempText);
  }

  return [
    new Paragraph({
      children: [
        new TextRun({
          text: translatedTextObj['projectOverTxt'],
          bold: true,
        }),
      ],
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
      pageBreakBefore: hasPageBreak,
      spacing: {
        after: 200,
        before: 500,
      },
    }),

    // downloaded on datetime
    new Paragraph({
      text: `${translatedTextObj['downloadTxt']}: ${datetime}`,
      spacing: {
        before: 100,
        after: 300,
      },
    }),

    // Statements and Participants
    new Paragraph({ text: statementsParticipants }),

    // Q sort pattern
    new Paragraph({
      text: `${qSortPatternText}: ${qSortPattern}`,
      indent: {
        start: 500,
        hanging: 500,
      },
      spacing: {
        before: 300,
      },
    }),

    // p value 1
    new Paragraph({
      text: `${dataFrag[11][0]}${dataFrag[11][1]}`,
      indent: {
        start: 500,
        hanging: 500,
      },
      spacing: {
        before: 300,
      },
    }),

    // p value 2
    new Paragraph({
      text: `${dataFrag[13][0]}${dataFrag[13][1]}`,
      indent: {
        start: 500,
        hanging: 500,
      },
      spacing: {
        before: 300,
      },
    }),

    // autoflag p value 1
    new Paragraph({
      text: `${dataFrag[17][0]}${dataFrag[17][1]}`,
      indent: {
        start: 500,
        hanging: 500,
      },
      spacing: {
        before: 300,
      },
    }),

    // Project Log Header
    new Paragraph({
      children: [
        new TextRun({
          text: translatedTextObj['projectLogTxt'],
          bold: true,
        }),
      ],

      // Project Log Items
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
      spacing: {
        after: 200,
        before: 1500,
      },
    }),
    ...projectLogArray,
  ];
};

export default generateFrontMatter;
