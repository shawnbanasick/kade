import React from 'react';
import ScreePlot from './ScreePlot';
import DownloadSvgButtons from './DownloadSvgButtons';
import { useTranslation } from 'react-i18next';
import factorState from '../../GlobalState/factorState';
import coreState from '../../GlobalState/coreState';
import TogglePaMean from './TogglePaMean';

const styles = {
  width: 800,
  height: 600,
  padding: 80,
};

const ScreeContainer = (props) => {
  const { t } = useTranslation();
  const data = factorState((state) => state.screePlotData);
  const maxLength1 = factorState((state) => state.numCentroidFactors);
  const numQsorts = coreState((state) => state.numQsorts);
  const numFacsFromState = factorState((state) => state.numCentroidFactors);
  const parallelMeans = factorState((state) => state.parallelMeans);
  const parallel95 = factorState((state) => state.parallel95);
  const displayParallelMeans = factorState((state) => state.displayParallelMeans);
  const displayParallel95 = factorState((state) => state.displayParallel95);

  let maxLength = parseInt(maxLength1, 10);

  if (numQsorts < maxLength) {
    maxLength = numQsorts;
  }
  // trim data from Horst
  data.length = maxLength;

  const numFactors = Number(numFacsFromState) + 1;

  return (
    <div className="mt-10">
      <h1>{t('Scree Plot')}</h1>
      <ScreePlot
        data={data}
        {...props}
        means={parallelMeans}
        p95={parallel95}
        showMeans={displayParallelMeans}
        showP95={displayParallel95}
        {...styles}
        numFacs={numFactors}
      />
      <div className="flex flex-row justify-center w-[80vw] h-[200px]">
        <TogglePaMean />
        <DownloadSvgButtons />
      </div>
    </div>
  );
};

export default ScreeContainer;
