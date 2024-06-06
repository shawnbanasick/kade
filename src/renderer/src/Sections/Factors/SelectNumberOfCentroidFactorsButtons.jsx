import styled from 'styled-components';
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
    // todo - fix this state management
    factorState[factor] = true;
    factorState.numCentroidFactors = value;
  };

  const handleExtraction = () => {
    if (brownCentroids === true) {
      console.log('brown centroids selected');

      // show spinner duirng calcs
      updateShowCentroidSpinner(true);
      const numFactors = factorState((state) => state.numCentroidFactors);
      // Brown centroids calcs start
      centroidDispatch(numFactors);
      updateNumFacsForTableWidth(numFactors);
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

  const showNumberOfCentroidFacToExtract = factorState.showNumberOfCentroidFacToExtract;
  const isCentroidFacSelectDisabled = factorState((state) => state.isCentroidFacSelectDisabled);

  if (showNumberOfCentroidFacToExtract) {
    return (
      <NumCentroidFacButtonsContainerDiv>
        <TitleSpan>{`${t('Select Number of Factors')}: `}</TitleSpan>
        {btnId.map((item) => (
          <NumFacButtons
            as={GeneralButton}
            key={`centroidF${item}`}
            value={item}
            isActive={factorState[`centroid${item}FactorsActive`]}
            disabled={isCentroidFacSelectDisabled}
            onClick={handleOnclick}
            id={`centroid${item}FactorsActive`}
          >
            {item}
          </NumFacButtons>
        ))}
        <ExtractFactorsButton
          onClick={handleExtraction}
          disabled={isCentroidFacSelectDisabled}
        >{`${t('Extract')}`}</ExtractFactorsButton>
      </NumCentroidFacButtonsContainerDiv>
    );
  } else {
    return null;
  }
};

export default SelectNumberOfCentroidFactorsButtons;

const NumCentroidFacButtonsContainerDiv = styled.div`
  display: flex;
  margin-top: 25px;
  margin-left: 70px;
  width: 800px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const NumFacButtons = styled.div`
  width: 50px;
`;

const TitleSpan = styled.span`
  margin-right: 10px;
`;

const ExtractFactorsButton = styled(GeneralButton)``;
