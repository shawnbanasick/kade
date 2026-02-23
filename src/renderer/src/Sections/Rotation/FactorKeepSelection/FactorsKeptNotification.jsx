import { useTranslation } from 'react-i18next';
import rotationState from '../../GlobalState/rotationState';

const FactorsKeptNotification = () => {
  const { t } = useTranslation();

  const numFactorsKept = rotationState((state) => state.numFactorsKeptForRot);
  const shouldDisplayDiv = rotationState((state) => state.shouldDisplayFacKept);

  return (
    <div className={shouldDisplayDiv ? 'visible' : 'hidden'}>
      <div className="factorsKeptDiv mt-[20px] text-[25px] leading-[1.4em]">
        {`${t('Factors kept for rotation')}: `} {numFactorsKept}
        <br />
        <br />
        <br />
        {t('Click the Varimax or Judgmental tabs to rotate factors')}
      </div>
    </div>
  );
};

export default FactorsKeptNotification;
