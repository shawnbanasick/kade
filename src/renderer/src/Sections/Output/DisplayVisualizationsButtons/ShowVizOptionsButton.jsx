import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';

// todo - change this back to normal button
// display rules prevent premature click now
const DisplayVisualizationsButtons = () => {
  const { t } = useTranslation();
  // hide button is only one factor selected
  const userSelectedFactors = outputState((state) => state.userSelectedFactors);
  let shouldDisplay = true;
  if (userSelectedFactors.length < 2) {
    shouldDisplay = false;
  }
  const handleOpenVizOptions = () => {
    // getState
    const shouldDisplayFactorVizOptions = outputState.shouldDisplayFactorVizOptions;
    const shouldShow = !shouldDisplayFactorVizOptions;
    outputState.shouldDisplayFactorVizOptions = shouldShow;
  };

  // getState
  const showDownloadOutputButtons = outputState((state) => state.showDownloadOutputButtons);
  if (showDownloadOutputButtons && shouldDisplay) {
    return (
      <div style={{ display: 'flex' }}>
        <GeneralButton id="viewVisualizationsDisplayOptions" onClick={handleOpenVizOptions}>
          {t('View Display Options')}
        </GeneralButton>
      </div>
    );
  }
  return (
    <h2 style={{ marginTop: 50, marginLeft: 50 }}>
      {t('Select factors for output in the Options tab')}
    </h2>
  );
};

export default DisplayVisualizationsButtons;
