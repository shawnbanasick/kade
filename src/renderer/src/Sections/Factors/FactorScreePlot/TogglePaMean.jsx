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
  const isActive = factorState((state) => state.activeCentroidRevealButton);

  if (!isActive) {
    return (
      <div className="flex flex-row justify-center mt-[40px] mr-10">
        <GeneralButton
          id="toggleParallelMeans"
          className={`bg-grey-button mr-[20px]! h-[40px] w-[200px]`}
          onClick={() => updateDisplayParallelMeans(!displayParallelMeans)}
        >
          <div className="flex flex-row items-center justify-center h-[30px] gap-4">
          {displayParallelMeans ? t('Hide PA Mean') : t('Display PA Mean')}
          </div>
        </GeneralButton>
        <GeneralButton
          className={`bg-grey-button ml-[20px]! h-[40px]`}
          id="downloadPngButtonScree"
          onClick={() => updateDisplayParallel95(!displayParallel95)}
        >
          <div className="flex flex-row items-center justify-center h-[30px] w-[220px] gap-4">
          {displayParallel95 ? t('Hide PA 95th Percentile') : t('Display PA 95th Percentile')}
          </div>
        </GeneralButton>
      </div>
    );
  } else {
    return null;
  }
};
export default TogglePaMean;
