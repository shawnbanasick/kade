import KandedCard from './Kanded/ExcelT3Card';
import { useTranslation } from 'react-i18next';

const KandedPanel = () => {
  const { t } = useTranslation();

  return (
    <div id="ExcelKadeDataWindow">
      <div
        id="excelKadePanelHeader"
        className="font-['Helvetica'] text-[1.5vw] font-bold h-[30px] mt-[10px]"
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
