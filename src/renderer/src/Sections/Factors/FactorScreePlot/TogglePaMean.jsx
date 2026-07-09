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
      <div id="toggleParallelAnalysisContainer" className="flex flex-row justify-center h-10">
        <GeneralButton
          id="toggleParallelMeans"
          className={`bg-grey-button mr-5! h-10 w-50`}
          onClick={() => updateDisplayParallelMeans(!displayParallelMeans)}
        >
          <div className="flex flex-row items-center justify-center h-7.5 gap-4">
            {displayParallelMeans ? t('Hide PA Mean') : t('Display PA Mean')}
          </div>
        </GeneralButton>
        <GeneralButton
          className={`bg-grey-button ml-5! h-10`}
          id="downloadPngButtonScree"
          onClick={() => updateDisplayParallel95(!displayParallel95)}
        >
          <div className="flex flex-row items-center justify-center h-7.5 w-55 gap-4">
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
