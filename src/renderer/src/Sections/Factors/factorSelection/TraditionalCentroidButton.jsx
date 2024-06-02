import styled from 'styled-components';
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
    <TradButton
      as={GeneralButton}
      id="traditionalCentroidButton"
      isActive={isActive}
      disabled={isDisabled}
      onClick={handleOnclick}
    >
      Brown <br /> {t('Centroid Factors')}
    </TradButton>
  );
};

export default TraditionalCentroidButton;

const TradButton = styled.div`
  margin-left: 70px;
  margin-right: 5px;
`;
