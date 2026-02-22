import LoadMotivationalData from './LoadMotivationalData';
import { useTranslation } from 'react-i18next';

const MotivationalCard = () => {
  const { t } = useTranslation();

  return (
    <div className="grid auto-rows-auto text-black justify-items-center items-center bg-white border-2 border-gray-400 h-[250px] w-[280px] rounded-[5px]">
      <div className="bg-white font-sans text-[28px] font-bold">Motivational</div>
      <div className="font-sans text-lg">80 {t('Statements')}</div>
      <div className="font-sans text-lg">40 {t('Participants')}</div>
      <LoadMotivationalData />
    </div>
  );
};
export default MotivationalCard;
