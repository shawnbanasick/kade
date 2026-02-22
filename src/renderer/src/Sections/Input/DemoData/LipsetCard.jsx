import LoadLipsetData from './LoadLipsetData';
import { useTranslation } from 'react-i18next';

const LipsetCard = () => {
  const { t } = useTranslation();
  return (
    <div className="grid auto-rows-auto text-black justify-items-center items-center bg-white border-2 border-gray-400 h-[250px] w-[280px] rounded-[5px]">
      <div className="bg-white font-sans text-[28px] font-bold">Lipset</div>
      <div className="font-sans text-lg">33 {t('Statements')}</div>
      <div className="font-sans text-lg">9 {t('Participants')}</div>
      <LoadLipsetData />
    </div>
  );
};
export default LipsetCard;
