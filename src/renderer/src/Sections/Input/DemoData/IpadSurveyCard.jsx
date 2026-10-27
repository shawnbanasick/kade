import LoadIpadSurveyData from './LoadIpadSurveyData';
import { useTranslation } from 'react-i18next';

const IpadSurveyCard = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row flex-wrap gap-4 justify-between pr-6 pl-6 items-center bg-white border-2 border-gray-400 h-[90px] w-[740px] rounded-[5px]">
      {' '}
      <div className="bg-white font-sans text-[28px] font-bold">iPad Survey</div>
      <div className="font-sans text-lg">60 {t('Statements')}</div>
      <div className="font-sans text-lg">80 {t('Participants')}</div>
      <LoadIpadSurveyData />
    </div>
  );
};
export default IpadSurveyCard;
