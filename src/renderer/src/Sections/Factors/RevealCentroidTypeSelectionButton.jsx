import GeneralButton from '../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import factorState from '../GlobalState/factorState';

const RevealCentroidTypeSelectionButton = () => {
  const { t } = useTranslation();
  // getState
  const isActive = factorState((state) => state.activeCentroidRevealButton);
  const isDisabled = factorState((state) => state.isCentroidRevealButtonDisabled);
  const updateActiveCentroidRevealButton = factorState(
    (state) => state.updateActiveCentroidRevealButton
  );
  const updateIsPcaButtonDisabled = factorState((state) => state.updateIsPcaButtonDisabled);
  const updateShowCentroidSelection = factorState((state) => state.updateShowCentroidSelection);
  const updateIsCentroidRevealButtonDisabled = factorState(
    (state) => state.updateIsCentroidRevealButtonDisabled
  );

  function handleClick() {
    updateActiveCentroidRevealButton(true);
    updateIsPcaButtonDisabled(true);
    updateShowCentroidSelection(true);
    updateIsCentroidRevealButtonDisabled(true);
  }

  return (
    <div>
      <GeneralButton
        id="displayCentroidTypes"
        $isActive={isActive}
        disabled={isDisabled}
        onClick={handleClick}
      >
        {t('Centroid Factors')}
      </GeneralButton>
    </div>
  );
};
export default RevealCentroidTypeSelectionButton;
