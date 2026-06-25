import PQMethodStaCard from './PQMethod/PQMethodStaCard';
import PQMethodQsortsCard from './PQMethod/PQMethodQsortsCard';
import { useTranslation } from 'react-i18next';

const PQMethodPanel = () => {
  const { t } = useTranslation();

  return (
    <div id="pqmethodDataWindow">
      <div className="text-5xl mt-2 mb-10">{t('PQ Method File Input')}</div>

      <div
        id="pqmethodDataWindowHeader"
        className="font-['Helvetica'] text-black  text-xl font-bold h-7.5 mb-5"
      >
        {t('Load both a statements STA file and Q sorts DAT file')}
      </div>
      <div
        id="pqmethodPanelWindow"
        className="grid grid-cols-[350px_350px] gap-10 grid-rows-[350px_75px_120px_1fr] select-none ml-10"
      >
        <PQMethodStaCard />
        <PQMethodQsortsCard />
      </div>
    </div>
  );
};

export default PQMethodPanel;
