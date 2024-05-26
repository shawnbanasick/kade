import styled from 'styled-components';
import GeneralButton from '../../Utils//GeneralButton';
import factorState from '../GlobalState/factorState';
import getCoreState from '../GlobalState/getCoreState';
import { useTranslation } from 'react-i18next';
import horstDispatcher from './centroidLogic/horst55Logic/horstDispatcher';
import centroidDispatch from './centroidLogic/centroidDispatch';
import getFactorState from '../GlobalState/getFactorState';
// import appState from "../GlobalState/appState";
// import rotationState from "../GlobalState/rotationState";

const clearAllButtons = () => {
  factorState.centroid1FactorsActive = false;
  factorState.centroid2FactorsActive = false;
  factorState.centroid3FactorsActive = false;
  factorState.centroid4FactorsActive = false;
  factorState.centroid5FactorsActive = false;
  factorState.centroid6FactorsActive = false;
  factorState.centroid7FactorsActive = false;
  factorState.centroid8FactorsActive = false;
};

const SelectNumberOfCentroidFactorsButtons = () => {
  const { t } = useTranslation();

  const handleOnclick = (event) => {
    clearAllButtons();
    const value = event.target.value;
    const factor = event.target.id;
    factorState[factor] = true;
    factorState.numCentroidFactors = value;
  };

  const handleExtraction = () => {
    const brownCentroids = getFactorState('activeTraditionalCentroidFactorButton');
    const horstCentroids = getFactorState('activeHorst55CentroidButton');
    const tuckerCentroids = getFactorState('activeTuckerMacCallumCentroidButton');
    if (brownCentroids === true) {
      console.log('brown centroids selected');

      // show spinner duirng calcs
      factorState.showCentroidSpinner = true;
      const numFactors = getFactorState('numCentroidFactors');
      // Brown centroids calcs start
      centroidDispatch(numFactors);
      factorState.numFacsForTableWidth = numFactors;
      // hide spinner since calcs are done
      factorState.showCentroidSpinner = false;
      factorState.disabledCentroidFactorButton = true;
      factorState.isHorst55Disabled = true;
      factorState.isTuckerMacCallumCentroidDisabled = true;
      factorState.isCentroidFacSelectDisabled = true;
    }

    if (horstCentroids === true) {
      console.log('horst');
      let shouldUseHorstLimit = false;

      factorState.horstAutoStopNoActive = true;
      factorState.horstAutoStopYesDisabled = true;
      factorState.showCentroidSpinner = true;
      // call function
      horstDispatcher(shouldUseHorstLimit);
      factorState.showCentroidSpinner = false;
      factorState.isCentroidFacSelectDisabled = true;
    }

    if (tuckerCentroids === true) {
      console.log('tucker');
    }
  };

  const minNumFactors = getCoreState('numQsorts');
  const btnId = [1, 2, 3, 4, 5, 6, 7, 8];
  if (minNumFactors < btnId.length) {
    btnId.length = minNumFactors;
  }

  const showNumberOfCentroidFacToExtract = factorState.showNumberOfCentroidFacToExtract;
  const isCentroidFacSelectDisabled = getFactorState('isCentroidFacSelectDisabled');

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
