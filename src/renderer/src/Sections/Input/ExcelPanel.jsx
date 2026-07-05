import ExcelT1Card from './Excel/ExcelT1Card';
import ExcelT2Card from './Excel/ExcelT2Card';
import { useTranslation } from 'react-i18next';
import DownloadExampleT1 from './Excel/DownloadExampleT1';
import DownloadExampleT2 from './Excel/DownloadExampleT2';

const ExcelPanel = () => {
  const [t] = useTranslation();

  return (
    <div id="ExcelDataWindow">
      <div className="text-4xl mt-2 mb-10">{t('Excel File Input')}</div>

      <div
        id="excelPanelHeader"
        className="font-['Helvetica'] text-black text-xl font-bold h-7.5 mb-5 "
      >
        {t('Load a Type 1 OR Type 2 Spreadsheet (XLSX) File')}
      </div>
      <div
        id="excelPanelWindow"
        className="grid grid-cols-[350px_350px] grid-rows-[450px_75px_120px_1fr] select-none ml-10"
      >
        <div className="flex flex-col gap-3 justify-center items-center">
          <ExcelT1Card />
          <DownloadExampleT1 />
        </div>
        <div className="flex flex-col gap-3 justify-center items-center">
          <ExcelT2Card />
          <DownloadExampleT2 />
        </div>
      </div>
    </div>
  );
};

export default ExcelPanel;
