import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';

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

  const displayOutputTabContent = outputState((state) => state.displayOutputTabContent);

  if (!displayOutputTabContent) {
    return (
      <h2 className="mt-15 text-2xl ml-12.5">
        {t('Select factors for output in the Options tab')}
      </h2>
    );
  }

  // getState
  if (showDownloadOutputButtons && shouldDisplay) {
    return (
      <div className="flex flex-col">
        <GeneralButton
          id="displayVisualizationsButton"
          onClick={handleDisplayViz}
          className="flex justify-center items-center h-7.5 p-1 w-fit min-w-67.5 bg-grey-button"
        >
          {displayFactorVisualizations
            ? t('Hide Composite Factors')
            : t('Display Composite Factors')}
        </GeneralButton>
      </div>
    );
  }
  return null;
};

export default DisplayVisualizationsButtons;
