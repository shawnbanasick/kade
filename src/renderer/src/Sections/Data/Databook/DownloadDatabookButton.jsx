import * as docx from 'docx';
import * as FileSaver from 'file-saver';
import generateSortMaps from './generateSortMaps';
import generateStatementsList from './generateStatementsList';
import { generateParticipantStatements } from './generateParticipantStatements';
import { generateStatementAnalysis } from './generateStatementAnalysis';
import calcRespondentDataArrays from './calcRespondentDataArrays';
import calcSortHeaders from './calcSortHeaders';
import {
  Document,
  convertInchesToTwip,
  AlignmentType,
  LevelFormat,
  NumberFormat,
  PageNumber,
  TextRun,
  Header,
  Paragraph,
} from 'docx';
import GeneralButton from './../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import DocxIcon from '../../images/DOCX_Icon2.svg';
import coreState from '../../GlobalState/coreState';

const DownloadDatabookButton = () => {
  const { t } = useTranslation();

  const translationObject = {
    statements: t('Statements'),
    projectData: t('Project Data'),
    downloaded: t('Download'),
    participants: t('Participants'),
    partQsorts: t('Participant Q Sorts'),
    sortValue: t('SortValue'),
    statementQsortValues: t('StatementQSortValues'),
    participant: t('Participant'),
    qSortValue: t('QSortValue'),
    statementNumber: t('StatementNumber'),
    statementStatistics: t('statementStatistics'),
    highestToLowestAverage: t('highestToLowestAverage'),
    qSortValueStability: t('qSortValueStability'),
    statementsWithAHighCountOfMax: t('statementsWithAHighCountOfMax'),
    statementsWithAHighCountOfMin: t('statementsWithAHighCountOfMin'),
    statementsWithAHighCountOfZero: t('statementsWithAHighCountOfZero'),
    countPercent: t('countPercent'),
  };

  const qSortPattern = coreState((state) => state.qSortPattern);
  const respondentNames = coreState((state) => state.respondentNames);
  const mainDataObject = coreState((state) => state.mainDataObject);
  const multiplierArray = coreState((state) => state.multiplierArray);
  const statements = coreState((state) => state.statements);
  const projectName = coreState((state) => state.projectName);

  const handleClick = () => {
    const statementNumArray = statements.map((item, index) => {
      return index + 1;
    });

    const respondentDataArrays = calcRespondentDataArrays(mainDataObject);
    const sortHeaders = calcSortHeaders(qSortPattern);

    const participantStatements = generateParticipantStatements(
      respondentDataArrays,
      sortHeaders,
      statements,
      respondentNames,
      translationObject
    );

    const generatedString = generateSortMaps(
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

    const statementAnalysis = generateStatementAnalysis(
      respondentDataArrays,
      statements,
      sortHeaders,
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
              size: 24,
            },
          },
        ],
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
      },
      sections: [
        {
          properties: {
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
          },
          headers: {
            default: new Header({
              children: [
                new Paragraph({
                  alignment: AlignmentType.END,
                  children: [
                    new TextRun('KADE Data Book '),
                    new TextRun({
                      children: [' Page ', PageNumber.CURRENT],
                    }),
                    new TextRun({
                      children: [' of ', PageNumber.TOTAL_PAGES],
                    }),
                  ],
                }),
              ],
            }),
          },
          children: statementsList,
        },
        {
          properties: {
            page: {
              margin: {
                top: 1200,
                right: 1000,
                bottom: 1000,
                left: 1000,
              },
            },
          },
          children: generatedString,
        },
        {
          properties: {
            page: {
              margin: {
                top: 1200,
                right: 1000,
                bottom: 1000,
                left: 1000,
              },
            },
          },
          children: participantStatements,
        },
        {
          properties: {
            page: {
              margin: {
                top: 1200,
                right: 1000,
                bottom: 1000,
                left: 1000,
              },
            },
          },
          children: statementAnalysis,
        },
      ],
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
    <div className="ml-[150px] w-[500px] pl-22 border-2 border-red-500">
      <GeneralButton className="border-2 border-blue-500" id="DatabookButton" onClick={handleClick}>
        <div className="flex flex-row  items-center gap-4">
          <div className="flex justify-end items-center">
            <img src={DocxIcon} className="h-[40px]" alt="CSV Icon" />
          </div>
          {t('Download Project Data Book')}
        </div>
      </GeneralButton>
    </div>
  );
};

export default DownloadDatabookButton;
