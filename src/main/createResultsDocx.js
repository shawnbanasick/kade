import { Document, Paragraph, TextRun, Packer } from 'docx';
let fs = require('fs');

const createResultsDocx = (filePath) => {
  //   const returnArray = [];
  const doc = new Document({
    sections: [
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
    ],
  });

  Packer.toBuffer(doc).then((doc) => {
    fs.writeFileSync(filePath, doc, (err) => {
      if (err) throw err;
      console.log('Unexpected file save error!');
    });
    // returnArray.push(doc);
  });
  return;
};

export default createResultsDocx;
