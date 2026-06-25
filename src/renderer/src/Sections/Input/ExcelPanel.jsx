import ExcelT1Card from './Excel/ExcelT1Card';
import ExcelT2Card from './Excel/ExcelT2Card';
import { useTranslation } from 'react-i18next';

const ExcelPanel = () => {
  const [t] = useTranslation();

  return (
    <div id="ExcelDataWindow">
      <div className="text-5xl mt-2 mb-10">{t('Excel File Input')}</div>

      <div
        id="excelPanelHeader"
        className="font-['Helvetica'] text-black text-xl font-bold h-7.5 mb-5 "
      >
        {t('Load a Type 1 OR Type 2 Spreadsheet (XLSX) File')}
      </div>
      <div
        id="excelPanelWindow"
        className="grid grid-cols-[350px_350px] grid-rows-[350px_75px_120px_1fr] select-none ml-10"
      >
        <ExcelT1Card />
        <ExcelT2Card />
      </div>
    </div>
  );
};

export default ExcelPanel;
