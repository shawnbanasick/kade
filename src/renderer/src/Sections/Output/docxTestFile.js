import { Paragraph, TextRun } from 'docx';

const docxTextFile = () => {
  const doc = [
    {
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun('Hello World'),
            new TextRun({
              text: 'Foo Bar',
              bold: true,
            }),
            new TextRun({
              text: '\tGithub is the best',
              bold: true,
            }),
          ],
        }),
      ],
    },
  ];

  return doc;
};

export default docxTextFile;
