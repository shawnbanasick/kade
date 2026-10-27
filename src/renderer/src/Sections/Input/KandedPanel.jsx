import KandedCard from './Kanded/ExcelT3Card';
import { useTranslation } from 'react-i18next';
import excel3Image from '../images/excel3-data-image.png';
import LoadExcelT3 from './Kanded/LoadExcelT3';

const KandedPanel = () => {
  const { t } = useTranslation();

  return (
    <div id="KandedPanelContainer" className="flex flex-col h-full overflow-y-auto pb-10">
      <div id="ExcelKadeDataWindow">
        <div className="text-4xl mt-2 mb-10">{t('KADE Excel File Input')}</div>

        <div
          id="excelKadePanelHeader"
          className="font-['Helvetica'] text-black text-xl font-bold h-7.5 mb-5"
        >
          {t('Load a KADE or Ken-Q Analysis (web) XLSX output file')}
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
              src={excel3Image}
            />
          </button>
        </div>

        {/* Text area */}
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-16 shrink-0 items-center justify-center rounded-md  bg-primary-button text-sm font-bold text-black">
              KADE
            </span>
            <h3 className="text-sm font-semibold text-gray-900">
              {t('Import project data from a previous KADE analysis')}
            </h3>
          </div>
          <LoadExcelT3 />
          {/* <p className="text-sm leading-relaxed text-gray-600">{step.text}</p> */}
        </div>
      </div>
    </div>
  );
};

export default KandedPanel;
