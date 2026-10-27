import PQMethodStaCard from './PQMethod/PQMethodStaCard';
import PQMethodQsortsCard from './PQMethod/PQMethodQsortsCard';
import { useTranslation } from 'react-i18next';
import pqMethodImage1 from '../images/pqMethod-input-sorts.png';
import pqMethodImage2 from '../images/pqMethod-input-sta.png';
import LoadPQMethodStaFile from './PQMethod/LoadPQMethodStaFile';
import LoadPQMethodData from './PQMethod/LoadPQMethodData';

const PQMethodPanel = () => {
  const { t } = useTranslation();

  return (
    <div id="pqmethodDataWindow" className="flex flex-col h-full overflow-y-auto pb-10">
      <div>
        <div className="text-4xl mt-2 mb-10">{t('PQ Method File Input')}</div>

        <div
          id="pqmethodDataWindowHeader"
          className="font-['Helvetica'] text-black  text-xl font-bold h-7.5 mb-5"
        >
          {t('Load both a statements STA file and Q sorts DAT file')}
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div className="flex w-[282px] flex-col  rounded-lg border border-gray-200 bg-white shadow-sm">
          {/* Image area (click to enlarge) */}
          <div className="bg-gray-50 p-4">
            <button
              type="button"
              // aria-label={`Enlarge image: ${step.title}`}
              className="block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <img
                className="h-[205px] w-[250px] outline outline-1 outline-gray-300"
                // alt={step.alt}
                src={pqMethodImage2}
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
                {t('Import a STA file containing the statements for the Q sort.')}
              </h3>
            </div>
            <LoadPQMethodStaFile />
            {/* <p className="text-sm leading-relaxed text-gray-600">{step.text}</p> */}
          </div>
        </div>

        <div className="flex w-[282px] flex-col  rounded-lg border border-gray-200 bg-white shadow-sm">
          {/* Image area (click to enlarge) */}
          <div className="bg-gray-50 p-4">
            <button
              type="button"
              // aria-label={`Enlarge image: ${step.title}`}
              className="block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <img
                className="h-[205px] w-[250px] outline outline-1 outline-gray-300"
                // alt={step.alt}
                src={pqMethodImage1}
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
                {t('Import a DAT file containing the Q sorts for the analysis.')}
              </h3>
            </div>
            <LoadPQMethodData />
            {/* <p className="text-sm leading-relaxed text-gray-600">{step.text}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PQMethodPanel;

/*
      <div
        id="pqmethodPanelWindow"
        className="grid grid-cols-[350px_350px] gap-10 grid-rows-[350px_75px_120px_1fr] select-none ml-10"
      >
        <PQMethodStaCard />
        <PQMethodQsortsCard />
      </div>

      */
