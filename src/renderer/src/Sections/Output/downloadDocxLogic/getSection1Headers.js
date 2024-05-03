import { AlignmentType, PageNumber, TextRun, Header, Paragraph } from "docx";

const getSection1Headers = (name, version) => {
  const section1Headers = {
    default: new Header({
      children: [
        new Paragraph({
          alignment: AlignmentType.DISTRIBUTE,
          style: "bodyStyle1",
          children: [
            new TextRun(name.toString().padEnd(60, " ")),
            new TextRun({
              children: ["pg.", PageNumber.CURRENT]
            }),
            new TextRun({
              children: [" of ", PageNumber.TOTAL_PAGES]
            })
          ]
        })
      ]
    })
  };

  return section1Headers;
};

export default getSection1Headers;
