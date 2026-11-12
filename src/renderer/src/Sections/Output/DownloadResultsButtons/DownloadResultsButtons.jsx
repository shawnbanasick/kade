// import DownloadResultsAsExcel from './DownloadResultsAsExcel';
import DownloadResultsAsCsv from './DownloadResultsAsCsv';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';
import DownloadDocxFile from './DownloadDocxFile';
import DownloadNewExcel from './DownloadNewExcel';
import DownloadAllResults from './DownloadAllResults';
import XlsxIcon from '../../images/XLSX_Icon3.svg';
import DocxIcon from '../../images/DOCX_Icon3.svg';
import CsvIcon from '../../images/CSV_Icon3.svg';

const DownloadResultsButtons = () => {
  const { t } = useTranslation();
  // const showDownloadOutputButtons = outputState((state) => state.showDownloadOutputButtons);
  const displayOutputTabContent = outputState((state) => state.displayOutputTabContent);

  if (!displayOutputTabContent) {
    return (
      <h2 className="mt-12.5 text-2xl ml-12.5">
        {t('Select factors for output in the Options tab')}
      </h2>
    );
  }

  return (
    <>
      <div className="text-4xl">{t('Export Results')}</div>
      <div className={`h-[100px] mt-[30px] ${displayOutputTabContent ? 'visible' : 'hidden'}`}>
        <div className="w-fit text-[24px] mr-[5px] mt-0!">{t('Save data as...')}</div>
        <div className="flex flex-col gap-5 outline-offset-0 rounded-lg ">
          <div className="flex flex-row flex-wrap gap-4">
            {/* -- ZIP FILE CARD -- */}
            <div className="flex w-[282px] flex-col overflow-hidden rounded-lg border border-gray-200  bg-white shadow-sm">
              {/* Image area (click to enlarge) */}
              <div className="bg-gray-50 p-4  min-h-40">
                {`${t('Includes')}:`}
                <ul className="list-disc! list-inside columns-2  mt-2 gap-x-1 text-sm text-balance leading-relaxed ml-3 ">
                  <li className="text-sm break-inside-avoid text-balanced leading-relaxed text-gray-600">
                    {t('DOCX file')}
                  </li>
                  <li className="text-sm break-inside-avoid text-balanced leading-relaxed text-gray-600">
                    {t('XLSX file')}
                  </li>
                  <li className="text-sm break-inside-avoid text-balanced leading-relaxed text-gray-600">
                    {t('CSV file')}
                  </li>
                  <li className="text-sm break-inside-avoid text-balanced leading-relaxed text-gray-600">
                    {t('Q Sort Data')}
                  </li>
                  <li className="text-sm break-inside-avoid text-balanced leading-relaxed text-gray-600">
                    {t('Scree Plot Image')}
                  </li>
                  <li className="text-sm break-inside-avoid text-balanced leading-relaxed text-gray-600">
                    {t('Factor Images')}
                  </li>
                </ul>
              </div>

              {/* Text area */}
              <div className="flex flex-col gap-2 p-4 min-h-52 justify-between">
                <div className="flex items-center  mt-1.5 gap-2">
                  <span className="flex h-6 w-12 shrink-0 items-center justify-center rounded-full  bg-primary-button text-sm font-bold text-black">
                    ZIP
                  </span>
                  <h3 className="text-sm font-semibold text-gray-900">{t('All Data')}</h3>
                </div>
                <div className="text-sm text-balanced leading-relaxed text-gray-600">
                  {t(
                    'Includes both input and output files. The zip file can be used to re-import the project into KADE.'
                  )}
                </div>
                <DownloadAllResults />
              </div>
            </div>

            {/* -- MS WORD CARD -- */}
            <div className="flex w-[282px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              {/* Image area (click to enlarge) */}
              <div className="bg-gray-50 p-4 min-h-40 items-center justify-center flex">
                <img src={DocxIcon} className="h-[120px]" alt="docx Icon" />
              </div>

              {/* Text area */}
              <div className="flex flex-col gap-2 p-4 min-h-52 justify-between">
                <div className="flex items-center  mt-1.5 gap-2">
                  <span className="flex h-6 w-12 shrink-0 items-center justify-center rounded-full  bg-primary-button text-sm font-bold text-black">
                    DOCX
                  </span>
                  <h3 className="text-sm font-semibold text-gray-900">{t('MS Word Format')}</h3>
                </div>
                <div className="text-sm text-balanced leading-relaxed text-gray-600">
                  {t(
                    '(Optional) Bundle it with the input data into a zip file which can be used to re-import the project into KADE.'
                  )}
                </div>
                {/* <LoadCsvStatements /> */}
                <DownloadDocxFile />
              </div>
            </div>
            {/* -- EXCEL CARD -- */}
            <div className="flex w-[282px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="bg-gray-50 p-4 min-h-40 items-center justify-center flex">
                <img src={XlsxIcon} alt="xlsx Icon" className="h-[120px]" />
              </div>

              {/* Text area */}
              <div className="flex flex-col gap-2 p-4 min-h-52 justify-between">
                <div className="flex items-center  mt-1.5 gap-2">
                  <span className="flex h-6 w-12 shrink-0 items-center justify-center rounded-full  bg-primary-button text-sm font-bold text-black">
                    XLSX
                  </span>
                  <h3 className="text-sm font-semibold text-gray-900">{t('MS Excel Format')}</h3>
                </div>
                <div className="text-sm text-balanced leading-relaxed text-gray-600 min-h-20">
                  {t(
                    'Includes both input and output files. The xlsx file can be used to re-import the project into KADE.'
                  )}
                </div>
                <DownloadNewExcel />
              </div>
            </div>
            {/* -- TEXT CSV CARD -- */}
            <div className="flex w-[282px] h-92 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="bg-gray-50 p-4 min-h-40 items-center justify-center flex">
                <img src={CsvIcon} className="h-[120px]" alt="csv Icon" />
              </div>

              {/* Text area */}
              <div className="flex flex-col gap-2 p-4 min-h-52 justify-between">
                <div className="flex items-center  gap-2">
                  <span className="flex h-6 w-12 shrink-0 items-center justify-center rounded-full  bg-primary-button text-sm font-bold text-black">
                    CSV
                  </span>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {t('Comma-Separated Values Format')}
                  </h3>
                </div>
                <div className="text-sm text-balanced leading-relaxed text-gray-600">
                  {t('Safest format for long-term storage and data exchange.')}
                </div>
                <DownloadResultsAsCsv />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-row gap-[47px] items-center py-[10px] w-full h-[60px]">
          <DownloadAllResults />
          <DownloadNewExcel />
          <DownloadDocxFile />
          <DownloadResultsAsCsv />
        </div> */}
      </div>
    </>
  );
};

export default DownloadResultsButtons;
