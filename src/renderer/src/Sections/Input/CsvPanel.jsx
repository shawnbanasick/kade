import { useTranslation } from 'react-i18next';
import CsvStatementCard from './CSV/CsvStatementCard';
import CsvSortsCard from './CSV/CsvSortsCard';

const CsvPanel = () => {
  const { t } = useTranslation();

  return (
    <div id="csvDataWindow">
      <div
        id="csvPanelHeader"
        className="font-['Helvetica'] text-[1.5vw] font-bold h-[30px] mt-[10px]"
      >
        {t('Load both a statements file and a Q sorts CSV file')}
      </div>
      <div
        id="csvPanelWindow"
        className="grid grid-cols-[350px_350px] grid-rows-[350px_75px_120px_1fr] select-none"
      >
        <CsvStatementCard id="csvStatementCard" />
        <CsvSortsCard id="csvSortsCard" />
      </div>
    </div>
  );
};

export default CsvPanel;
