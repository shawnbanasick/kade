import { useTranslation } from 'react-i18next';
import CsvStatementCard from './CSV/CsvStatementCard';
import CsvSortsCard from './CSV/CsvSortsCard';
import ProjectNameInput from './CSV/ProjectNameInput';
import RadioExampleRadioGroup from './CSV/ForcedUnforcedRadio';
import QsortDesignInputElement from './CSV/QsortDesignInputElement';

const CsvPanel = () => {
  const { t } = useTranslation();

  return (
    <div id="csvDataWindow">
      <div
        id="csvPanelHeader"
        className="font-['Helvetica'] text-black text-[1.5vw] font-bold h-[30px] mb-5"
      >
        {t('Load both a statements file and a Q sorts CSV file')}
      </div>
      <div
        id="csvPanelWindow"
        className="grid grid-cols-[350px_350px] grid-rows-[350px_75px_15px_50px_1fr] select-none gap-10 ml-10"
      >
        <CsvStatementCard id="csvStatementCard" />
        <CsvSortsCard id="csvSortsCard" />
        <ProjectNameInput id="projectNameInput" />
        <RadioExampleRadioGroup id="forcedUnforcedRadio" />
        <QsortDesignInputElement id="qsortDesignInputElement" />
      </div>
    </div>
  );
};

export default CsvPanel;
