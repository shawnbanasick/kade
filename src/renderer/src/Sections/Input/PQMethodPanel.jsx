import PQMethodStaCard from './PQMethod/PQMethodStaCard';
import PQMethodQsortsCard from './PQMethod/PQMethodQsortsCard';
import { useTranslation } from 'react-i18next';

const CsvPanel = () => {
  const { t } = useTranslation();

  return (
    <div id="pqmethodDataWindow">
      <div
        id="pqmethodDataWindowHeader"
        className="font-['Helvetica'] text-[1.5vw] font-bold h-[30px] mt-[10px]"
      >
        {t('Load both a statements STA file and Q sorts DAT file')}
      </div>
      <div
        id="pqmethodPanelWindow"
        className="grid grid-cols-[350px_350px] grid-rows-[350px_75px_120px_1fr] select-none"
      >
        <PQMethodStaCard />
        <PQMethodQsortsCard />
      </div>
    </div>
  );
};

export default CsvPanel;
