import ZipDataCard from './Zip/ZipDataCard';
import { useTranslation } from 'react-i18next';
import excel3Image from '../images/kadeZip.png';
// import kadeZip from '../../images/kadeZip.png';
import LoadKadeZip from './Zip/LoadKadeZip';

const KadeZipPanel = () => {
  const { t } = useTranslation();

  return (
    <div id="KadeZipPanelContainer" className="flex flex-col h-full overflow-y-auto pb-10">
      <div id="ExcelKadeZipDataWindow">
        <div className="text-4xl mt-2 mb-10">{t('KADE Zip File Input')}</div>

        <div className="font-['Helvetica'] text-black text-xl font-bold h-7.5 mb-5">
          {t('Load a KADE or Ken-Q Analysis (web) Zip output file')}
        </div>
      </div>
      <div className="flex w-[282px] flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
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
            <span className="flex h-6 w-20 shrink-0 items-center justify-center rounded-md  bg-primary-button text-sm font-bold text-black">
              KADE Zip
            </span>
            <h3 className="text-sm font-semibold text-gray-900">
              {t('Import project data from a previous KADE analysis')}
            </h3>
          </div>
          <LoadKadeZip />
          {/* <p className="text-sm leading-relaxed text-gray-600">{step.text}</p> */}
        </div>
      </div>
    </div>
  );
};

export default KadeZipPanel;

/*
      <div
        id="kadeZipPanelWindow"
        className="grid grid-cols-[350px_350px] grid-rows-[350px_75px_120px_1fr] select-none"
      >
        <ZipDataCard />
      </div>
*/
