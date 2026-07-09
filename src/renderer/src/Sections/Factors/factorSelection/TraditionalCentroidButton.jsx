import factorState from '../../GlobalState/factorState';
import GeneralButton from './../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';

const TraditionalCentroidButton = () => {
  const { t } = useTranslation();
  // getState
  const isActive = factorState((state) => state.activeTraditionalCentroidFactorButton);
  const isDisabled = factorState((state) => state.isTraditionalCentroidDisabled);
  const updateShowNumberOfCentroidFacToExtract = factorState(
    (state) => state.updateShowNumberOfCentroidFacToExtract
  );
  const updateActiveTraditionalCentroidFactorButton = factorState(
    (state) => state.updateActiveTraditionalCentroidFactorButton
  );
  const updateIsTraditionalCentroidDisabled = factorState(
    (state) => state.updateIsTraditionalCentroidDisabled
  );
  const updateIsHorst55Disabled = factorState((state) => state.updateIsHorst55Disabled);

  const handleOnclick = () => {
    updateShowNumberOfCentroidFacToExtract(true);
    updateActiveTraditionalCentroidFactorButton(true);
    updateIsTraditionalCentroidDisabled(true);
    updateIsHorst55Disabled(true); // // }, 500);
  };
  return (
    <GeneralButton
      id="traditionalCentroidButton"
      disabled={isDisabled}
      onClick={handleOnclick}
      className={`h-7.5 w-62.5 ${isActive ? 'bg-primary-button' : 'bg-grey-button'}`}
    >
      Brown {t('Centroid Factors')}
    </GeneralButton>
  );
};

export default TraditionalCentroidButton;
