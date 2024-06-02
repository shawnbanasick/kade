import styled from 'styled-components';
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
    updateDisabledCentroidFactorButton(true);
    updateActiveHorst55CentroidButton(true);
    updateIsHorst55Disabled(true);
    updateIsTraditionalCentroidDisabled(true);
    updateIsTuckerMacCallumCentroidDisabled(true);
  };

  return (
    <HorstButton
      as={GeneralButton}
      id="noFacSelectedModalButton"
      isActive={isActive}
      disabled={isDisabled}
      onClick={handleOnclick}
    >
      Horst 5.5 <br /> {t('Centroid Factors')}
    </HorstButton>
  );
};

export default Horst55CentroidModal;

const HorstButton = styled.div`
  margin-right: 15px;
`;
