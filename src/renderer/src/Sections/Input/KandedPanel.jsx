import KandedCard from './Kanded/ExcelT3Card';
import { useTranslation } from 'react-i18next';

const KandedPanel = () => {
  const { t } = useTranslation();

  return (
    <div id="ExcelKadeDataWindow">
      <div className="text-4xl mt-2 mb-10">{t('KADE Excel File Input')}</div>

      <div
        id="excelKadePanelHeader"
        className="font-['Helvetica'] text-black text-xl font-bold h-7.5 mb-5"
      >
        {t('Load a KADE or Ken-Q Analysis (web) XLSX output file')}
      </div>
      <div id="excelKadePanelCardHolder">
        <KandedCard />
        {/*<ForcedUnforcedRadio startingRow={2} number={'2.'} />
        <ZipErrorCheckButton number={'3.'} gridRow={3} /> */}
      </div>
    </div>
  );
};

export default KandedPanel;
