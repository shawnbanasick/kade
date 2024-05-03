import React from 'react';
import { view } from '@risingstack/react-easy-state';
import ScreePlot from './ScreePlot';
import DownloadSvgButtons from './DownloadSvgButtons';
import { useTranslation } from 'react-i18next';
import getFactorState from '../../GlobalState/getFactorState';
import getCoreState from '../../GlobalState/getCoreState';

const styles = {
  width: 800,
  height: 600,
  padding: 80
};

const ScreeContainer = (props) => {
  const { t } = useTranslation();

  // get State and adjust if number of sorts is less than 8

  const data = getFactorState('screePlotData');
  const maxLength1 = getFactorState('numCentroidFactors');
  let maxLength = parseInt(maxLength1, 10);
  const numQsorts = getCoreState('numQsorts');

  if (numQsorts < maxLength) {
    maxLength = numQsorts;
  }
  // trim data from Horst
  data.length = maxLength;

  const numFacsFromState = getFactorState('numCentroidFactors');
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

export default view(ScreeContainer);
