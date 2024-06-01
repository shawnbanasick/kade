import React from 'react';
import ScreePlot from './ScreePlot';
import DownloadSvgButtons from './DownloadSvgButtons';
import { useTranslation } from 'react-i18next';
import factorState from '../../GlobalState/factorState';
import coreState from '../../GlobalState/coreState';

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

  let maxLength = parseInt(maxLength1, 10);

  if (numQsorts < maxLength) {
    maxLength = numQsorts;
  }
  // trim data from Horst
  data.length = maxLength;

  const numFactors = Number(numFacsFromState) + 1;

  return (
    <React.Fragment>
      <h1>{t('Scree Plot')}</h1>
      <ScreePlot data={data} {...props} {...styles} numFacs={numFactors} />
      <div className="controls">
        <DownloadSvgButtons />
      </div>
    </React.Fragment>
  );
};

export default ScreeContainer;
