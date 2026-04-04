import downloadPngImage from './downloadPngImage';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import factorState from '../../GlobalState/factorState';

const TogglePaMean = () => {
  const { t } = useTranslation();
  const updateDisplayParallelMeans = factorState((state) => state.updateDisplayParallelMeans);
  const displayParallelMeans = factorState((state) => state.displayParallelMeans);
  const displayParallel95 = factorState((state) => state.displayParallel95);
  const updateDisplayParallel95 = factorState((state) => state.updateDisplayParallel95);

  return (
    <div className="flex flex-row justify-center mt-[40px] mr-10">
      <GeneralButton
        id="toggleParallelMeans"
        className={`bg-grey-button mr-[20px]! h-[40px]  ${displayParallelMeans ? 'bg-primary-button' : 'bg-grey-button'}`}
        onClick={() => updateDisplayParallelMeans(!displayParallelMeans)}
      >
        <div className="flex flex-row items-center h-[30px] gap-4">
          {t('Toggle Display PA Mean')}
        </div>
      </GeneralButton>
      <GeneralButton
        className={`bg-grey-button ml-[20px]! h-[40px]  ${displayParallel95 ? 'bg-primary-button' : 'bg-grey-button'}`}
        id="downloadPngButtonScree"
        onClick={() => updateDisplayParallel95(!displayParallel95)}
      >
        <div className="flex flex-row items-center h-[30px] gap-4">
          {t('Toggle Display PA 95th Percentile')}
        </div>
      </GeneralButton>
    </div>
  );
};
export default TogglePaMean;
