import LoadBuzzwordData from './LoadBuzzwordData';
import { useTranslation } from 'react-i18next';

const BuzzwordCard = () => {
  const { t } = useTranslation();

  return (
    <div className="grid auto-rows-auto justify-items-center items-center bg-white border-2 border-gray-400 h-[250px] w-[280px] rounded-[5px]">
      <div className="bg-white font-sans text-[28px] font-bold">Buzzwords</div>
      <div className="font-sans text-lg">50 {t('Statements')}</div>
      <div className="font-sans text-lg">50 {t('Participants')}</div>
      <LoadBuzzwordData />
    </div>
  );
};
export default BuzzwordCard;
