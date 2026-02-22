import GeneralButton from '../../../Utils/GeneralButton';
import tuckerDispatcher from '../centroidLogic/tuckerLogic/tuckerDispatcher';
import { useTranslation } from 'react-i18next';
import appState from '../../GlobalState/appState';
import factorState from '../../GlobalState/factorState';

const TuckerMacCallumCentroidButton = () => {
  const { t } = useTranslation();
  // getState
  const isActive = factorState((state) => state.activeTuckerMacCallumCentroidButton);
  const isDisabled = factorState((state) => state.isTuckerMacCallumCentroidDisabled);
  const updateShowCentroidSpinner = factorState((state) => state.updateShowCentroidSpinner);
  const updateShowUnrotatedFactorTable = factorState(
    (state) => state.updateShowUnrotatedFactorTable
  );
  const updateShowEigenvaluesTable = factorState((state) => state.updateShowEigenvaluesTable);
  const updateShowScreePlot = factorState((state) => state.updateShowScreePlot);
  const updateShowKeepFacForRotButton = factorState((state) => state.updateShowKeepFacForRotButton);
  const updateIsFactorsButtonGreen = appState((state) => state.updateIsFactorsButtonGreen);
  const updateActiveTuckerMacCallumCentroidButton = factorState(
    (state) => state.updateActiveTuckerMacCallumCentroidButton
  );
  const updateDisabledCentroidFactorButton = factorState(
    (state) => state.updateDisabledCentroidFactorButton
  );
  const updateIsPcaButtonDisabled = factorState((state) => state.updateIsPcaButtonDisabled);
  const updateIsTraditionalCentroidDisabled = factorState(
    (state) => state.updateIsTraditionalCentroidDisabled
  );
  const updateIsHorst55Disabled = factorState((state) => state.updateIsHorst55Disabled);
  const updateIsTuckerMacCallumCentroidDisabled = factorState(
    (state) => state.updateIsTuckerMacCallumCentroidDisabled
  );
  const updateTuckerMacCallumCentroidButton = factorState(
    (state) => state.updateTuckerMacCallumCentroidButton
  );
  const updateIsCentroidFacSelectDisabled = factorState(
    (state) => state.updateIsCentroidFacSelectDisabled
  );

  const handleOnclick = () => {
    updateShowCentroidSpinner(true);

    tuckerDispatcher();
    updateActiveTuckerMacCallumCentroidButton(true);
    updateShowCentroidSpinner(false);
    updateShowUnrotatedFactorTable(true);
    updateShowEigenvaluesTable(true);
    updateShowScreePlot(true);
    updateShowKeepFacForRotButton(true);
    updateDisabledCentroidFactorButton(true);
    updateIsPcaButtonDisabled(true);
    updateIsTraditionalCentroidDisabled(true);
    updateIsHorst55Disabled(true);
    updateIsTuckerMacCallumCentroidDisabled(true);
    updateTuckerMacCallumCentroidButton(true);
    updateIsCentroidFacSelectDisabled(true);
    updateIsFactorsButtonGreen(true);
  };

  return (
    <GeneralButton
      id="tuckerButton"
      $isActive={isActive}
      disabled={isDisabled}
      onClick={handleOnclick}
      className={` ${isActive ? 'bg-primary-button' : 'bg-grey-button'} shadow-[0_2px_2px_0_black] hover:shadow-[0_2px_2px_0_black] active:shadow-[0_1px_1px_0_black] active:ml-[3px] active:translate-y-[1px]`}
    >
      Tucker and MacCallum <br /> {t('Centroid Factors')}
    </GeneralButton>
  );
};

export default TuckerMacCallumCentroidButton;
