import React from 'react';
import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
import GeneralButton from '../../../Utils/GeneralButton';
import factorState from '../../GlobalState/factorState';
import { useTranslation } from 'react-i18next';
import getFactorState from '../../GlobalState/getFactorState';

const UseHorstAutoStop = () => {
  const { t } = useTranslation();

  // getState
  const showUseHorstLimit = getFactorState('showUseHorstLimit');

  const handleClick = (event) => {
    const id = event.target.id;
    if (id === 'yes') {
      // shouldUseHorstLimit = true;
      factorState.horstAutoStopYesActive = true;
      factorState.horstAutoStopYesDisabled = true;
      factorState.horstAutoStopNoDisabled = true;
      factorState.showUseHorstIterationSetup = true;
    } else {
      factorState.showHorstIterationLimit = true;
      factorState.horstAutoStopYesDisabled = true;
      factorState.horstAutoStopNoDisabled = true;
      factorState.horstAutoStopNoActive = true;
      factorState.showNumberOfCentroidFacToExtract = true;
    }
  };

  const horstAutoStopYesActive = getFactorState('horstAutoStopYesActive');
  const horstAutoStopYesDisabled = getFactorState('horstAutoStopYesDisabled');
  const horstAutoStopNoActive = getFactorState('horstAutoStopNoActive');
  const horstAutoStopNoDisabled = getFactorState('horstAutoStopNoDisabled');

  if (showUseHorstLimit) {
    return (
      <React.Fragment>
        <HorstLimitContainerDiv>
          <TextSpan>
            {`${t('Use Horst limit to determine the number of factors to extract')}?  `}
          </TextSpan>
          <YesButton
            id={'yes'}
            onClick={handleClick}
            isActive={horstAutoStopYesActive}
            disabled={horstAutoStopYesDisabled}
          >
            {t('Yes')}
          </YesButton>
          <NoButton
            id={'no'}
            onClick={handleClick}
            isActive={horstAutoStopNoActive}
            disabled={horstAutoStopNoDisabled}
          >
            {t('No')}
          </NoButton>
        </HorstLimitContainerDiv>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default view(UseHorstAutoStop);

const HorstLimitContainerDiv = styled.div`
  display: flex;
  margin-top: 25px;
  margin-left: 70px;
  width: 800px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const YesButton = styled(GeneralButton)`
  width: 75px;
`;

const NoButton = styled(GeneralButton)`
  width: 75px;
`;

const TextSpan = styled.span`
  margin-right: 10px;
`;
