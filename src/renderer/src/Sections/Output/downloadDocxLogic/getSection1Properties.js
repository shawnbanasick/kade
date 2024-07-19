import { NumberFormat } from 'docx';

const getSection1Properties = () => {
  const section1Properties = {
    page: {
      margin: {
        top: 1200,
        right: 1000,
        bottom: 1000,
        left: 1000,
      },
      pageNumbers: {
        start: 1,
        formatType: NumberFormat.DECIMAL,
      },
    },
  };

  return section1Properties;
};

export default getSection1Properties;
