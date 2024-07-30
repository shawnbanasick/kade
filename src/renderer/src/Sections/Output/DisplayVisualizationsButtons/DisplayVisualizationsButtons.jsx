import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';

// todo - change this back to normal button
// display rules prevent premature click now
const DisplayVisualizationsButtons = () => {
  // hide button is only one factor selected
  const userSelectedFactors = outputState((state) => state.userSelectedFactors);
  const displayFactorVisualizations = outputState((state) => state.displayFactorVisualizations);
  const showDownloadOutputButtons = outputState((state) => state.showDownloadOutputButtons);
  const updateDisplayFactorVisualizations = outputState(
    (state) => state.updateDisplayFactorVisualizations
  );

  let shouldDisplay = true;
  if (userSelectedFactors.length < 2) {
    shouldDisplay = false;
  }
  const { t } = useTranslation();
  const handleDisplayViz = () => {
    // getState
    const shouldShow = !displayFactorVisualizations;
    updateDisplayFactorVisualizations(shouldShow);
  };

  // getState
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
