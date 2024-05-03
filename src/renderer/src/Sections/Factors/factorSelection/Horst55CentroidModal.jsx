import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
import React from 'react';
import GeneralButton from '../../../Utils/GeneralButton';
import factorState from '../../GlobalState/factorState';
import { useTranslation } from 'react-i18next';
import getFactorState from '../../GlobalState/getFactorState';

const Horst55CentroidModal = () => {
  const { t } = useTranslation();

  const handleOnclick = () => {
    factorState.showUseHorstLimit = true;
    factorState.isPcaButtonDisabled = true;
    factorState.disabledCentroidFactorButton = true;
    factorState.activeHorst55CentroidButton = true;
    factorState.isHorst55Disabled = true;
    factorState.isTraditionalCentroidDisabled = true;
    factorState.isTuckerMacCallumCentroidDisabled = true;
  };
  // const isCentroidLoading = getFactorState("isCentroidLoading");
  // loading={isCentroidLoading}

  // getState
  const isActive = getFactorState('activeHorst55CentroidButton');
  const isDisabled = getFactorState('isHorst55Disabled');

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

export default view(Horst55CentroidModal);

const HorstButton = styled.div`
  margin-right: 15px;
`;
