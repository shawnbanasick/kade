import React from 'react';
import { view } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import * as docx from 'docx';
import * as FileSaver from 'file-saver';
import generateSortMaps from './generateSortMaps';
import generateStatementsList from './generateStatementsList';
import {
  Document,
  convertInchesToTwip,
  AlignmentType,
  LevelFormat,
  NumberFormat,
  PageNumber,
  TextRun,
  Header,
  Paragraph
} from 'docx';
import getCoreState from '../../GlobalState/getCoreState';
import GeneralButton from './../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import DocxIcon from '../../images/DOCX_Icon2.svg';

const DownloadDatabookButton = () => {
  const { t } = useTranslation();

  const translationObject = {
    statements: t('Statements'),
    projectData: t('Project Data'),
    downloaded: t('Download'),
    participants: t('Participants'),
    partQsorts: t('Participant Q Sorts')
  };

  const handleClick = async () => {
    const qSortPattern = getCoreState('qSortPattern');
    const respondentNames = getCoreState('respondentNames');
    const mainDataObject = getCoreState('mainDataObject');
    const multiplierArray = getCoreState('multiplierArray');
    const statements = getCoreState('statements');
    const projectName = getCoreState('projectName');

    const statementNumArray = statements.map((item, index) => {
      return index + 1;
    });

    const generatedString = await generateSortMaps(
      qSortPattern,
      respondentNames,
      mainDataObject,
      statementNumArray,
      multiplierArray,
      translationObject
    );

    const statementsList = generateStatementsList(
      statements,
      projectName,
      respondentNames,
      translationObject
    );

    const doc = new Document({
      styles: {
        paragraphStyles: [
          {
            id: 'Normal',
            name: 'Normal',
            basedOn: 'Normal',
            next: 'Normal',
            quickFormat: true,
            run: {
              font: 'Courier New',
              size: 24
            }
          }
        ]
      },
      numbering: {
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
                      hanging: convertInchesToTwip(0.18)
                    }
                  }
                }
              }
            ],
            reference: 'my-crazy-reference'
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
                      hanging: convertInchesToTwip(0.3)
                    }
                  }
                }
              }
            ],
            reference: 'my-number-numbering-reference'
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
                      hanging: convertInchesToTwip(0.18)
                    }
                  }
                }
              }
            ],
            reference: 'padded-numbering-reference'
          }
        ]
      },
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1200,
                right: 1000,
                bottom: 1000,
                left: 1000
              },
              pageNumbers: {
                start: 1,
                formatType: NumberFormat.DECIMAL
              }
            }
          },
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  alignment: AlignmentType.END,
                  children: [
                    new TextRun('KADE Data Book '),
                    new TextRun({
                      children: [' Page ', PageNumber.CURRENT]
                    }),
                    new TextRun({
                      children: [' of ', PageNumber.TOTAL_PAGES]
                    })
                  ]
                })
              ]
            })
          },
          children: statementsList
        },
        {
          properties: {
            page: {
              margin: {
                top: 1200,
                right: 1000,
                bottom: 1000,
                left: 1000
              }
            }
          },
          children: generatedString
        }
      ]
    });

    let currentdate = new Date();
    let datetime =
      currentdate.getFullYear() +
      '-' +
      (currentdate.getMonth() + 1) +
      '-' +
      currentdate.getDate() +
      '_' +
      currentdate.getHours() +
      '-' +
      currentdate.getMinutes();

    docx.Packer.toBlob(doc).then((blob) => {
      FileSaver.saveAs(blob, `KADE - Databook - ${projectName} - ${datetime}.docx`);
      console.log('Document created successfully');
    });
  };

  return (
    <TradButton as={GeneralButton} id="DatabookButton" onClick={handleClick}>
      <LineContainer>
        <SvgContainer>
          <img src={DocxIcon} height="50px" alt="CSV Icon" />
        </SvgContainer>
        {t('Download Project Data Book')}
      </LineContainer>
    </TradButton>
  );
};
export default view(DownloadDatabookButton);

const TradButton = styled.div`
  margin-left: 150px;
  margin-right: 5px;
`;

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const SvgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-left: 10;
`;
