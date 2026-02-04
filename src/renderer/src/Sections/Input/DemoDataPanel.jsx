import LipsetCard from './DemoData/LipsetCard';
import BuzzwordCard from './DemoData/BuzzwordCard';
import MotivationalCard from './DemoData/MotivationalCard';
import IpadSurveyCard from './DemoData/IpadSurveyCard';
import { useTranslation } from 'react-i18next';

const DemoDataPanel = () => {
  const { t } = useTranslation();

  return (
    <div id="demoDataWindow">
      <div className="font-['Helvetica'] text-[1.5vw] font-bold h-[30px] mt-[10px]">
        {t('Choose a demo data file')}.
      </div>
      <div className="grid grid-cols-[350px_350px] grid-rows-[320px_50px_50px_50px] select-none">
        <LipsetCard />
        <BuzzwordCard />
        <MotivationalCard />
        <IpadSurveyCard />
      </div>
    </div>
  );
};

export default DemoDataPanel;
