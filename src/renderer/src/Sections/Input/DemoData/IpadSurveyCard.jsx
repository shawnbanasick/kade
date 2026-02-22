import LoadIpadSurveyData from './LoadIpadSurveyData';
import { useTranslation } from 'react-i18next';

const IpadSurveyCard = () => {
  const { t } = useTranslation();

  return (
    <div className="grid auto-rows-auto text-black justify-items-center items-center bg-white border-2 border-gray-400 h-[250px] w-[280px] rounded-[5px]">
      <div className="bg-white font-sans text-[28px] font-bold">iPad Survey</div>
      <div className="font-sans text-lg">60 {t('Statements')}</div>
      <div className="font-sans text-lg">80 {t('Participants')}</div>
      <LoadIpadSurveyData />
    </div>
  );
};
export default IpadSurveyCard;
