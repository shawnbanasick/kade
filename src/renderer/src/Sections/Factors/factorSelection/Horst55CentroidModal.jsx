import GeneralButton from '../../../Utils/GeneralButton';
import factorState from '../../GlobalState/factorState';
import { useTranslation } from 'react-i18next';

const Horst55CentroidModal = () => {
  const { t } = useTranslation();
  // getState
  const isActive = factorState((state) => state.activeHorst55CentroidButton);
  const isDisabled = factorState((state) => state.isHorst55Disabled);
  const updateShowUseHorstLimit = factorState((state) => state.updateShowUseHorstLimit);
  const updateIsPcaButtonDisabled = factorState((state) => state.updateIsPcaButtonDisabled);
  const updateDisabledCentroidFactorButton = factorState(
    (state) => state.updateDisabledCentroidFactorButton
  );
  const updateActiveHorst55CentroidButton = factorState(
    (state) => state.updateActiveHorst55CentroidButton
  );
  const updateIsHorst55Disabled = factorState((state) => state.updateIsHorst55Disabled);
  const updateIsTraditionalCentroidDisabled = factorState(
    (state) => state.updateIsTraditionalCentroidDisabled
  );
  const updateIsTuckerMacCallumCentroidDisabled = factorState(
    (state) => state.updateIsTuckerMacCallumCentroidDisabled
  );

  const handleOnclick = () => {
    updateShowUseHorstLimit(true);
    updateIsPcaButtonDisabled(true);
    // updateDisabledCentroidFactorButton(true);
    updateActiveHorst55CentroidButton(true);
    updateIsHorst55Disabled(true);
    updateIsTraditionalCentroidDisabled(true);
    updateIsTuckerMacCallumCentroidDisabled(true);
  };

  console.log(isActive);

  return (
    <GeneralButton
      id="noFacSelectedModalButton"
      disabled={isDisabled}
      onClick={handleOnclick}
      className={`${isActive ? 'bg-primary-button' : 'bg-grey-button'} ml-8!`}
    >
      Horst 5.5 <br /> {t('Centroid Factors')}
    </GeneralButton>
  );
};

export default Horst55CentroidModal;
