import { Paragraph, HeadingLevel, TextRun } from "docx";

const generateStatementsList = (
  statements,
  projectName,
  respondentNames,
  translationObject
) => {
  let currentdate = new Date();
  let minutes = currentdate.getMinutes();
  let newMinutes;
  if (minutes < 10) {
    newMinutes = `0${minutes}`;
  } else {
    newMinutes = minutes;
  }

  let datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    newMinutes;

  const statementsList = [
    new Paragraph({
      children: [
        new TextRun({
          text: `${translationObject.projectData}: ${projectName}`,
          bold: true
        })
      ],
      heading: HeadingLevel.HEADING_1,
      spacing: {
        after: 100
      }
    }),
    new Paragraph({
      text: `${translationObject.downloaded}: ${datetime}`,
      spacing: {
        after: 50
      }
    }),
    new Paragraph({
      text: `${translationObject.statements}: ${statements.length}, ${translationObject.participants}: ${respondentNames.length}`,
      spacing: {
        after: 400
      }
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `${translationObject.statements}`,
          bold: true
        })
      ],
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
      spacing: {
        after: 400
      }
    })
  ];

  for (let i = 0; i < statements.length; i++) {
    let text = new Paragraph({
      text: statements[i].trim(),
      numbering: {
        reference: "my-number-numbering-reference",
        level: 0
      }
    });
    statementsList.push(text);
  }

  return statementsList;
};
export default generateStatementsList;
