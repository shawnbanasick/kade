const getDocParagraphStyles = () => {
  const styles = {
    paragraphStyles: [
      {
        id: 'myCustomStyle',
        name: 'My custom red style',
        basedOn: 'Normal',
        run: {
          color: '000000',
          bold: true,
          size: 26,
          font: 'Courier New',
        },
        paragraph: {
          spacing: { line: 276, before: 150, after: 150 },
        },
      },
      {
        id: 'bodyStyle1',
        name: 'body text',
        basedOn: 'Normal',
        run: {
          color: '000000',
          size: 20,
          font: 'Courier New',
        },
        paragraph: {
          spacing: { line: 276, before: 100, after: 100 },
        },
      },
      {
        id: 'dist8',
        name: 'dist text8',
        basedOn: 'Normal',
        run: {
          color: '000000',
          size: 16,
          font: 'Courier New',
        },
        paragraph: {
          spacing: { line: 260, before: 10, after: 10 },
        },
      },
      {
        id: 'dist6',
        name: 'dist text6',
        basedOn: 'Normal',
        run: {
          color: '000000',
          size: 18,
          font: 'Courier New',
        },
        paragraph: {
          spacing: { line: 260, before: 10, after: 10 },
        },
      },
      {
        id: 'dist4',
        name: 'dist text4',
        basedOn: 'Normal',
        run: {
          color: '000000',
          size: 20,
          font: 'Courier New',
        },
        paragraph: {
          spacing: { line: 260, before: 10, after: 10 },
        },
      },

      {
        id: 'correlationsStyle',
        name: 'body text',
        basedOn: 'Normal',
        run: {
          color: '000000',
          size: 21,
          font: 'Courier New',
        },
        paragraph: {
          spacing: { line: 285, before: 100, after: 110 },
        },
      },
      {
        id: 'ptQsorts',
        name: 'plain text Q sorts',
        basedOn: 'Normal',
        run: {
          color: '000000',
          size: 19,
          font: 'Courier New',
        },
        paragraph: {
          spacing: { line: 276, before: 100, after: 100 },
        },
      },
      {
        id: 'tableStyle1',
        name: 'table very small text',
        basedOn: 'Normal',
        run: {
          color: '000000',
          size: 16,
          font: 'Arial',
        },
        paragraph: {
          spacing: { line: 260, before: 10, after: 10 },
        },
      },
      {
        id: 'tableStyle2',
        name: 'table small text',
        basedOn: 'Normal',
        run: {
          color: '000000',
          size: 20,
          font: 'Arial',
        },
        paragraph: {
          spacing: { line: 260, before: 10, after: 10 },
        },
      },
      {
        id: 'tableStyle8',
        name: 'table tiny text',
        basedOn: 'Normal',
        run: {
          color: '000000',
          size: 16,
          font: 'Arial',
        },
        paragraph: {
          spacing: { line: 220, before: 10, after: 10 },
        },
      },
    ],
  };

  return styles;
};

export default getDocParagraphStyles;
