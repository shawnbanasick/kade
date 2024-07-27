import { convertInchesToTwip, AlignmentType, LevelFormat } from 'docx';

const getDocNumberingStyles = () => {
  const numberingStyles = {
    config: [
      {
        levels: [
          {
            level: 0,
            format: LevelFormat.UPPER_ROMAN,
            text: '%1',
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: convertInchesToTwip(0.5),
                  hanging: convertInchesToTwip(0.18),
                },
              },
            },
          },
        ],
        reference: 'my-crazy-reference',
      },
      {
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: '%1',
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: convertInchesToTwip(0.3),
                  hanging: convertInchesToTwip(0.3),
                },
              },
            },
          },
        ],
        reference: 'my-number-numbering-reference',
      },
      {
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL_ZERO,
            text: '[%1]',
            alignment: AlignmentType.START,
            style: {
              paragraph: {
                indent: {
                  left: convertInchesToTwip(0.5),
                  hanging: convertInchesToTwip(0.18),
                },
              },
            },
          },
        ],
        reference: 'padded-numbering-reference',
      },
    ],
  };

  return numberingStyles;
};

export default getDocNumberingStyles;
