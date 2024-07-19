import { AlignmentType, TextRun, Footer, Paragraph } from 'docx';

const getSection1Footers = (dateTime, version) => {
  const section1Footers = {
    default: new Footer({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          style: 'bodyStyle1',
          children: [
            new TextRun(`KADE version ${version}`.padEnd(25, ' ')),
            new TextRun(`${dateTime}`),
          ],
        }),
      ],
    }),
  };

  return section1Footers;
};

export default getSection1Footers;
