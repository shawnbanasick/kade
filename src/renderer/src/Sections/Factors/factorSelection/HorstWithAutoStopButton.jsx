import styled from 'styled-components';
import GeneralButton from '../../../Utils/GeneralButton';
import horstDispatcher from '../centroidLogic/horst55Logic/horstDispatcher';
import factorState from '../../GlobalState/factorState';
import appState from '../../GlobalState/appState';

const Horst55CentroidModal = () => {
  const updateIsCentroidLoading = factorState((state) => state.updateIsCentroidLoading);
  const updateShowUnrotatedFactorTable = factorState(
    (state) => state.updateShowUnrotatedFactorTable
  );
  const updateShowEigenvaluesTable = factorState((state) => state.updateShowEigenvaluesTable);
  const updateShowScreePlot = factorState((state) => state.updateShowScreePlot);
  // const updateKeepFacForRotButton = factorState((state) => state.updateKeepFacForRotButton);
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
  const updateIsFactorsButtonGreen = appState((state) => state.updateIsFactorsButtonGreen);
  const updateShowKeepFacForRotButton = factorState((state) => state.updateShowKeepFacForRotButton);
  const updateIsCentroidFacSelectDisabled = factorState(
    (state) => state.updateIsCentroidFacSelectDisabled
  );

  const handleOnclick = () => {
    updateIsCentroidLoading(true);

    horstDispatcher();

    updateShowUnrotatedFactorTable(true);
    updateShowEigenvaluesTable(true);
    updateShowScreePlot(true);
    updateIsPcaButtonDisabled(true);
    updateDisabledCentroidFactorButton(true);
    updateShowKeepFacForRotButton(true);
    updateIsFactorsButtonGreen(true);
    updateActiveHorst55CentroidButton(true);
    updateIsTraditionalCentroidDisabled(true);
    updateIsHorst55Disabled(true);
    updateIsTuckerMacCallumCentroidDisabled(true);
    updateIsCentroidFacSelectDisabled(true);
  };

  // getState
  const isActive = factorState((state) => state.activeHorst55CentroidButton);
  const isDisabled = factorState((state) => state.isHorst55Disabled);

  return (
    <HorstButton
      as={GeneralButton}
      id="noFacSelectedModalButton"
      $isActive={isActive}
      disabled={isDisabled}
      onClick={handleOnclick}
    >
      Use Horst With
      <br />
      Auto-Stop
    </HorstButton>
  );
};

export default Horst55CentroidModal;

const HorstButton = styled.div`
  margin-right: 15px;
`;
