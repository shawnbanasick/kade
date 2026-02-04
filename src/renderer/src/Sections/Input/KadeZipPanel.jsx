import ZipDataCard from './Zip/ZipDataCard';
import { useTranslation } from 'react-i18next';

const KadeZipPanel = () => {
  const { t } = useTranslation();

  return (
    <div id="ExcelKadeZipDataWindow">
      <div className="font-['Helvetica'] text-[1.5vw] font-bold h-[30px] mt-[10px]">
        {t('Load a KADE or Ken-Q Analysis (web) Zip output file')}
      </div>
      <div
        id="kadeZipPanelWindow"
        className="grid grid-cols-[350px_350px] grid-rows-[350px_75px_120px_1fr] select-none"
      >
        <ZipDataCard />
      </div>
    </div>
  );
};

export default KadeZipPanel;
