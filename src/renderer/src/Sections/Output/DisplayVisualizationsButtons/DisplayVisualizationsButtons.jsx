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

  // getState
  if (showDownloadOutputButtons && shouldDisplay) {
    return (
      <div style={{ display: 'flex' }}>
        <GeneralButton
          id="displayVisualizationsButton"
          onClick={handleDisplayViz}
          className="flex justify-center items-center h-[30px] p-1 ml-5! w-fit min-w-[270px] bg-grey-button mt-[20px]"
        >
          {t('Display Composite Factors')}
        </GeneralButton>
      </div>
    );
  }
  return null;
};

export default DisplayVisualizationsButtons;
