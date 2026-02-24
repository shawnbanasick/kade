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
    <GeneralButton
      id="displayCentroidTypes"
      disabled={false}
      onClick={handleClick}
      className={`h-[30px] ${isActive ? 'bg-primary-button' : 'bg-grey-button'}`}
    >
      {t('Centroid Factors')}
    </GeneralButton>
  );
};
export default RevealCentroidTypeSelectionButton;
