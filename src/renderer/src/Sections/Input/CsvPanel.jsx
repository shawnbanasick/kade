import { useTranslation } from 'react-i18next';
import ProjectNameInput from './CSV/ProjectNameInput';
import RadioExampleRadioGroup from './CSV/ForcedUnforcedRadio';
import QsortDesignInputElement from './CSV/QsortDesignInputElement';
import statementsTextImage from '../images/statementsTextImage.png';
import excel2Image from '../images/Excel2.png';
import LoadCsvStatements from './CSV/LoadCsvStatements';
import LoadCsvQsorts from './CSV/LoadCsvQsorts';

const CsvPanel = () => {
  const { t } = useTranslation();

  return (
    <div id="csvPanelContainer" className="flex flex-col gap-4 h-full overflow-y-auto pb-10">
      <div id="csvDataWindow">
        <div className="text-4xl mt-2 mb-10">{t('CSV File Input')}</div>

        <div
          id="csvPanelHeader"
          className="font-['Helvetica'] text-black text-xl font-bold h-7.5 mb-5"
        >
          {t('Load both a statements text file and a Q sorts CSV file')}
        </div>
      </div>

      {/* <div className="grid grid-cols-[350px_350px] grid-rows-[350px_45px_15px_50px_1fr] select-none gap-10 ml-10"> */}
      <div className="flex flex-col gap-5 ml-10">
        <div className="flex flex-row gap-10">
          <div className="flex w-[282px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Image area (click to enlarge) */}
            <div className="bg-gray-50 p-4">
              <button
                type="button"
                // aria-label={`Enlarge image: ${step.title}`}
                className="block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <img
                  className="h-[205px] w-[250px] outline outline-1 outline-gray-300"
                  alt={t('Statements Text File Example')}
                  src={statementsTextImage}
                />
              </button>
            </div>

            {/* Text area */}
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full  bg-primary-button text-sm font-bold text-black">
                  1
                </span>
                <h3 className="text-sm font-semibold text-gray-900">
                  {t(
                    'Statements must be saved as plain text (Unicode) with the extension ".txt". One statement per line.'
                  )}
                </h3>
              </div>
              <LoadCsvStatements />
              {/* <p className="text-sm leading-relaxed text-gray-600">{step.text}</p> */}
            </div>
          </div>
          <div className="flex w-[282px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            {/* Image area (click to enlarge) */}
            <div className="bg-gray-50 p-4">
              <button
                type="button"
                // aria-label={`Enlarge image: ${step.title}`}
                className="block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <img
                  className="h-[205px] w-[250px] outline outline-1 outline-gray-300"
                  alt={t('Q Sorts CSV File Example')}
                  src={excel2Image}
                />
              </button>
            </div>

            {/* Text area */}
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full  bg-primary-button text-sm font-bold text-black">
                  2
                </span>
                <h3 className="text-sm font-semibold text-gray-900">
                  {t(
                    'Q sorts must be saved as a CSV file with the extension ".csv". The participant sorts must be in rows.'
                  )}
                </h3>
              </div>
              {/* <LoadKadeZip /> */}
              <LoadCsvQsorts />
              {/* <p className="text-sm leading-relaxed text-gray-600">{step.text}</p> */}
            </div>
          </div>
        </div>
        <ProjectNameInput id="projectNameInput" />
        <RadioExampleRadioGroup id="forcedUnforcedRadio" numbering="4" />
        <QsortDesignInputElement id="qsortDesignInputElement" numbering="5" />
      </div>
    </div>
  );
};

export default CsvPanel;

/*
      <div
        id="csvPanelWindow"
        className="grid grid-cols-[350px_350px] grid-rows-[350px_75px_15px_50px_1fr] select-none gap-10 ml-10"
      >
        <CsvStatementCard id="csvStatementCard" />
        <CsvSortsCard id="csvSortsCard" />
      </div>
*/
