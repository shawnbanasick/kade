import React from 'react';

import GeneralButton from '../../../Utils/GeneralButton';
import outputState from '../../GlobalState/outputState';
import { useTranslation } from 'react-i18next';
import getOutputState from '../../GlobalState/getOutputState';

// todo - change this back to normal button
// display rules prevent premature click now
const DisplayVisualizationsButtons = () => {
  // hide button is only one factor selected
  const userSelectedFactors = getOutputState('userSelectedFactors');
  let shouldDisplay = true;
  if (userSelectedFactors.length < 2) {
    shouldDisplay = false;
  }
  const { t } = useTranslation();
  const handleDisplayViz = () => {
    // getState
    const displayFactorVisualizations = getOutputState('displayFactorVisualizations');
    const shouldShow = !displayFactorVisualizations;
    outputState.displayFactorVisualizations = shouldShow;
  };

  // getState
  const showDownloadOutputButtons = getOutputState('showDownloadOutputButtons');
  if (showDownloadOutputButtons && shouldDisplay) {
    return (
      <div style={{ display: 'flex' }}>
        <GeneralButton id="displayVisualizationsButton" onClick={handleDisplayViz}>
          {t('Display Composite Factors')}
        </GeneralButton>
      </div>
    );
  }
  return null;
};

export default DisplayVisualizationsButtons;
