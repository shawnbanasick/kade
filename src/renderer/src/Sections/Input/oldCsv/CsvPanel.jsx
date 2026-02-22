import CsvQsortsCard from './CsvQsortsCard';
import ProjectNameInput from '../CSV/ProjectNameInput';
import CsvStatementCard from '../CSV/CsvStatementCard';
import ForcedUnforcedRadio from './ForcedUnforcedRadio';
import CsvSuccessfulLoadBar from './CsvSuccessfulLoadBar';
import QsortDesignInputElement from './QsortDesignInputElement';
import { useTranslation } from 'react-i18next';
import CsvDataErrorCheckButton from './CsvDataErrorCheckButton';

const CsvPanel = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white overflow-hidden">
      <div className="font-[Helvetica] text-[1.5vw] font-bold h-[30px] mt-[10px] select-none">
        {t('Load both a statements TXT file and Q sorts CSV file')}
      </div>
      <div className="grid grid-cols-[350px_400px] grid-rows-[320px_50px_1fr] select-none">
        <CsvStatementCard />
        <CsvQsortsCard />
        <ProjectNameInput />
      </div>
      <ForcedUnforcedRadio number={'4.'} />
      <QsortDesignInputElement number={'5.'} />
      <CsvDataErrorCheckButton number={'6.'} />
      <CsvSuccessfulLoadBar />
    </div>
  );
};

export default CsvPanel;
