import React from 'react';
import GeneralButton from '../../../Utils/GeneralButton';
import horstDispatcher from '../centroidLogic/horst55Logic/horstDispatcher';
import HorstNumberInput from './HorstNumberInput';
import { useTranslation } from 'react-i18next';
import appState from '../../GlobalState/appState';
import factorState from '../../GlobalState/factorState';
import rotationState from '../../GlobalState/rotationState';

const UseHorstAutoStop = () => {
  const { t } = useTranslation();

  const showUseHorstIterationSetup = factorState((state) => state.showUseHorstIterationSetup);
  const horstExtractActive = factorState((state) => state.horstExtractActive);
  const horstExtractDisabled = factorState((state) => state.horstExtractDisabled);
  const horstIterations = factorState((state) => state.horstIterations);
  const horstThresholdLevel = factorState((state) => state.horstThresholdLevel);
  const updateShowCentroidSpinner = factorState((state) => state.updateShowCentroidSpinner);
  const updateShowUnrotatedFactorTable = factorState(
    (state) => state.updateShowUnrotatedFactorTable
  );
  const updateShowEigenvaluesTable = factorState((state) => state.updateShowEigenvaluesTable);
  const updateShowScreePlot = factorState((state) => state.updateShowScreePlot);
  const updateHorstExtractActive = factorState((state) => state.updateHorstExtractActive);
  const updateHorstExtractDisabled = factorState((state) => state.updateHorstExtractDisabled);
  const updateIsFactorsButtonGreen = appState((state) => state.updateIsFactorsButtonGreen);
  const updateShowKeepFacForRotButton = rotationState(
    (state) => state.updateShowKeepFacForRotButton
  );

  let shouldUseHorstLimit = false;

  const handleClick = async () => {
    shouldUseHorstLimit = true;
    await updateShowCentroidSpinner(true);
    await horstDispatcher(shouldUseHorstLimit);
    await updateShowCentroidSpinner(false);
    await updateShowUnrotatedFactorTable(true);
    await updateShowEigenvaluesTable(true);
    await updateShowScreePlot(true);
    await updateShowKeepFacForRotButton(true);
    await updateIsFactorsButtonGreen(true);
    await updateHorstExtractActive(true);
    await updateHorstExtractDisabled(true);
  };

  if (!showUseHorstIterationSetup) return null;

  return (
    <React.Fragment>
      <div className="block mt-[25px] ml-[70px] mr-[10px] w-[350px]">
        {`${t('Horst Limit Iteration Parameters')}`}
      </div>
      <div className="block ml-[70px] h-[1px] w-[400px] border-0 border-t border-t-black p-0" />
      <div className="flex mt-[25px] ml-[70px] flex-row justify-start items-center">
        <span className="mr-[10px] w-[220px]">{`${t('Number of Iterations')}:  `}</span>
        <HorstNumberInput
          style={{ width: 100 }}
          name="horstIterations"
          value={horstIterations}
          lowerLimit={1}
          upperLimit={10000}
        />
      </div>
      <div className="flex mt-[25px] ml-[70px] flex-row justify-start items-center">
        <span className="mr-[10px] w-[220px]">{`${t('Cutoff Threshold')}:  `}</span>
        <HorstNumberInput
          style={{ width: 100 }}
          name="horstThresholdLevel"
          value={horstThresholdLevel}
          lowerLimit={0.0001}
          upperLimit={0.01}
          step={0.001}
        />
      </div>
      <GeneralButton
        id="extractHorst"
        onClick={handleClick}
        disabled={horstExtractDisabled}
        className={`mt-[25px]! ml-[70px]! w-[250px] ${horstExtractActive ? 'bg-primary-button' : 'bg-grey-button'}`}
      >
        {t('Extract Centroids')}
      </GeneralButton>
    </React.Fragment>
  );
};

export default UseHorstAutoStop;
