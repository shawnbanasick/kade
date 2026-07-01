import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';

// todo - change this back to normal button
// display rules prevent premature click now
const DisplayVisualizationsButtons = () => {
  const { t } = useTranslation();
  // hide button is only one factor selected
  const userSelectedFactors = outputState((state) => state.userSelectedFactors);
  const shouldDisplayFactorVizOptions = outputState((state) => state.shouldDisplayFactorVizOptions);
  const displayOutputTabContent = outputState((state) => state.displayOutputTabContent);

  const updateShouldDisplayFactorVizOptions = outputState(
    (state) => state.updateShouldDisplayFactorVizOptions
  );

  let shouldDisplay = true;
  if (userSelectedFactors.length < 2) {
    shouldDisplay = false;
  }
  const handleOpenVizOptions = () => {
    // getState
    const shouldShow = !shouldDisplayFactorVizOptions;
    updateShouldDisplayFactorVizOptions(shouldShow);
  };

  // getState
  const showDownloadOutputButtons = outputState((state) => state.showDownloadOutputButtons);

  if (displayOutputTabContent && shouldDisplay) {
    return (
      <>
        <div className="">
          <GeneralButton
            id="viewVisualizationsDisplayOptions"
            onClick={handleOpenVizOptions}
            className="flex justify-center items-center  h-7.5 w-fit min-w-67.5 bg-grey-button"
          >
            {shouldDisplayFactorVizOptions ? t('Hide Display Options') : t('View Display Options')}
          </GeneralButton>
        </div>
      </>
    );
  }
};

export default DisplayVisualizationsButtons;
