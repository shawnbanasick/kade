import { useTranslation } from 'react-i18next';
import factorState from '../../GlobalState/factorState';

const HorstWarningMessage = () => {
  const { t } = useTranslation();
  const showHorstWarningMessage = factorState((state) => state.didNotConverge);
  const horstIterations = factorState((state) => state.horstIterations);

  if (!showHorstWarningMessage) return null;

  return (
    <div className="mb-[50px] text-[20px] bg-[#ffff00] min-w-[300px] px-[20px] py-[3px] w-max border-2 border-black">
      {`${t('No convergence')}: ${horstIterations} ${t('iterations')}`}
    </div>
  );
};

export default HorstWarningMessage;
