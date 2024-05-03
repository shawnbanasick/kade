import React from 'react';
import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
import GeneralButton from '../../../Utils/GeneralButton';
import factorState from '../../GlobalState/factorState';
import appState from '../../GlobalState/appState';
import horstDispatcher from '../centroidLogic/horst55Logic/horstDispatcher';
import getFactorState from '../../GlobalState/getFactorState';

const Horst55CentroidModal = () => {
  const handleOnclick = () => {
    factorState.isCentroidLoading = true;

    horstDispatcher();

    // factorState.numFacsForTableWidth = numFactors;
    factorState.showUnrotatedFactorTable = true;
    factorState.showEigenvaluesTable = true;
    factorState.showScreePlot = true;
    // factorState.activeCentroidRevealButton = true;
    factorState.isPcaButtonDisabled = true;
    factorState.disabledCentroidFactorButton = true;
    factorState.showKeepFacForRotButton = true;
    appState.isFactorsButtonGreen = true;
    factorState.activeHorst55CentroidButton = true;
    factorState.isTraditionalCentroidDisabled = true;
    factorState.isHorst55Disabled = true;
    factorState.isTuckerMacCallumCentroidDisabled = true;
    factorState.isCentroidFacSelectDisabled = true;
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
      onClick={this.handleOnclick}
    >
      Use Horst With
      <br />
      Auto-Stop
    </HorstButton>
  );
};

export default view(Horst55CentroidModal);

const HorstButton = styled.div`
  margin-right: 15px;
`;
