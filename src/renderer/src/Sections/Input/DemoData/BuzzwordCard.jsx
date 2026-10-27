import LoadBuzzwordData from './LoadBuzzwordData';
import { useTranslation } from 'react-i18next';

const BuzzwordCard = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row flex-wrap gap-4 justify-between pl-6 pr-6 items-center bg-white border-2 border-gray-400 h-[90px] w-[740px] rounded-[5px]">
      <div className="bg-white font-sans text-[28px] font-bold">Buzzwords</div>
      <div className="font-sans text-lg">50 {t('Statements')}</div>
      <div className="font-sans text-lg">50 {t('Participants')}</div>
      <LoadBuzzwordData />
    </div>
  );
};
export default BuzzwordCard;
