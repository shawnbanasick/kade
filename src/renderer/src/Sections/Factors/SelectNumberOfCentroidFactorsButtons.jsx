import GeneralButton from '../../Utils//GeneralButton';
import { useTranslation } from 'react-i18next';
import horstDispatcher from './centroidLogic/horst55Logic/horstDispatcher';
import centroidDispatch from './centroidLogic/centroidDispatch';
import factorState from '../GlobalState/factorState';
import coreState from '../GlobalState/coreState';

const SelectNumberOfCentroidFactorsButtons = () => {
  const { t } = useTranslation();

  const updateCentroid1FactorsActive = factorState((state) => state.updateCentroid1FactorsActive);
  const updateCentroid2FactorsActive = factorState((state) => state.updateCentroid2FactorsActive);
  const updateCentroid3FactorsActive = factorState((state) => state.updateCentroid3FactorsActive);
  const updateCentroid4FactorsActive = factorState((state) => state.updateCentroid4FactorsActive);
  const updateCentroid5FactorsActive = factorState((state) => state.updateCentroid5FactorsActive);
  const updateCentroid6FactorsActive = factorState((state) => state.updateCentroid6FactorsActive);
  const updateCentroid7FactorsActive = factorState((state) => state.updateCentroid7FactorsActive);
  const updateCentroid8FactorsActive = factorState((state) => state.updateCentroid8FactorsActive);
  const centroid1FactorsActive = factorState((state) => state.centroid1FactorsActive);
  const centroid2FactorsActive = factorState((state) => state.centroid2FactorsActive);
  const centroid3FactorsActive = factorState((state) => state.centroid3FactorsActive);
  const centroid4FactorsActive = factorState((state) => state.centroid4FactorsActive);
  const centroid5FactorsActive = factorState((state) => state.centroid5FactorsActive);
  const centroid6FactorsActive = factorState((state) => state.centroid6FactorsActive);
  const centroid7FactorsActive = factorState((state) => state.centroid7FactorsActive);
  const centroid8FactorsActive = factorState((state) => state.centroid8FactorsActive);

  const activeButtonColorArray = [
    centroid1FactorsActive,
    centroid2FactorsActive,
    centroid3FactorsActive,
    centroid4FactorsActive,
    centroid5FactorsActive,
    centroid6FactorsActive,
    centroid7FactorsActive,
    centroid8FactorsActive,
  ];

  const updateActiveButtonColorArray = [
    updateCentroid1FactorsActive,
    updateCentroid2FactorsActive,
    updateCentroid3FactorsActive,
    updateCentroid4FactorsActive,
    updateCentroid5FactorsActive,
    updateCentroid6FactorsActive,
    updateCentroid7FactorsActive,
    updateCentroid8FactorsActive,
  ];

  const brownCentroids = factorState((state) => state.activeTraditionalCentroidFactorButton);
  const horstCentroids = factorState((state) => state.activeHorst55CentroidButton);
  const tuckerCentroids = factorState((state) => state.activeTuckerMacCallumCentroidButton);
  const updateShowCentroidSpinner = factorState((state) => state.updateShowCentroidSpinner);
  const updateNumFacsForTableWidth = factorState((state) => state.updateNumFacsForTableWidth);
  const updateDisabledCentroidFactorButton = factorState(
    (state) => state.updateDisabledCentroidFactorButton
  );
  const updateIsHorst55Disabled = factorState((state) => state.updateIsHorst55Disabled);
  const updateIsTuckerMacCallumCentroidDisabled = factorState(
    (state) => state.updateIsTuckerMacCallumCentroidDisabled
  );
  const updateIsCentroidFacSelectDisabled = factorState(
    (state) => state.updateIsCentroidFacSelectDisabled
  );
  const updateHorstAutoStopNoActive = factorState((state) => state.updateHorstAutoStopNoActive);
  const updateHorstAutoStopYesDisabled = factorState(
    (state) => state.updateHorstAutoStopYesDisabled
  );
  const showNumberOfCentroidFacToExtract = factorState(
    (state) => state.showNumberOfCentroidFacToExtract
  );
  const isCentroidFacSelectDisabled = factorState((state) => state.isCentroidFacSelectDisabled);
  const numCentroidFactors = factorState((state) => state.numCentroidFactors);
  const updateNumCentroidFactors = factorState((state) => state.updateNumCentroidFactors);

  const clearAllButtons = () => {
    updateCentroid1FactorsActive(false);
    updateCentroid2FactorsActive(false);
    updateCentroid3FactorsActive(false);
    updateCentroid4FactorsActive(false);
    updateCentroid5FactorsActive(false);
    updateCentroid6FactorsActive(false);
    updateCentroid7FactorsActive(false);
    updateCentroid8FactorsActive(false);
  };

  const handleOnclick = (event) => {
    clearAllButtons();
    const value = event.target.value;
    const factor = event.target.id;
    const updateFactor = updateActiveButtonColorArray[factor];
    updateFactor(true);
    updateNumCentroidFactors(value);
  };

  const handleExtraction = () => {
    if (brownCentroids === true) {
      console.log('brown centroids selected');

      // show spinner duirng calcs
      updateShowCentroidSpinner(true);
      // Brown centroids calcs start
      centroidDispatch(numCentroidFactors);
      updateNumFacsForTableWidth(numCentroidFactors);
      // hide spinner since calcs are done
      updateDisabledCentroidFactorButton(true);
      updateShowCentroidSpinner(false);
      updateDisabledCentroidFactorButton(true);
      updateIsHorst55Disabled(true);
      updateIsTuckerMacCallumCentroidDisabled(true);
      updateIsCentroidFacSelectDisabled(true);
    }

    if (horstCentroids === true) {
      console.log('horst');
      let shouldUseHorstLimit = false;

      updateHorstAutoStopNoActive(true);
      updateHorstAutoStopYesDisabled(true);
      updateShowCentroidSpinner(true);
      // call function
      horstDispatcher(shouldUseHorstLimit);
      updateShowCentroidSpinner(false);
      updateIsCentroidFacSelectDisabled(true);
    }

    if (tuckerCentroids === true) {
      console.log('tucker');
    }
  };

  const minNumFactors = coreState((state) => state.numQsorts);

  const btnId = [1, 2, 3, 4, 5, 6, 7, 8];
  if (minNumFactors < btnId.length) {
    btnId.length = minNumFactors;
  }

  if (showNumberOfCentroidFacToExtract) {
    return (
      <div className="flex flex-row gap-3 items-center justify-start mt-[25px] w-[800px] ml-[70px]">
        <span>{`${t('Select Number of Factors')}: `}</span>
        {btnId.map((item, index) => (
          <GeneralButton
            key={`centroidF${item}`}
            value={item}
            $disabled={isCentroidFacSelectDisabled}
            onClick={handleOnclick}
            className={`${activeButtonColorArray[index] ? 'bg-primary-button' : 'bg-grey-button'} gap-4`}
            id={index}
          >
            {item}
          </GeneralButton>
        ))}
        <GeneralButton
          onClick={handleExtraction}
          $disabled={isCentroidFacSelectDisabled}
          className="flex flex-row items-center text-center bg-grey-button justify-center  w-[120px] ml-[70px]"
        >{`${t('Extract')}`}</GeneralButton>
      </div>
    );
  } else {
    return null;
  }
};

export default SelectNumberOfCentroidFactorsButtons;
