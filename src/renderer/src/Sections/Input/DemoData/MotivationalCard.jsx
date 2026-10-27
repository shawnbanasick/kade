import LoadMotivationalData from './LoadMotivationalData';
import { useTranslation } from 'react-i18next';

const MotivationalCard = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row flex-wrap gap-4 justify-between pr-6 pl-6 items-center bg-white border-2 border-gray-400 h-[90px] w-[740px] rounded-[5px]">
      <div className="bg-white font-sans text-[28px] font-bold">Motivational</div>
      <div className="font-sans text-lg">80 {t('Statements')}</div>
      <div className="font-sans text-lg">40 {t('Participants')}</div>
      <LoadMotivationalData />
    </div>
  );
};
export default MotivationalCard;
